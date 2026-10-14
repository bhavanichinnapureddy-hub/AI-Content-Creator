import { create } from 'zustand';
import { 
  CreatorProfileData, 
  BriefData, 
  EngagementData, 
  VerificationRequestItem, 
  WalletTransactionItem 
} from '../types/marketplace';
import { 
  INITIAL_CREATORS, 
  INITIAL_BRIEFS, 
  INITIAL_ENGAGEMENTS, 
  INITIAL_VERIFICATIONS, 
  INITIAL_TRANSACTIONS 
} from '../data/initialData';

interface MarketplaceState {
  creators: CreatorProfileData[];
  briefs: BriefData[];
  engagements: EngagementData[];
  verifications: VerificationRequestItem[];
  walletBalance: number;
  transactions: WalletTransactionItem[];

  // Actions
  addBrief: (brief: Omit<BriefData, 'id' | 'applicantCount' | 'createdAt'>) => string;
  applyToBrief: (briefId: string, creatorId: string, proposedBudget: number, note: string) => void;
  createEngagement: (briefId: string, creatorId: string, budget: number) => string;
  updateEngagementStatus: (engagementId: string, status: EngagementData['status']) => void;
  addMessage: (engagementId: string, content: string, senderId: string, senderName: string, senderRole: 'BRAND' | 'CREATOR' | 'ADMIN') => void;
  addEngagementFile: (engagementId: string, file: { filename: string; fileUrl: string; fileSize: string; isDraft: boolean; isFinal: boolean }) => void;
  releaseEscrow: (engagementId: string) => void;
  refundEscrow: (engagementId: string) => void;
  depositFunds: (amount: number) => void;
  approveVerification: (id: string) => void;
  rejectVerification: (id: string) => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  creators: INITIAL_CREATORS,
  briefs: INITIAL_BRIEFS,
  engagements: INITIAL_ENGAGEMENTS,
  verifications: INITIAL_VERIFICATIONS,
  walletBalance: 2600, // $2,600 available (plus $2,400 in escrow)
  transactions: INITIAL_TRANSACTIONS,

  addBrief: (briefData) => {
    const newId = `brief-${Date.now()}`;
    const newBrief: BriefData = {
      ...briefData,
      id: newId,
      applicantCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'PUBLISHED'
    };

    set((state) => ({
      briefs: [newBrief, ...state.briefs]
    }));

    return newId;
  },

  applyToBrief: (briefId, creatorId, proposedBudget, note) => {
    set((state) => ({
      briefs: state.briefs.map((b) => 
        b.id === briefId ? { ...b, applicantCount: b.applicantCount + 1 } : b
      )
    }));
  },

  createEngagement: (briefId, creatorId, budget) => {
    const brief = get().briefs.find((b) => b.id === briefId);
    const creator = get().creators.find((c) => c.id === creatorId);
    const engId = `eng-${Date.now()}`;

    if (!brief || !creator) return engId;

    const newEngagement: EngagementData = {
      id: engId,
      briefId,
      briefTitle: brief.title,
      brandName: brief.brandName,
      brandUserId: "user-brand-1",
      creatorId,
      creatorName: creator.displayName,
      creatorAvatar: creator.avatarUrl,
      status: "ACCEPTED",
      agreedBudget: budget,
      deadline: brief.deadline,
      revisionCount: 0,
      maxRevisions: 3,
      escrowStatus: "IN_ESCROW",
      licenseType: brief.commercialUseType,
      createdAt: new Date().toISOString().split('T')[0],
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: "system",
          senderName: "AIForge Escrow System",
          senderRole: "ADMIN",
          content: `Agreement formalized. Demo escrow funded with $${budget}. Milestone 1 (Draft submission) initiated.`,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      files: []
    };

    // Deduct from wallet & record transaction
    set((state) => ({
      engagements: [newEngagement, ...state.engagements],
      walletBalance: Math.max(0, state.walletBalance - budget),
      transactions: [
        {
          id: `tx-${Date.now()}`,
          amount: -budget,
          type: "ESCROW",
          description: `Escrow funded for "${brief.title}"`,
          date: new Date().toISOString().split('T')[0],
          status: "COMPLETED"
        },
        ...state.transactions
      ]
    }));

    return engId;
  },

