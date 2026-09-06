import "./login.css";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export default function LoginPage() {
  return (
    <main className="login-page flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),transparent_30%)]" />

        <div className="relative grid lg:grid-cols-2">
          <section className="hidden items-center justify-center overflow-hidden bg-slate-950 p-10 text-white lg:flex">
            <div className="relative w-full max-w-md">
              <div className="orb absolute -left-8 top-8 h-32 w-32 rounded-full bg-indigo-500/40 blur-2xl" />
              <div className="orb absolute bottom-10 right-0 h-40 w-40 rounded-full bg-emerald-400/30 blur-2xl" />
              <div className="relative space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 backdrop-blur">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300 font-bold text-slate-950">
                    V
                  </span>
                  VenueBook
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-200">
                    Welcome back
                  </p>
                  <h1 className="text-4xl font-bold leading-tight">
                    Manage events and bookings with ease.
                  </h1>
                </div>

                <p className="max-w-sm text-base leading-7 text-slate-300">
                  Keep your venue schedule organized, track reservations in real
                  time, and deliver a seamless guest experience from one smart
                  platform.
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold text-white">240+</div>
                    <div className="mt-1 text-xs text-slate-300">Bookings</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold text-white">18</div>
                    <div className="mt-1 text-xs text-slate-300">Venues</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold text-white">99%</div>
                    <div className="mt-1 text-xs text-slate-300">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="login-card w-full max-w-md rounded-[28px] p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-300">
                    Sign in
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white">
                    Welcome
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
                  <span className="text-lg font-bold text-white">V</span>
                </div>
              </div>

              <form className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    className={fieldClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={fieldClass}
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-400 bg-slate-950 text-indigo-500 focus:ring-indigo-400"
                    />
                    Remember me
                  </label>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">
                    Secure login
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                >
                  Sign in
                </button>
              </form>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-700" />
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  or
                </span>
                <div className="h-px flex-1 bg-slate-700" />
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-slate-900/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                >
                  <span className="text-base">G</span>
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-slate-900/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                >
                  <span className="text-base">◌</span>
                  Continue with Apple
                </button>
              </div>

              <p className="mt-7 text-center text-sm text-slate-300">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="font-semibold text-indigo-300 transition hover:text-indigo-200"
                >
                  Create account
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
