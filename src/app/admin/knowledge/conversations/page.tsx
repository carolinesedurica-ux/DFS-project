"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { createClient } from '@supabase/supabase-js';
import { MessageSquare, ArrowLeft, Loader2, Calendar, User, Compass, HelpCircle } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AIConversationsAudit() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  async function loadConversations() {
    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  const selectConversation = async (conv: any) => {
    setSelectedConversation(conv);
    setMessagesLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_messages')
        .select('*')
        .eq('conversation_id', conv.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const columns = [
    { 
      key: 'user', 
      header: 'User Account',
      render: (row: any) => (
        <span className="font-semibold text-white flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-gray-500" />
          <span>{row.profiles?.full_name || 'Guest User'}</span>
        </span>
      )
    },
    { 
      key: 'portal', 
      header: 'Portal Access',
      render: (row: any) => (
        <span className="inline-flex items-center space-x-1 text-xs text-yellow-500 font-semibold bg-yellow-500/5 px-2 py-0.5 rounded border border-yellow-500/10 capitalize">
          <Compass className="h-3 w-3" />
          <span>{row.portal}</span>
        </span>
      )
    },
    { 
      key: 'created_at', 
      header: 'Start Date',
      render: (row: any) => (
        <span className="text-gray-400 text-xs flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>{new Date(row.created_at).toLocaleString()}</span>
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Action',
      render: (row: any) => (
        <button 
          onClick={() => selectConversation(row)}
          className="text-xs bg-gray-800 hover:bg-gray-700 text-white font-bold px-3 py-1.5 rounded-lg border border-gray-700 transition-colors cursor-pointer"
        >
          View Transcript
        </button>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        <span className="text-sm font-medium text-gray-400">Loading Session Logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-gray-100">
      <div className="flex items-center space-x-3">
        <Link 
          href="/admin/knowledge" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <PortalPageHeader 
          title="AI Conversation Logs" 
          description="Audit historical interaction transcripts, analyze queries, and inspect pgvector retrieved chunks."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Roster */}
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm flex flex-col overflow-hidden">
          <h3 className="font-bold text-sm text-yellow-500 uppercase tracking-wider mb-4">Active Sessions</h3>
          <div className="overflow-y-auto max-h-[500px]">
            <PortalDataTable columns={columns} data={conversations} />
          </div>
        </div>

        {/* Conversation Transcript Viewer */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col min-h-[400px]">
          {selectedConversation ? (
            <div className="flex-1 flex flex-col h-full">
              {/* Selected header */}
              <div className="border-b border-gray-800 pb-4 mb-4 flex justify-between items-center text-xs">
                <div>
                  <h4 className="text-sm font-bold text-yellow-500">{selectedConversation.profiles?.full_name || 'Anonymous User'}</h4>
                  <p className="text-gray-500 font-semibold">{selectedConversation.profiles?.email}</p>
                </div>
                <div className="text-right text-gray-500">
                  <span className="bg-gray-800 px-2 py-0.5 rounded font-bold mr-2 text-[10px] capitalize">{selectedConversation.portal} Portal</span>
                  <span>Session: {selectedConversation.id.slice(0, 8)}</span>
                </div>
              </div>

              {/* Message transcript logs */}
              {messagesLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                </div>
              ) : (
                <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2 text-xs">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-10">No messages logged in this session.</p>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={i} className="space-y-2">
                        <div className={`p-4 rounded-xl leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-gray-800 text-white border border-gray-700 ml-12' 
                            : 'bg-yellow-500/5 text-gray-200 border border-yellow-500/10 mr-12'
                        }`}>
                          <span className="block font-bold mb-1.5 uppercase tracking-wider text-[9px] opacity-60">
                            {msg.role === 'user' ? 'Client Query' : 'AI Response'}
                          </span>
                          <p className="whitespace-pre-line font-medium">{msg.content}</p>
                        </div>
                        {msg.retrieved_chunks && msg.retrieved_chunks.length > 0 && (
                          <div className="ml-4 p-3 bg-gray-950/50 border border-gray-800 rounded-lg text-[10px] text-gray-500 space-y-1.5 mr-12">
                            <span className="font-bold flex items-center gap-1 text-gray-400 uppercase tracking-widest text-[9px]">
                              <HelpCircle className="h-3 w-3 text-yellow-500" />
                              <span>Retrieved Context ({msg.retrieved_chunks.length})</span>
                            </span>
                            {msg.retrieved_chunks.map((c: any, idx: number) => (
                              <p key={idx} className="border-t border-gray-900 pt-1 leading-normal font-medium">
                                <strong>Chunk {idx + 1} ({c.document_name}):</strong> "{c.content.slice(0, 160)}..."
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-20 text-gray-500">
              <MessageSquare className="h-12 w-12 text-gray-700" />
              <p className="font-bold text-sm">Select a conversation transcript to inspect audit metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
