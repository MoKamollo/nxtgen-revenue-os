"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, timeAgo } from "@/lib/utils";
import {
  Search,
  Plus,
  Mail,
  MessageSquare,
  Phone,
  Filter,
  Star,
  Archive,
  Reply,
  Forward,
  MoreHorizontal,
  Paperclip,
  Send,
  Smile,
  Bold,
  Italic,
  Link,
  Image,
  AtSign,
} from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: "c1",
    contact: "Sarah Johnson",
    company: "TechCorp Inc",
    subject: "Re: Enterprise proposal — Q4 timeline",
    preview: "Thanks for the updated proposal. The pricing looks much more aligned with our budget. Can we schedule a call to discuss the implementation timeline?",
    channel: "email",
    time: new Date(Date.now() - 18 * 60 * 1000),
    unread: true,
    starred: true,
    assignee: "Alex Rivera",
  },
  {
    id: "c2",
    contact: "Marcus Williams",
    company: "Innovate IO",
    subject: "Questions about the automation features",
    preview: "I watched your demo video and I'm really interested in the workflow automation capabilities. Do you support custom webhooks?",
    channel: "email",
    time: new Date(Date.now() - 45 * 60 * 1000),
    unread: true,
    starred: false,
    assignee: null,
  },
  {
    id: "c3",
    contact: "Priya Sharma",
    company: "ScaleX AI",
    subject: "Need help with API integration",
    preview: "Hey team, we're getting 401 errors when hitting the contacts endpoint. Our API key is valid but...",
    channel: "chat",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: true,
    starred: false,
    assignee: "Mike Chen",
  },
  {
    id: "c4",
    contact: "James Chen",
    company: "BuildFast Co",
    subject: "Invoice question - INV-2847",
    preview: "Hi, I noticed a discrepancy on the last invoice. The amount doesn't match what we agreed to for the...",
    channel: "email",
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
    unread: false,
    starred: false,
    assignee: "Alex Rivera",
  },
  {
    id: "c5",
    contact: "David Thompson",
    company: "NextStep Co",
    subject: "Following up on our call",
    preview: "Great call yesterday! I've shared the deck with my team. We should have a decision by end of week.",
    channel: "email",
    time: new Date(Date.now() - 8 * 60 * 60 * 1000),
    unread: false,
    starred: true,
    assignee: "Jordan Lee",
  },
];

const messages = [
  {
    id: "m1",
    from: "Sarah Johnson",
    body: "Hi Alex, thank you for sending over the updated enterprise proposal. I've had a chance to review it with our CFO and we're impressed with the value proposition.",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isMe: false,
  },
  {
    id: "m2",
    from: "Alex Rivera",
    body: "Hi Sarah! Great to hear that. We put a lot of thought into the pricing structure to ensure it delivers strong ROI for teams your size. Would you like to jump on a 30-min call to walk through the implementation timeline?",
    time: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    isMe: true,
  },
  {
    id: "m3",
    from: "Sarah Johnson",
    body: "Thanks for the updated proposal. The pricing looks much more aligned with our budget. Can we schedule a call to discuss the implementation timeline and the data migration process?",
    time: new Date(Date.now() - 18 * 60 * 1000),
    isMe: false,
  },
];

