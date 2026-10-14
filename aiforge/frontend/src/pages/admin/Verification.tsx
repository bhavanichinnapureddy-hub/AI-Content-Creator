import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  ArrowLeft, 
  Layers 
} from 'lucide-react';

export default function Verification() {
  const { verifications, approveVerification, rejectVerification } = useMarketplaceStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="verification" />

      <div className="border-b border-slate-800 bg-slate-900/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/admin" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Admin Console
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Creator Credentials & Proof Verification Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit creator submissions for proprietary tool fluency, ComfyUI node workflows, and past commercial deliverables.
          </p>
        </div>

        <div className="space-y-4">
          {verifications.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.creatorAvatar}
                  alt={item.creatorName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-500/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">
                      {item.creatorName}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-950 text-primary-300 border border-primary-800">
                      {item.type.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'APPROVED'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                        : item.status === 'REJECTED'
                        ? 'bg-red-950/60 text-red-400 border border-red-800/60'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
                    {item.proofDescription}
                  </p>

                  <div className="mt-2.5">
                    <a
                      href={item.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1"
                    >
                      Inspect Verification Proof Documentation <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {item.status === 'PENDING' && (
                <div className="flex items-center gap-2.5 self-end md:self-auto">
                  <button
                    onClick={() => rejectVerification(item.id)}
                    className="px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-800/60 hover:bg-red-900/60 text-red-300 text-xs font-semibold transition flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                  <button
                    onClick={() => approveVerification(item.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve Badge
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
