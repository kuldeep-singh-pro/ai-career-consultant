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
  useClearMentorSession,
} from "../hooks/useMentor";

export const MentorChatPage: React.FC =
  () => {
    const [
      selectedSessionId,
      setSelectedSessionId,
    ] = useState("");

    const [
      openMenuId,
      setOpenMenuId,
    ] = useState("");

    const [
      confirmDeleteId,
      setConfirmDeleteId,
    ] = useState("");

    const menuRef =
      useRef<HTMLDivElement>(null);

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

    const {
      mutate: deleteSession,
    } = useClearMentorSession();

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView(
        { behavior: "smooth" }
      );
    }, [history]);

    useEffect(() => {
      const handleClickOutside = (
        event: MouseEvent
      ) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(
            event.target as Node
          )
        ) {
          setOpenMenuId("");
        }
      };

      document.addEventListener(
        "mousedown",
        handleClickOutside
      );

      return () =>
        document.removeEventListener(
          "mousedown",
          handleClickOutside
        );
    }, []);

    useEffect(() => {
      const escHandler = (
        e: KeyboardEvent
      ) => {
        if (e.key === "Escape") {
          setOpenMenuId("");
          setConfirmDeleteId("");
        }
      };

      window.addEventListener(
        "keydown",
        escHandler
      );

      return () =>
        window.removeEventListener(
          "keydown",
          escHandler
        );
    }, []);

    const startNewChat = () => {
      const id =
        "session_" + Date.now();

      setSelectedSessionId(id);
      setOpenMenuId("");
    };

    const handleSendMessage = () => {
      if (!message.trim())
        return;

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

    const confirmDeleteSession =
      (sessionId: string) => {
        deleteSession(sessionId, {
          onSuccess: () => {
            if (
              selectedSessionId ===
              sessionId
            ) {
              setSelectedSessionId("");
            }

            setConfirmDeleteId("");
            setOpenMenuId("");
            refetchSessions();
          },
        });
      };

    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto h-[82vh] flex flex-col">
          <h1 className="text-3xl font-bold mb-6">
            AI Mentor
          </h1>

          <div className="flex flex-1 gap-6">
            <div className="w-72 bg-white border rounded-xl shadow-sm flex flex-col relative">
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

              <div
                ref={menuRef}
                className="flex-1 overflow-y-auto p-3 space-y-2"
              >
                {sessions?.map(
                  (session: any) => (
                    <div
                      key={
                        session.sessionId
                      }
                      className={`relative flex items-center justify-between px-3 py-2 rounded-lg group ${
                        selectedSessionId ===
                        session.sessionId
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSelectedSessionId(
                            session.sessionId
                          );
                          setOpenMenuId(
                            ""
                          );
                        }}
                        className="flex-1 text-left text-sm"
                      >
                        {session.title?.slice(
                          0,
                          35
                        ) ||
                          "New Conversation"}
                      </button>

                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId ===
                              session.sessionId
                              ? ""
                              : session.sessionId
                          )
                        }
                        className="opacity-0 group-hover:opacity-100 transition px-1"
                      >
                        ⋯
                      </button>

                      {openMenuId ===
                        session.sessionId && (
                        <div className="absolute right-2 top-9 bg-white border shadow rounded text-sm z-10">
                          <button
                            onClick={() => {
                              setConfirmDeleteId(
                                session.sessionId
                              );
                              setOpenMenuId(
                                ""
                              );
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              {confirmDeleteId && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-72">
                    <p className="text-sm mb-4">
                      Delete this
                      conversation?
                    </p>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          setConfirmDeleteId(
                            ""
                          )
                        }
                        className="px-4 py-1 text-sm border rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() =>
                          confirmDeleteSession(
                            confirmDeleteId
                          )
                        }
                        className="px-4 py-1 text-sm bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
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