export default function InboxPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [reply, setReply] = useState("");

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] animate-fade-in">
        {/* Conversation List */}
        <div className="w-80 shrink-0 border-r border-surface-800 flex flex-col">
          <div className="p-3 border-b border-surface-800 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-surface-200">Inbox</h2>
              <div className="flex items-center gap-1">
                <Badge variant="danger" size="sm">7</Badge>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-surface-600 pointer-events-none" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-7 rounded-lg border border-surface-700 bg-surface-900 pl-8 pr-2 text-xs text-surface-200 placeholder:text-surface-600 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="flex items-center gap-1">
              {["All", "Unread", "Starred", "Mine"].map((tab) => (
                <button key={tab} className="flex-1 h-6 rounded-md text-[10px] text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-surface-800/50">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={cn(
                  "w-full text-left p-3 hover:bg-surface-800/40 transition-colors",
                  selected.id === conv.id && "bg-brand-500/8 border-l-2 border-brand-500"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div className="relative shrink-0">
                    <Avatar name={conv.contact} size="sm" />
                    {conv.unread && (
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-brand-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={cn(
                        "text-xs truncate",
                        conv.unread ? "font-bold text-surface-100" : "font-medium text-surface-300"
                      )}>
                        {conv.contact}
                      </span>
                      <span className="text-[10px] text-surface-600 shrink-0 ml-1">
                        {timeAgo(conv.time)}
                      </span>
                    </div>
                    <p className={cn(
                      "text-[11px] truncate mb-0.5",
                      conv.unread ? "text-surface-200" : "text-surface-500"
                    )}>
                      {conv.subject}
                    </p>
                    <p className="text-[10px] text-surface-600 truncate">
                      {conv.preview}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {conv.channel === "email" ? (
                        <Mail size={10} className="text-surface-600" />
                      ) : (
                        <MessageSquare size={10} className="text-surface-600" />
                      )}
                      <span className="text-[10px] text-surface-600">{conv.company}</span>
                      {conv.starred && <Star size={10} className="text-amber-400 fill-amber-400 ml-auto" />}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Email Thread */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Thread header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-surface-800">
            <div>
              <h3 className="text-sm font-semibold text-surface-100">{selected.subject}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Avatar name={selected.contact} size="xs" />
                <span className="text-xs text-surface-400">{selected.contact}</span>
                <span className="text-surface-700">·</span>
                <span className="text-xs text-surface-600">{selected.company}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                <Star size={14} />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                <Archive size={14} />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex gap-3", msg.isMe && "flex-row-reverse")}
              >
                <Avatar name={msg.from} size="sm" />
                <div className={cn(
                  "max-w-xl rounded-xl p-3.5",
                  msg.isMe
                    ? "bg-brand-500/15 border border-brand-500/25"
                    : "bg-surface-800/60 border border-surface-700/50"
                )}>
                  <div className={cn(
                    "flex items-center justify-between gap-4 mb-2",
                    msg.isMe && "flex-row-reverse"
                  )}>
                    <span className="text-xs font-semibold text-surface-200">
                      {msg.from}
                    </span>
                    <span className="text-[10px] text-surface-600">
                      {timeAgo(msg.time)}
                    </span>
                  </div>
                  <p className="text-xs text-surface-300 leading-relaxed">{msg.body}</p>
                  <div className={cn(
                    "flex items-center gap-1.5 mt-2 opacity-0 hover:opacity-100 transition-opacity",
                    msg.isMe && "justify-end"
                  )}>
                    <button className="flex items-center gap-1 text-[10px] text-surface-600 hover:text-surface-400 transition-colors">
                      <Reply size={10} /> Reply
                    </button>
                    <button className="flex items-center gap-1 text-[10px] text-surface-600 hover:text-surface-400 transition-colors">
                      <Forward size={10} /> Forward
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <div className="border-t border-surface-800 p-4">
            <div className="rounded-xl border border-surface-700 bg-surface-900/60 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-800">
                <span className="text-xs text-surface-500">To:</span>
                <div className="flex items-center gap-1.5 bg-surface-800 rounded-full px-2 py-0.5">
                  <Avatar name={selected.contact} size="xs" />
                  <span className="text-xs text-surface-300">{selected.contact}</span>
                </div>
              </div>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply... (AI will suggest completions)"
                rows={3}
                className="w-full bg-transparent px-3 py-2.5 text-xs text-surface-200 placeholder:text-surface-600 resize-none focus:outline-none"
              />
              <div className="flex items-center justify-between px-3 py-2 border-t border-surface-800">
                <div className="flex items-center gap-1">
                  {[Bold, Italic, Link, Image, Paperclip, Smile, AtSign].map((Icon, i) => (
                    <button key={i} className="flex h-6 w-6 items-center justify-center rounded-md text-surface-600 hover:text-surface-400 hover:bg-surface-800 transition-all">
                      <Icon size={12} />
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg border border-brand-500/30 bg-brand-500/10 text-xs text-brand-400 hover:bg-brand-500/20 transition-all">
                    ✨ AI Draft
                  </button>
                  <Button variant="gradient" size="sm" icon={Send}>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Sidebar */}
        <div className="w-72 shrink-0 border-l border-surface-800 overflow-y-auto p-4 space-y-4">
          <div className="text-center">
            <Avatar name={selected.contact} size="2xl" className="mx-auto" />
            <h3 className="mt-3 text-sm font-bold text-surface-100">{selected.contact}</h3>
            <p className="text-xs text-surface-500">{selected.company}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Button variant="outline" size="xs" icon={Mail}>Email</Button>
              <Button variant="outline" size="xs" icon={Phone}>Call</Button>
              <Button variant="outline" size="xs" icon={MessageSquare}>SMS</Button>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "Email", value: "sarah@techcorp.com" },
              { label: "Phone", value: "+1 (555) 234-5678" },
              { label: "Company", value: "TechCorp Inc" },
              { label: "Title", value: "VP of Sales" },
              { label: "Source", value: "Website" },
              { label: "AI Score", value: "92 / 100" },
            ].map((field) => (
              <div key={field.label} className="flex items-center justify-between py-1.5 border-b border-surface-800/60">
                <span className="text-[11px] text-surface-600">{field.label}</span>
                <span className="text-[11px] font-medium text-surface-300">{field.value}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-surface-400 mb-2">Open Deals</h4>
            <div className="rounded-lg border border-surface-800 p-3">
              <p className="text-xs font-semibold text-surface-200">Enterprise License</p>
              <p className="text-xs text-emerald-400 font-bold mt-0.5">$84,000</p>
              <p className="text-[11px] text-surface-500">Negotiation · 80%</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-surface-400 mb-2">Recent Activity</h4>
            <div className="space-y-2">
              {["Email opened · 2h ago", "Proposal viewed · 1d ago", "Call completed · 3d ago"].map((act) => (
                <div key={act} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500/60" />
                  <span className="text-[11px] text-surface-500">{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
