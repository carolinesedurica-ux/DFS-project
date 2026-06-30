"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Search, Send, User, ChevronRight, Inbox, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { DEMO_MESSAGES } from "@/data/demo/messages";
import type { Message } from "@/types/models";

export default function PortalMessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");
  const [conversationThread, setConversationThread] = useState<Message[]>([]);

  useEffect(() => {
    if (user) {
      const filtered = DEMO_MESSAGES.filter(m => m.customerId === user.customerId);
      setMessages(filtered);
      // Select the first message by default if available
      if (filtered.length > 0) {
        setSelectedMessage(filtered[0]);
      }
    }
  }, [user]);

  useEffect(() => {
    if (selectedMessage) {
      // Find related messages in the same category or referencing same shipment to form a thread
      const thread = messages.filter(m => 
        (m.shipmentId && m.shipmentId === selectedMessage.shipmentId) || 
        (m.subject.toLowerCase().includes(selectedMessage.subject.toLowerCase().substring(0, 10)))
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      setConversationThread(thread.length > 0 ? thread : [selectedMessage]);
      
      // Mark as read in current list
      setMessages(prev => prev.map(m => m.id === selectedMessage.id ? { ...m, readStatus: true } : m));
    }
  }, [selectedMessage, messages]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage || !user) return;

    const newReply: Message = {
      id: `msg-${Date.now()}`,
      customerId: user.customerId,
      shipmentId: selectedMessage.shipmentId,
      sender: user.name,
      senderRole: "customer",
      recipient: selectedMessage.sender,
      subject: `Re: ${selectedMessage.subject}`,
      body: replyText,
      timestamp: new Date().toISOString(),
      readStatus: true,
      category: selectedMessage.category
    };

    // Append to list of messages and conversation thread
    setMessages([...messages, newReply]);
    setConversationThread([...conversationThread, newReply]);
    setReplyText("");
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.body.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 h-[calc(100vh-140px)] flex flex-col">
      {/* Page Header */}
      <div className="flex-shrink-0">
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <MessageSquare className="h-8 w-8 text-accent-gold" />
          <span>Operations Communication Hub</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Direct secure messaging with your dedicated DFS account managers, customs clearing agents, and control tower dispatchers.
        </p>
      </div>

      {/* Main Mail Split View */}
      <div className="flex-grow flex border border-accent-gold/20 rounded-2xl bg-primary-deep overflow-hidden">
        
        {/* Left Side: Inbox List (5 columns equivalent) */}
        <div className="w-80 flex-shrink-0 border-r border-accent-gold/10 flex flex-col bg-primary-deep">
          <div className="p-4 border-b border-accent-gold/10 bg-primary-black/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-primary-black border border-accent-gold/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto divide-y divide-accent-gold/5">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((m) => {
                const isSelected = selectedMessage?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMessage(m)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-primary-black/40 border-l-4 border-accent-gold" 
                        : "hover:bg-primary-black/10"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-extrabold text-xs text-white truncate max-w-[120px]">{m.sender}</span>
                      <span className="text-[9px] text-gray-500 font-semibold">{new Date(m.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-1">
                      {!m.readStatus && <span className="h-1.5 w-1.5 bg-accent-gold rounded-full flex-shrink-0"></span>}
                      <h4 className={`text-xs truncate ${!m.readStatus ? "font-bold text-white" : "font-medium text-gray-300"}`}>
                        {m.subject}
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate mt-1 font-medium">{m.body}</p>
                  </div>
                );
              })
            ) : (
              <div className="p-10 text-center text-gray-500 flex flex-col items-center justify-center space-y-2">
                <Inbox className="h-8 w-8 text-gray-600" />
                <span className="text-xs font-semibold">No messages found</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Conversation Thread (rest of space) */}
        <div className="flex-grow flex flex-col bg-primary-black/20">
          {selectedMessage ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-accent-gold/10 bg-primary-deep/40 flex justify-between items-center">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-sm text-white">{selectedMessage.subject}</h3>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Category: {selectedMessage.category}</p>
                </div>
                {selectedMessage.shipmentId && (
                  <span className="px-2.5 py-0.5 rounded bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-[9px] font-bold font-mono">
                    Shipment: {selectedMessage.shipmentId}
                  </span>
                )}
              </div>

              {/* Message History Bubble Area */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {conversationThread.map((msg) => {
                  const isUser = msg.senderRole === "customer";
                  return (
                    <div 
                      key={msg.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-md rounded-2xl p-4 space-y-1.5 shadow-md ${
                        isUser 
                          ? "bg-accent-gold text-primary-deep font-semibold" 
                          : "bg-primary-deep text-white border border-accent-gold/15"
                      }`}>
                        <div className="flex justify-between items-center text-[10px] gap-8">
                          <span className="font-extrabold flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{msg.sender}</span>
                          </span>
                          <span className={`${isUser ? "text-primary-deep/60" : "text-gray-500"}`}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed font-medium whitespace-pre-line">{msg.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Send Footer */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-accent-gold/10 bg-primary-deep/40 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a secure reply for DFS operations..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-grow px-4 py-3.5 bg-primary-black border border-accent-gold/25 focus:border-accent-gold rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="p-3.5 gold-gradient text-primary-deep hover:brightness-110 rounded-xl transition flex items-center justify-center flex-shrink-0"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-500 space-y-3">
              <Mail className="h-10 w-10 text-gray-700" />
              <p className="text-xs font-semibold">Select a conversation thread from the sidebar list to view correspondence details.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
