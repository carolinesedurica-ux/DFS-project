"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { MessageSquare, X, Send, Bot, Loader2, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function ChatWidget() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine portal type and system info based on pathname
  let portal = 'marketing';
  let title = 'DFS Corporate Assistant';
  let accentColor = 'bg-primary-royal';
  let textColor = 'text-primary-royal';
  let initialGreeting = 'Hello! Welcome to DFS Group. How can I assist you with transport, logistics, or customs clearing today?';
  let suggestions = ['What services do you offer?', 'Where do you operate?', 'How do I request a quote?'];

  if (pathname?.startsWith('/trucking')) {
    portal = 'trucking';
    title = 'DFS Logistics Assistant';
    accentColor = 'bg-emerald-600';
    textColor = 'text-emerald-600';
    initialGreeting = 'Hi there! I am your DFS Trucking assistant. Ask me about corridor transit times, reefer SOPs, our fleet specifications, or quotes.';
    suggestions = ['SOP for refrigerated cargo', 'Show trucking routes', 'How to request a spot quote?'];
  } else if (pathname?.startsWith('/clearing')) {
    portal = 'clearing';
    title = 'DFS Customs Assistant';
    accentColor = 'bg-sky-600';
    textColor = 'text-sky-600';
    initialGreeting = 'Welcome! I am your DFS Customs Clearing assistant. I can help guide you on HS codes, BURS import permits, and regional SADC regulations.';
    suggestions = ['Burton import regulations', 'Required documents for import', 'Burton VAT and customs tariffs'];
  } else if (pathname?.startsWith('/express')) {
    portal = 'express';
    title = 'DFS Courier Assistant';
    accentColor = 'bg-zinc-800';
    textColor = 'text-zinc-800';
    initialGreeting = 'Hello! DFS Express Assistant here. Let me help you track a parcel, check local shipping rates, or book a courier pickup.';
    suggestions = ['How to track my parcel?', 'Express courier rates', 'Book a delivery'];
  } else if (pathname?.startsWith('/admin')) {
    const isSuperAdmin = user?.role === 'dfs_admin';
    portal = isSuperAdmin ? 'super_admin' : 'admin';
    title = isSuperAdmin ? 'DFS Enterprise Intelligence' : 'DFS Operations Control';
    accentColor = 'bg-amber-600';
    textColor = 'text-amber-600';
    initialGreeting = `Control Tower active. Hello, ${user?.name || 'Operator'}. How can I assist you with operational analytics, sync audits, or client data today?`;
    suggestions = isSuperAdmin 
      ? ['Show today\'s delayed shipments', 'Show overdue invoices', 'Check Sage sync status']
      : ['Which trucks are inactive?', 'Find SOP for reefer cargo', 'Revenue this month'];
  }

  // Initialize chat when opened
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: initialGreeting }]);
    }
  }, [isOpen, initialGreeting]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    if (!textToSend) setInput('');
    setIsLoading(true);

    const newMessages = [...messages, { role: 'user' as const, content: messageText }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.slice(1), // omit greeting
          portal,
          userContext: user ? {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.customerId !== 'dfs-internal' ? user.customerId : null,
            companyName: user.companyName
          } : null,
          conversationId
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
        if (data.conversationId) setConversationId(data.conversationId);
      } else {
        throw new Error(data.error || 'Server returned an error');
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}. Please try again.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 ${accentColor} text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all z-50 flex items-center justify-center cursor-pointer ring-4 ring-white/10`}
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden transition-all ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
      {/* Header */}
      <div className={`${accentColor} p-4 text-white flex justify-between items-center select-none`}>
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-accent-gold animate-pulse" />
          <div>
            <h3 className="font-bold text-sm leading-tight">{title}</h3>
            <span className="text-[10px] text-white/70 font-medium">Assistant Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="hover:bg-white/15 p-1 rounded transition-colors text-white/80 hover:text-white"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button 
            onClick={() => setIsOpen(false)} 
            className="hover:bg-white/15 p-1 rounded transition-colors text-white/80 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 flex flex-col scrollbar-thin">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? `${accentColor} text-white self-end rounded-tr-none shadow-sm` 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.content.split('\n').map((line, k) => (
                  <p key={k} className={k > 0 ? 'mt-1.5' : ''}>
                    {line.startsWith('- ') || line.startsWith('* ') ? (
                      <span className="block pl-2">• {line.slice(2)}</span>
                    ) : line}
                  </p>
                ))}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-100 text-gray-400 p-3 rounded-2xl rounded-tl-none text-xs self-start flex items-center space-x-2 shadow-sm">
                <Loader2 className={`h-4 w-4 animate-spin ${textColor}`} />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="text-[10px] bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 px-2.5 py-1 rounded-full font-semibold shadow-sm transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 flex items-center space-x-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-900"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-xl text-white transition-all cursor-pointer ${
                input.trim() ? `${accentColor} hover:scale-105` : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