  updateEngagementStatus: (engagementId, status) => {
    set((state) => ({
      engagements: state.engagements.map((eng) => {
        if (eng.id !== engagementId) return eng;
        
        let revisionCount = eng.revisionCount;
        if (status === 'REVISION_REQUESTED') {
          revisionCount += 1;
        }

        return { ...eng, status, revisionCount };
      })
    }));
  },

  addMessage: (engagementId, content, senderId, senderName, senderRole) => {
    set((state) => ({
      engagements: state.engagements.map((eng) => {
        if (eng.id !== engagementId) return eng;
        return {
          ...eng,
          messages: [
            ...eng.messages,
            {
              id: `msg-${Date.now()}`,
              senderId,
              senderName,
              senderRole,
              content,
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      })
    }));
  },

  addEngagementFile: (engagementId, file) => {
    set((state) => ({
      engagements: state.engagements.map((eng) => {
        if (eng.id !== engagementId) return eng;
        const currentVersion = eng.files.length + 1;
        return {
          ...eng,
          status: file.isFinal ? 'FINAL_SUBMITTED' : 'DRAFT_SUBMITTED',
          files: [
            ...eng.files,
            {
              id: `file-${Date.now()}`,
              filename: file.filename,
              fileUrl: file.fileUrl,
              fileSize: file.fileSize,
              version: currentVersion,
              isDraft: file.isDraft,
              isFinal: file.isFinal,
              createdAt: new Date().toISOString().split('T')[0]
            }
          ]
        };
      })
    }));
  },

  releaseEscrow: (engagementId) => {
    const eng = get().engagements.find((e) => e.id === engagementId);
    if (!eng) return;

    set((state) => ({
      engagements: state.engagements.map((e) => 
        e.id === engagementId ? { ...e, escrowStatus: 'RELEASED', status: 'DELIVERED' } : e
      ),
      transactions: [
        {
          id: `tx-${Date.now()}`,
          amount: eng.agreedBudget,
          type: "RELEASE",
          description: `Escrow released to ${eng.creatorName} for completed project`,
          date: new Date().toISOString().split('T')[0],
          status: "COMPLETED"
        },
        ...state.transactions
      ]
    }));
  },

  refundEscrow: (engagementId) => {
    const eng = get().engagements.find((e) => e.id === engagementId);
    if (!eng) return;

    set((state) => ({
      walletBalance: state.walletBalance + eng.agreedBudget,
      engagements: state.engagements.map((e) => 
        e.id === engagementId ? { ...e, escrowStatus: 'PENDING', status: 'CANCELLED' } : e
      ),
      transactions: [
        {
          id: `tx-${Date.now()}`,
          amount: eng.agreedBudget,
          type: "REFUND",
          description: `Escrow refunded to Brand wallet`,
          date: new Date().toISOString().split('T')[0],
          status: "COMPLETED"
        },
        ...state.transactions
      ]
    }));
  },

  depositFunds: (amount) => {
    set((state) => ({
      walletBalance: state.walletBalance + amount,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          amount,
          type: "DEPOSIT",
          description: "Simulated deposit via Demo Card •••• 4242",
          date: new Date().toISOString().split('T')[0],
          status: "COMPLETED"
        },
        ...state.transactions
      ]
    }));
  },

  approveVerification: (id) => {
    const verif = get().verifications.find((v) => v.id === id);
    if (!verif) return;

    set((state) => ({
      verifications: state.verifications.map((v) => 
        v.id === id ? { ...v, status: 'APPROVED' } : v
      ),
      creators: state.creators.map((c) => {
        if (c.id !== verif.creatorId) return c;
        if (verif.type === 'TOOL_PROFICIENCY') return { ...c, verifiedTool: true, isVerified: true };
        if (verif.type === 'WORKFLOW_AUTHENTICITY') return { ...c, verifiedWorkflow: true, isVerified: true };
        if (verif.type === 'PAST_CLIENT_WORK') return { ...c, verifiedPastWork: true, isVerified: true };
        return { ...c, isVerified: true };
      })
    }));
  },

  rejectVerification: (id) => {
    set((state) => ({
      verifications: state.verifications.map((v) => 
        v.id === id ? { ...v, status: 'REJECTED' } : v
      )
    }));
  }
}));
