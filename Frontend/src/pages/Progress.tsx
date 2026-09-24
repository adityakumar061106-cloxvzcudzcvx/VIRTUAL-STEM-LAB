import Sidebar from "../components/Sidebar";

const subjects = [
  {
    name: "Physics",
    completed: 8,
    total: 10,
    percentage: 80,
    icon: "⚡",
  },
  {
    name: "Chemistry",
    completed: 6,
    total: 8,
    percentage: 75,
    icon: "🧪",
  },
  {
    name: "Biology",
    completed: 4,
    total: 6,
    percentage: 67,
    icon: "🌱",
  },
];

const achievements = [
  {
    title: "Lab Explorer",
    description: "Complete your first 5 experiments.",
    icon: "🏆",
    status: "Unlocked",
  },
  {
    title: "STEM Streak",
    description: "Keep learning for 7 consecutive days.",
    icon: "🔥",
    status: "Unlocked",
  },
  {
    title: "Top Performer",
    description: "Maintain an average score above 85%.",
    icon: "⭐",
    status: "Unlocked",
  },
];

function Progress() {
  return (
    <div className="min-h-screen bg-[#020b1c] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* HEADER */}
          <header className="border-b border-blue-950/60 bg-[#041126]/90 px-5 py-6 backdrop-blur-xl lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Learning Analytics
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Your Progress
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Track your STEM learning journey and experiment
              completion.
            </p>
          </header>

          <div className="p-5 lg:p-8">
            {/* OVERALL PROGRESS */}
            <section className="relative overflow-hidden rounded-2xl border border-blue-900/60 bg-gradient-to-br from-[#071936] to-[#06142c] p-6 shadow-xl shadow-blue-950/30">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                    Overall Performance
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Keep going, you're doing great!
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    18 of 24 experiments completed
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[conic-gradient(#22d3ee_0_75%,#142746_75%_100%)] shadow-lg shadow-cyan-500/10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#071936]">
                      <span className="text-2xl font-black">
                        75%
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <p className="text-xs text-slate-500">
                      Completion
                    </p>

                    <p className="mt-1 text-xl font-bold text-cyan-400">
                      18 / 24
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-7">
                <div className="h-3 overflow-hidden rounded-full bg-blue-950">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                    style={{ width: "75%" }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>75% completed</span>
                  <span>100%</span>
                </div>
              </div>
            </section>

            {/* QUICK STATS */}
            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-900/60 bg-[#071936] p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Experiments
                </p>

                <p className="mt-2 text-3xl font-black">
                  24
                </p>

                <p className="mt-1 text-xs text-cyan-400">
                  Total available
                </p>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071936] p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-black">
                  18
                </p>

                <p className="mt-1 text-xs text-emerald-400">
                  Great progress
                </p>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071936] p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Average Score
                </p>

                <p className="mt-2 text-3xl font-black">
                  87%
                </p>

                <p className="mt-1 text-xs text-amber-400">
                  Top performer
                </p>
              </div>
            </section>

            {/* SUBJECT PROGRESS */}
            <section className="mt-9">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
                  Performance Breakdown
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Subject Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  See how you're progressing across each STEM
                  subject.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {subjects.map((subject) => (
                  <div
                    key={subject.name}
                    className="group rounded-2xl border border-blue-900/60 bg-[#071936] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-blue-950/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/80 text-2xl">
                          {subject.icon}
                        </div>

                        <div>
                          <h3 className="font-bold">
                            {subject.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {subject.completed} /{" "}
                            {subject.total} completed
                          </p>
                        </div>
                      </div>

                      <span className="text-lg font-bold text-cyan-400">
                        {subject.percentage}%
                      </span>
                    </div>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-blue-950">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{
                          width: `${subject.percentage}%`,
                        }}
                      />
                    </div>

                    <div className="mt-4 flex justify-between text-xs text-slate-600">
                      <span>Progress</span>

                      <span>
                        {subject.total - subject.completed}{" "}
                        remaining
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="mt-9">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
                  Milestones
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Achievements
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Celebrate your STEM learning milestones.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className="relative overflow-hidden rounded-2xl border border-blue-900/60 bg-[#071936] p-6 transition hover:border-cyan-500/40"
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/5 blur-2xl" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="text-4xl">
                          {achievement.icon}
                        </div>

                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                          {achievement.status}
                        </span>
                      </div>

                      <h3 className="mt-6 text-lg font-bold">
                        {achievement.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* MOTIVATION */}
            <section className="mt-8 overflow-hidden rounded-2xl border border-cyan-900/40 bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-indigo-950/40 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-cyan-400">
                    🚀 Keep Exploring
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    You're only 6 experiments away from completing
                    your journey.
                  </h3>
                </div>

                <span className="text-4xl">
                  🧪
                </span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Progress;