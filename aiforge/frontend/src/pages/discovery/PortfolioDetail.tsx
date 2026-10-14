import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Layers, 
  Clock, 
  Maximize2 
} from 'lucide-react';

export default function PortfolioDetail() {
  const { creatorId, itemId } = useParams<{ creatorId: string; itemId: string }>();
  const { creators } = useMarketplaceStore();

  const creator = creators.find((c) => c.id === creatorId) || creators[0];
  const item = creator.portfolio.find((p) => p.id === itemId) || creator.portfolio[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="creators" />

      <div className="border-b border-slate-800 bg-slate-900/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/creators/${creator.id}`}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {creator.displayName}'s Profile
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Media Preview Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-slate-800">
              {item.aspectRatio} Aspect Ratio
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
                  {item.contentType} Showcase
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {item.title}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Created by <strong className="text-white">{creator.displayName}</strong> • {item.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Commercial License Verified
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mb-6">
              {item.description}
            </p>

            {/* AI Tools Used */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Generative AI Models & Toolstack:
              </span>
              <div className="flex flex-wrap gap-2">
                {item.aiToolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1 rounded-xl"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Workflow Architecture Steps */}
            {item.workflowSteps && (
              <div className="border-t border-slate-800 pt-6">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent-400" />
                  Neural Production Pipeline
                </h2>
                <div className="space-y-3">
                  {item.workflowSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-primary-950 text-primary-300 border border-primary-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{step.step}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
