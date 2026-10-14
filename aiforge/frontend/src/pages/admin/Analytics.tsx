import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Analytics() {
  const escrowVolumeData = [
    { month: 'Jun', volume: 14500, briefs: 12 },
    { month: 'Jul', volume: 22000, briefs: 19 },
    { month: 'Aug', volume: 38400, briefs: 27 },
    { month: 'Sep', volume: 54100, briefs: 39 },
    { month: 'Oct', volume: 72800, briefs: 54 }
  ];

  const toolsPopularityData = [
    { tool: 'Runway Gen-3', projects: 128 },
    { tool: 'ComfyUI', projects: 94 },
    { tool: 'Flux.1', projects: 88 },
    { tool: 'Midjourney', projects: 76 },
    { tool: 'Kling AI', projects: 52 },
    { tool: 'Pika 1.5', projects: 31 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="analytics" />

      <div className="border-b border-slate-800 bg-slate-900/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/admin" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Admin Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-primary-400" />
            Platform Growth & Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics covering milestone volume, toolchain utilization, and brief turnarounds.
          </p>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Escrow Volume Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Monthly Escrow Volume ($USD)
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Total transaction values flowing through automated escrow protection.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={escrowVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#818cf8', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Tools Popularity */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent-400" />
              Most Commissioned Generative Tools
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Distribution of production contracts requiring specific AI toolchains.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={toolsPopularityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="tool" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="projects" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
