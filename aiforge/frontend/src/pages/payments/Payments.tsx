import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { 
  CreditCard, 
  DollarSign, 
  PlusCircle, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function Payments() {
  const { walletBalance, transactions, depositFunds } = useMarketplaceStore();
  const [depositAmount, setDepositAmount] = useState(1000);
  const [successToast, setSuccessToast] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    depositFunds(depositAmount);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      <Navbar activeTab="payments" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Banner Alert for Demo Mode */}
        <div className="p-4 bg-primary-950/40 border border-primary-800/60 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary-400" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Simulated Escrow Wallet (Demo Mode)
              </h3>
              <p className="text-[11px] text-slate-400">
                No real credit cards or bank accounts are debited. All transactions are virtual.
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-primary-900/60 text-primary-300">
            Protected
          </span>
        </div>

        {/* Balance Card & Deposit Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Available Wallet Balance
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
                ${walletBalance.toLocaleString()}
                <span className="text-sm font-normal text-slate-500 ml-2">USD</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Linked Payment Method: <strong className="text-slate-300">Demo Card •••• 4242</strong>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Escrow Ready
              </span>
              <span>•</span>
              <span>Instant Milestone Release</span>
            </div>
          </div>

          {/* Quick Simulated Deposit */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              Add Simulated Funds
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Top up your test balance to fund creative briefs and milestone escrows.
            </p>

            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Amount (USD)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[500, 1000, 2500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt)}
                      className={`py-1.5 text-xs font-semibold rounded-xl border transition ${
                        depositAmount === amt
                          ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
              >
                Simulate Deposit
              </button>

              {successToast && (
                <div className="text-center text-xs font-semibold text-emerald-400 mt-2">
                  Deposit credited successfully!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Transaction History Log */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary-400" />
            Wallet & Escrow Transaction Ledger ({transactions.length})
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-800">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 flex items-center justify-between hover:bg-slate-850/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      tx.amount > 0
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                        : 'bg-primary-950/60 text-primary-400 border border-primary-800/60'
                    }`}>
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {tx.description}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {tx.date} • Reference ID: {tx.id}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-sm font-extrabold ${
                      tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'
                    }`}>
                      {tx.amount > 0 ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
