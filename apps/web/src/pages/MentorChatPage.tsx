import {
  useState,
  useEffect,
  useRef,
} from "react";

import { DashboardLayout } from "../layouts/DashboardLayout";

import {
  useMentorSessions,
  useMentorHistory,
  useSendMessage,
} from "../hooks/useMentor";

export const MentorChatPage: React.FC =
  () => {
    const [
      selectedSessionId,
      setSelectedSessionId,
    ] = useState("");

    const [
      tempTitles,
      setTempTitles,
    ] = useState<
      Record<string, string>
    >({});

    const [message, setMessage] =
      useState("");

    const messagesEndRef =
      useRef<HTMLDivElement>(null);

    const {
      data: sessions,
      refetch: refetchSessions,
    } = useMentorSessions();

    const {
      data: history = [],
      refetch: refetchHistory,
    } = useMentorHistory(
      selectedSessionId,
      50,
      !!selectedSessionId
    );

    const {
      mutate: sendMessage,
      isPending,
    } = useSendMessage();

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView(
        {
          behavior: "smooth",
        }
      );
    }, [history]);

    const startNewChat = () => {
      const id =
        "session_" + Date.now();

      setSelectedSessionId(id);

      setTempTitles((prev) => ({
        ...prev,
        [id]: "New Conversation",
      }));
    };

    const handleSendMessage = () => {
      if (!message.trim())
        return;

      if (
        !tempTitles[
          selectedSessionId
        ]
      ) {
        setTempTitles((prev) => ({
          ...prev,
          [selectedSessionId]:
            message.slice(0, 40),
        }));
      }

      sendMessage(
        {
          sessionId:
            selectedSessionId,
          message,
        },
        {
          onSuccess: () => {
            setMessage("");

            refetchSessions();

            refetchHistory();
          },
        }
      );
    };

    const getSessionTitle = (
      session: any
    ) => {
      if (session.title)
        return session.title.slice(
          0,
          40
        );

      if (
        tempTitles[
          session.sessionId
        ]
      )
        return tempTitles[
          session.sessionId
        ];

      return "New Conversation";
    };

    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto h-[82vh] flex flex-col">
          <h1 className="text-3xl font-bold mb-6">
            AI Mentor
          </h1>

          <div className="flex flex-1 gap-6">
            <div className="w-72 bg-white border rounded-xl shadow-sm flex flex-col">
              <div className="p-4 border-b">
                <button
                  onClick={
                    startNewChat
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                >
                  + New Chat
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {sessions?.map(
                  (session: any) => (
                    <button
                      key={
                        session.sessionId
                      }
                      onClick={() =>
                        setSelectedSessionId(
                          session.sessionId
                        )
                      }
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                        selectedSessionId ===
                        session.sessionId
                          ? "bg-blue-600 text-white shadow"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {getSessionTitle(
                        session
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex-1 bg-white border rounded-xl shadow-sm flex flex-col">
              {!selectedSessionId ? (
                <div className="flex flex-1 items-center justify-center text-gray-500 text-lg">
                  Start a new chat with AI Mentor
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {history.map(
                      (
                        msg: any,
                        index: number
                      ) => (
                        <div
                          key={
                            index
                          }
                          className={`flex ${
                            msg.messageType ===
                            "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`px-5 py-3 rounded-xl max-w-[70%] text-sm leading-relaxed shadow-sm ${
                              msg.messageType ===
                              "user"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {msg.messageType ===
                            "user"
                              ? msg.message
                              : msg.response}
                          </div>
                        </div>
                      )
                    )}

                    <div
                      ref={
                        messagesEndRef
                      }
                    />
                  </div>

                  <div className="border-t p-4 flex gap-3">
                    <input
                      value={
                        message
                      }
                      onChange={(e) =>
                        setMessage(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        e.key ===
                          "Enter" &&
                        handleSendMessage()
                      }
                      placeholder="Ask mentor anything about career, skills, roadmap..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      onClick={
                        handleSendMessage
                      }
                      disabled={
                        isPending
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition disabled:opacity-50"
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