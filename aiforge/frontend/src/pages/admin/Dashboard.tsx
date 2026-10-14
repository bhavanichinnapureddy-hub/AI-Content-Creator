import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BarChart3, 
  Lock 
} from 'lucide-react';

export default function AdminDashboard() {
  const { verifications, creators, briefs, engagements, approveVerification, rejectVerification } = useMarketplaceStore();

  const pendingVerifs = verifications.filter((v) => v.status === 'PENDING');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="admin" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Admin Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Security & Platform Oversight
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                Admin RBAC Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Platform Administration Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Audit creator verification proofs, review milestone escrow releases, and manage platform trust policies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/analytics"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4 text-primary-400" />
              Platform Analytics
            </Link>
          </div>
        </div>

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Creators
              </span>
              <Users className="w-4 h-4 text-accent-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {creators.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Active verified profiles
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Published Briefs
              </span>
              <FileText className="w-4 h-4 text-primary-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {briefs.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Marketplace opportunities
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Escrows Under Audit
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {engagements.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Active client contracts
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Pending Proofs
              </span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 tracking-tight">
              {pendingVerifs.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Requires administrative review
            </div>
          </div>
        </div>

        {/* Verification Queue Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Pending Creator Verification Requests ({pendingVerifs.length})
          </h2>

          {pendingVerifs.length === 0 ? (
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">
                All verification requests have been audited and approved.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingVerifs.map((v) => (
                <div
                  key={v.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={v.creatorAvatar}
                      alt={v.creatorName}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base">
                          {v.creatorName}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-950 text-primary-300 border border-primary-800">
                          {v.type.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {v.proofDescription}
                      </p>

                      <div className="mt-2">
                        <a
                          href={v.proofUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary-400 hover:text-primary-300 font-medium"
                        >
                          View External Proof Documentation &rarr;
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end md:self-auto">
                    <button
                      onClick={() => rejectVerification(v.id)}
                      className="px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-800/60 hover:bg-red-900/60 text-red-300 text-xs font-semibold transition flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                    <button
                      onClick={() => approveVerification(v.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve Badge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
