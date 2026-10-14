import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BackNavButton } from '../components/BackNavButton';
import { UserAvatar } from '../components/UserAvatar';
import { DEMO_ADMIN } from '../data/initialData';
import { formatNotificationTime } from '../utils/timestamps';
import { MessageSquare, Send, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export const MessagesPage = () => {
  const { currentUser, creators, customers, messages, sendMessage } = useAuth();
  const { addToast } = useToast();

  const adminPartner = {
    id: 'admin-root',
    name: 'Alexander Vance (Super Admin)',
    companyName: 'Platform Oversight & Support',
    role: 'admin',
    avatar: DEMO_ADMIN.avatar
  };

  const partnerList = useMemo(() => {
    if (currentUser?.role === 'creator') return [adminPartner, ...customers];
    if (currentUser?.role === 'customer') return [adminPartner, ...creators];
    if (currentUser?.role === 'admin') return [...creators, ...customers];
    return [adminPartner];
  }, [currentUser, creators, customers]);

  const [activePartner, setActivePartner] = useState(partnerList[0] || null);
  const [inputMsg, setInputMsg] = useState('');
  const [isSending, setIsSending] = useState(false);

  const currentMessages = useMemo(() => {
    if (!currentUser || !activePartner) return [];
    return messages
      .filter((msg) => {
        const pairA = msg.senderId === currentUser.id && msg.recipientId === activePartner.id;
        const pairB = msg.senderId === activePartner.id && msg.recipientId === currentUser.id;
        return pairA || pairB;
      })
      .slice()
      .sort((a, b) => new Date(a.createdAt || a.timestamp || 0) - new Date(b.createdAt || b.timestamp || 0));
  }, [messages, currentUser, activePartner]);

  const handleSend = () => {
    const text = inputMsg.trim();
    if (!text || !activePartner || isSending) return;

    setIsSending(true);
    sendMessage({
      recipientId: activePartner.id,
      recipientName: activePartner.name,
      recipientRole: activePartner.role,
      text,
      requestType: activePartner.role === 'admin' ? 'support_request' : currentUser?.role === 'admin' ? 'conversation' : 'collaboration_deal'
    });
    setInputMsg('');
    setIsSending(false);
    addToast(`Message sent to ${activePartner.name}.`, 'success');
  };

  const handleSmartReply = () => {
    if (!activePartner) return;
    const lastMsg = currentMessages[currentMessages.length - 1];
    let suggestion = `Hello ${activePartner.name}, thank you for reaching out. I would like to continue this conversation.`;

    if (lastMsg?.text.toLowerCase().includes('rates') || lastMsg?.text.toLowerCase().includes('pricing')) {
      suggestion = `Thank you. Standard creator deliverables start at $650, including usage rights for 30 days.`;
    } else if (lastMsg?.text.toLowerCase().includes('deadline')) {
      suggestion = `I currently have production availability starting next Monday and can deliver within 4 business days.`;
    }

    setInputMsg(suggestion);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <BackNavButton fallbackPath={currentUser ? `/${currentUser.role}/home` : '/'} label="Back" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003B46] dark:text-white">
            Messages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Direct communication between creators, brands, and platform administrators.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#003B46] border border-slate-200 dark:border-[#07575B] rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        <div className="md:col-span-4 border-r border-slate-100 dark:border-slate-800 p-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 block mb-3">
            Active Contacts ({partnerList.length})
          </span>
          <div className="space-y-1.5 overflow-y-auto max-h-[500px]">
            {partnerList.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePartner(p)}
                className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer ${
                  activePartner?.id === p.id
                    ? 'bg-[#00796B] text-white shadow-sm shadow-teal-950/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-800 dark:text-slate-200'
                }`}
              >
                <UserAvatar src={p.avatar} name={p.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold truncate">{p.name}</p>
                  <p className={`text-[11px] truncate ${activePartner?.id === p.id ? 'text-teal-100' : 'text-slate-400'}`}>
                    {p.companyName || p.category || p.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col justify-between">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <UserAvatar src={activePartner?.avatar} name={activePartner?.name} size="md" />
              <div>
                <h3 className="text-sm font-bold text-[#003B46] dark:text-white flex items-center gap-1.5">
                  {activePartner?.name || 'Select Contact'}
                  {activePartner?.role === 'admin' && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {activePartner?.companyName || 'Member'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSmartReply}
              className="px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 text-[#00796B] dark:text-[#48E5C2] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Smart Draft
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-4 max-h-[380px] min-h-[300px]">
            {currentMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <MessageSquare className="w-10 h-10 mb-2 opacity-40 text-[#00796B]" />
                <p className="text-xs">No previous message history with {activePartner?.name}.</p>
              </div>
            ) : (
              currentMessages.map((msg) => {
                const isMe = msg.senderId === currentUser?.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#00796B] text-white rounded-br-xs shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      <p className="font-medium">{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 px-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatNotificationTime(msg.createdAt, msg.timestamp)}</span>
                      {isMe && <span className="text-teal-600 font-bold">• {msg.status || 'Delivered'}</span>}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={`Type a message to ${activePartner?.name || 'contact'}...`}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00796B]"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim() || isSending}
                className="p-2.5 rounded-xl bg-[#00796B] hover:bg-[#005F54] text-white shadow-md disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
