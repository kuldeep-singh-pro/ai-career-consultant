import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useMentorSessions, useCreateMentorSession, useMentorHistory, useSendMessage } from '../hooks/useMentor';

export const MentorChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [newTopic, setNewTopic] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: sessions, isPending: sessionsLoading, refetch: refetchSessions } = useMentorSessions();
  const { data: history = [], isPending: historyLoading } = useMentorHistory(selectedSessionId, 50, !!selectedSessionId);
  const { mutate: createSession, isPending: isCreatingSession } = useCreateMentorSession();
  const { mutate: sendMutate, isPending: isSending } = useSendMessage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCreateSession = () => {
    if (!newTopic.trim()) return;
    createSession(newTopic, {
      onSuccess: (data: any) => {
        setSelectedSessionId(data.id);
        setNewTopic('');
        refetchSessions();
      },
    });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedSessionId) return;
    sendMutate(
      { sessionId: selectedSessionId, message },
      {
        onSuccess: () => {
          setMessage('');
        },
      }
    );
  };

  if (sessionsLoading) return <div className="text-center py-12">Loading mentor chat...</div>;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Mentor Chat</h1>

        <div className="flex gap-6 h-[600px]">
          <div className="w-64 bg-white dark:bg-slate-800 rounded-lg shadow-md flex flex-col">
            <div className="p-4 border-b dark:border-slate-700">
              <h2 className="font-bold mb-3">Sessions</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="New topic..."
                  className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded text-sm"
                />
                <button
                  onClick={handleCreateSession}
                  disabled={isCreatingSession || !newTopic.trim()}
                  className="w-full px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-slate-400"
                >
                  {isCreatingSession ? 'Creating...' : 'New Session'}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {sessions?.map((session: any) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedSessionId === session.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {session.topic}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg shadow-md flex flex-col">
            {!selectedSessionId ? (
              <div className="flex-1 flex items-center justify-center text-slate-600 dark:text-slate-400">
                Select or create a session to start chatting
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {historyLoading ? (
                    <div className="text-center">Loading messages...</div>
                  ) : history.length === 0 ? (
                    <div className="text-center text-slate-600 dark:text-slate-400">No messages yet</div>
                  ) : (
                    history.map((msg: any) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t dark:border-slate-700 flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isSending || !message.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400"
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
