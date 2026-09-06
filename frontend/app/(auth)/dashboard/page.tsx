"use client";

import { useRouter } from "next/navigation";

const stats = [
  { label: "Upcoming Bookings", value: "12", accent: "from-indigo-500 to-violet-500" },
  { label: "Active Venues", value: "5", accent: "from-cyan-500 to-emerald-500" },
  { label: "This Month Revenue", value: "$8,240", accent: "from-amber-500 to-orange-500" },
  { label: "Occupancy Rate", value: "78%", accent: "from-pink-500 to-rose-500" },
];

const activity = [
  { title: "New booking — Grand Hall", time: "2 hours ago", tone: "bg-emerald-400" },
  { title: "Venue \"Skyline Loft\" updated", time: "5 hours ago", tone: "bg-indigo-400" },
  { title: "Booking cancelled — Garden Pavilion", time: "1 day ago", tone: "bg-rose-400" },
  { title: "New venue added — Riverside Deck", time: "2 days ago", tone: "bg-cyan-400" },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                VenueBook
              </p>
              <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back 👋</h2>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening across your venues today.
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            >
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.accent} opacity-20 blur-2xl`}
              />
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent activity */}
          <div className="lg:col-span-2 rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              Recent activity
            </h3>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {item.title}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Session card */}
          <div className="rounded-2xl border border-slate-800/10 bg-[rgba(15,23,42,0.85)] p-6 shadow-[0_10px_40px_rgba(15,23,42,0.2)] backdrop-blur-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
              Session
            </p>
            <h3 className="mt-2 text-lg font-bold text-white">
              You&apos;re securely signed in
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              This page only renders because middleware validated your
              session cookie server-side. The token itself is httpOnly and
              never touches client JavaScript.
            </p>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-emerald-300">
              ● Session active
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}