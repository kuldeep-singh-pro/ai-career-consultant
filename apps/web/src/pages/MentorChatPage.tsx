import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  useMentorSessions,
  useMentorHistory,
  useSendMessage,
  useClearMentorSession,
} from "../hooks/useMentor";
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Trash2, 
  MoreVertical, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  Info
} from "lucide-react";

export const MentorChatPage: React.FC = () => {
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [openMenuId, setOpenMenuId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");
  const [message, setMessage] = useState("");
  
  const menuRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: sessions, refetch: refetchSessions } = useMentorSessions();
  const { data: history = [], refetch: refetchHistory, isPending: historyLoading } = useMentorHistory(
    selectedSessionId,
    50,
    !!selectedSessionId
  );

  const { mutate: sendMessage, isPending } = useSendMessage();
  const { mutate: deleteSession } = useClearMentorSession();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenuId("");
        setConfirmDeleteId("");
      }
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, []);

  const startNewChat = () => {
    const id = "session_" + Date.now();
    setSelectedSessionId(id);
    setOpenMenuId("");
  };

  const handleSendMessage = () => {
    if (!message.trim() || isPending) return;
    sendMessage(
      { sessionId: selectedSessionId, message },
      {
        onSuccess: () => {
          setMessage("");
          refetchSessions();
          refetchHistory();
        },
      }
    );
  };

  const confirmDeleteSession = (sessionId: string) => {
    deleteSession(sessionId, {
      onSuccess: () => {
        if (selectedSessionId === sessionId) setSelectedSessionId("");
        setConfirmDeleteId("");
        setOpenMenuId("");
        refetchSessions();
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto h-[82vh] flex flex-col animate-in fade-in duration-500">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              AI Mentor
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Personalized strategic career guidance.</p>
          </div>
        </header>

        <div className="flex flex-1 gap-6 overflow-hidden">
          <aside className="w-80 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col relative overflow-hidden transition-all duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={startNewChat}
                className="group flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                New Strategy Session
              </button>
            </div>

            <div ref={menuRef} className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {sessions?.map((session: any) => {
                const isActive = selectedSessionId === session.sessionId;
                return (
                  <div
                    key={session.sessionId}
                    className={`relative flex items-center justify-between p-4 rounded-2xl transition-all group border-b border-transparent ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xl dark:bg-blue-600"
                        : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedSessionId(session.sessionId);
                        setOpenMenuId("");
                      }}
                      className="flex-1 text-left text-xs font-bold tracking-tight truncate pr-2"
                    >
                      {session.title || "New Conversation"}
                    </button>

                    <button
                      onClick={() => setOpenMenuId(openMenuId === session.sessionId ? "" : session.sessionId)}
                      className={`p-1 rounded-lg transition-opacity ${isActive ? "text-white/50 hover:text-white" : "opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800"}`}
                    >
                      <MoreVertical size={14} />
                    </button>

                    {openMenuId === session.sessionId && (
                      <div className="absolute right-4 top-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-xl text-[10px] font-black uppercase tracking-widest z-50 overflow-hidden min-w-[100px]">
                        <button
                          onClick={() => {
                            setConfirmDeleteId(session.sessionId);
                            setOpenMenuId("");
                          }}
                          className="flex items-center gap-2 w-full px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {confirmDeleteId && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl p-6 w-full text-center">
                  <div className="h-12 w-12 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={24} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2">Delete Chat?</h4>
                  <p className="text-xs text-slate-500 mb-6">This action cannot be undone.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmDeleteId("")}
                      className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => confirmDeleteSession(confirmDeleteId)}
                      className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>

          <main className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col overflow-hidden relative">
            {!selectedSessionId ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center p-12">
                <div className="h-20 w-20 rounded-[2rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 mb-6 animate-bounce duration-1000">
                  <MessageSquare size={40} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">Select a Strategy</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">Choose an existing conversation or start a new session to receive AI-powered career mentorship.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
                  {historyLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  ) : (
                    history.map((msg: any, index: number) => {
                      const isUser = msg.messageType === "user";
                      return (
                        <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                          <div className={`flex items-end gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                            <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${isUser ? "bg-slate-900 dark:bg-blue-600 text-white" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"}`}>
                              {isUser ? <User size={14} /> : <Bot size={14} />}
                            </div>
                            <div className={`px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                              isUser 
                                ? "bg-blue-600 text-white rounded-br-none" 
                                : "bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-800"
                            }`}>
                              {isUser ? msg.message : msg.response}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {isPending && (
                    <div className="flex justify-start">
                      <div className="flex items-end gap-3">
                        <div className="h-8 w-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Bot size={14} className="text-blue-600" />
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-800">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-6 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800">
                  <div className="relative max-w-4xl mx-auto flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Ask anything about your roadmap, skills, or interviews..."
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                        <Info size={16} />
                      </div>
                    </div>

                    <button
                      onClick={handleSendMessage}
                      disabled={isPending || !message.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white h-12 w-12 flex items-center justify-center rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                      {isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-center mt-3 text-slate-400 font-bold uppercase tracking-widest">Mentor can make mistakes. Verify critical career info.</p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};