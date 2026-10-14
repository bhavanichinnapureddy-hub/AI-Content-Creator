export type UserRole = 'BRAND' | 'CREATOR' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
}

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  mediaUrl: string;
  contentType: string; // 'Ad' | 'Short Film' | '3D Animation' | 'Product Video' | 'Character Design'
  aiToolsUsed: string[];
  workflowSteps: { step: string; desc: string }[];
  aspectRatio: '9:16' | '16:9' | '1:1';
  durationSeconds: number;
  isCommercialUse: boolean;
  tags: string[];
  externalProofUrl?: string;
  verifiedTool: boolean;
  verifiedWorkflow: boolean;
  verifiedPastWork: boolean;
  createdAt: string;
}

export interface CreatorProfileData {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl: string;
  headline: string;
  bio: string;
  specialization: string;
  skills: string[];
  aiTools: string[];
  workflowDesc: string;
  location: string;
  languages: string[];
  availability: boolean;
  priceRangeMin: number;
  priceRangeMax: number;
  experienceLevel: string;
  responseTimeDays: number;
  rating: number;
  reviewsCount: number;
  completedProjects: number;
  isVerified: boolean;
  verifiedTool: boolean;
  verifiedWorkflow: boolean;
  verifiedPastWork: boolean;
  portfolio: CreatorPortfolioItem[];
}

export interface BriefData {
  id: string;
  brandProfileId: string;
  brandName: string;
  brandLogo?: string;
  title: string;
  campaignGoal: string;
  contentType: string;
  creativeStyle: string;
  aspectRatio: string;
  durationSeconds: number;
  deliverableCount: number;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  targetAudience: string;
  language: string;
  description: string;
  dos: string[];
  donts: string[];
  commercialUseType: string;
  aiDisclosureRequired: boolean;
  requiredFormats: string[];
  requiredSkills: string[];
  requiredTools: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  isAiGenerated?: boolean;
  applicantCount: number;
  createdAt: string;
}

export interface EngagementData {
  id: string;
  briefId: string;
  briefTitle: string;
  brandName: string;
  brandUserId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  status: 'INVITED' | 'APPLIED' | 'ACCEPTED' | 'IN_PROGRESS' | 'DRAFT_SUBMITTED' | 'REVISION_REQUESTED' | 'FINAL_SUBMITTED' | 'APPROVED' | 'DELIVERED' | 'CANCELLED';
  agreedBudget: number;
  deadline: string;
  revisionCount: number;
  maxRevisions: number;
  escrowStatus: 'PENDING' | 'FUNDED' | 'IN_ESCROW' | 'RELEASED';
  licenseType: string;
  createdAt: string;
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    senderRole: UserRole;
    content: string;
    createdAt: string;
  }[];
  files: {
    id: string;
    filename: string;
    fileUrl: string;
    fileSize: string;
    version: number;
    isDraft: boolean;
    isFinal: boolean;
    createdAt: string;
  }[];
}

export interface VerificationRequestItem {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  type: 'TOOL_PROFICIENCY' | 'WORKFLOW_AUTHENTICITY' | 'PAST_CLIENT_WORK' | 'IDENTITY';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  proofUrl: string;
  proofDescription: string;
  createdAt: string;
}

export interface WalletTransactionItem {
  id: string;
  amount: number;
  type: 'DEPOSIT' | 'ESCROW' | 'RELEASE' | 'REFUND';
  description: string;
  date: string;
  status: 'COMPLETED' | 'PENDING';
}
