import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  ArrowLeft, 
  Send, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileVideo, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  Layers, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export default function EngagementDetail() {
  const { id } = useParams<{ id: string }>();
  const { 
    engagements, 
    addMessage, 
    addEngagementFile, 
    updateEngagementStatus, 
    releaseEscrow,
    refundEscrow 
  } = useMarketplaceStore();
  const { user } = useAuthStore();

  const [messageInput, setMessageInput] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [isFileFinal, setIsFileFinal] = useState(false);

  const engagement = engagements.find((e) => e.id === id) || engagements[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    addMessage(
      engagement.id,
      messageInput,
      user?.id || 'current-user',
      user?.displayName || 'User',
      user?.role || 'BRAND'
    );
    setMessageInput('');
  };

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    addEngagementFile(engagement.id, {
      filename: newFileName,
      fileUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
      fileSize: "64.5 MB",
      isDraft: !isFileFinal,
      isFinal: isFileFinal
    });

    setShowUploadModal(false);
    setNewFileName('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />

      <div className="border-b border-slate-800 bg-slate-900/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/dashboard" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <span className="text-xs font-mono text-slate-500">
            Engagement ID: {engagement.id}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Engagement Milestone Ribbon */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
                Active Milestone Workspace
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                engagement.escrowStatus === 'RELEASED'
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                  : 'bg-accent-950/60 text-accent-300 border-accent-800/60'
              }`}>
                Escrow: {engagement.escrowStatus}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {engagement.briefTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
              <span>Brand: <strong className="text-white">{engagement.brandName}</strong></span>
              <span>•</span>
              <span>Creator: <strong className="text-white">{engagement.creatorName}</strong></span>
              <span>•</span>
              <span>Budget: <strong className="text-emerald-400 font-bold">${engagement.agreedBudget}</strong></span>
              <span>•</span>
              <span>Status: <strong className="text-primary-400">{engagement.status.replace('_', ' ')}</strong></span>
            </div>
          </div>

          {/* Workflow Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Creator upload button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Deliverable / Draft
            </button>

            {/* Brand revision button */}
            {engagement.status === 'DRAFT_SUBMITTED' && (
              <button
                onClick={() => updateEngagementStatus(engagement.id, 'REVISION_REQUESTED')}
                className="px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-800/60 hover:bg-amber-900/60 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Request Revision ({engagement.revisionCount}/{engagement.maxRevisions})
              </button>
            )}

            {/* Brand Approve & Release Escrow button */}
            {engagement.escrowStatus === 'IN_ESCROW' && (
              <button
                onClick={() => releaseEscrow(engagement.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve & Release Escrow (${engagement.agreedBudget})
              </button>
            )}
          </div>
        </div>

        {/* Two-Column Layout: Chat/Thread & Deliverables Vault */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deliverable File Versions */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileVideo className="w-4 h-4 text-primary-400" />
                Submitted Files ({engagement.files.length})
              </h2>

              {engagement.files.length === 0 ? (
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">
                    No drafts uploaded yet. The creator will submit draft files here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {engagement.files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <FileVideo className="w-4 h-4 text-accent-400" />
                          <div>
                            <div className="text-xs font-bold text-white truncate max-w-[160px]">
                              {file.filename}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              v{file.version} • {file.fileSize}
                            </div>
                          </div>
                        </div>

                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          file.isFinal ? 'bg-emerald-950/60 text-emerald-400' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {file.isFinal ? 'FINAL' : 'DRAFT'}
                        </span>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-900 flex justify-between items-center text-[11px]">
                        <span className="text-slate-500">{file.createdAt}</span>
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-1"
                        >
                          Preview File <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* License Record Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Commercial License
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {engagement.licenseType}
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>• Zero copyright infringement guarantee</div>
                <div>• Master commercial buyout upon release</div>
                <div>• Neural prompt weights metadata archived</div>
              </div>
            </div>
          </div>

          {/* Interactive Chat Thread */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[600px] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-3">
                <img
                  src={engagement.creatorAvatar}
                  alt={engagement.creatorName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xs font-bold text-white">{engagement.creatorName}</h3>
                  <span className="text-[10px] text-slate-400">Collaboration Channel</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                End-to-End Encrypted
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/40">
              {engagement.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.senderRole === 'ADMIN'
                      ? 'items-center'
                      : msg.senderRole === (user?.role || 'BRAND')
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  {msg.senderRole === 'ADMIN' ? (
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 max-w-md text-center">
                      <span className="font-bold text-accent-400">System Notification: </span>
                      {msg.content}
                    </div>
                  ) : (
                    <div className="max-w-md">
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[11px] font-semibold text-slate-400">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-600">{msg.createdAt}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.senderRole === (user?.role || 'BRAND')
                            ? 'bg-primary-600 text-white rounded-tr-none'
                            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/60'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-800 bg-slate-900 flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message or milestone update..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-brand text-white font-semibold text-xs shadow-glow-primary transition flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Upload Engagement Asset
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Submit an iterative draft sequence or finalized production master.
            </p>

            <form onSubmit={handleUploadFile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deliverable Filename
                </label>
                <input
                  type="text"
                  required
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. MasterCut_4K_ColorCorrected_v2.mp4"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="finalCheck"
                  checked={isFileFinal}
                  onChange={(e) => setIsFileFinal(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="finalCheck" className="text-xs text-slate-300">
                  Mark as Final Deliverable (Awaiting Escrow Release)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs shadow-glow-primary"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
