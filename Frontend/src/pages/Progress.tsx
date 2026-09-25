import Sidebar from "../components/Sidebar";
import {
  faArrowTrendUp,
  faBolt,
  faBookOpen,
  faChartColumn,
  faCheck,
  faClock,
  faFlask,
  faPlay,
  faSeedling,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const subjects = [
  {
    name: "Physics",
    completed: 8,
    total: 10,
    percentage: 80,
    icon: faBolt,
  },
  {
    name: "Chemistry",
    completed: 6,
    total: 8,
    percentage: 75,
    icon: faFlask,
  },
  {
    name: "Biology",
    completed: 4,
    total: 6,
    percentage: 67,
    icon: faSeedling,
  },
];

const experimentPerformance = [
  {
    name: "Ohm's Law",
    subject: "Physics",
    score: 92,
    status: "Completed",
  },
  {
    name: "Chemical Reactions",
    subject: "Chemistry",
    score: 86,
    status: "Completed",
  },
  {
    name: "Plant Biology",
    subject: "Biology",
    score: 78,
    status: "Completed",
  },
  {
    name: "Newton's Laws",
    subject: "Physics",
    score: 84,
    status: "In Progress",
  },
];

const recentActivity = [
  {
    title: "Completed Ohm's Law",
    description: "Physics experiment",
    time: "Today",
    icon: faBolt,
  },
  {
    title: "Completed Chemical Reactions",
    description: "Chemistry experiment",
    time: "Yesterday",
    icon: faFlask,
  },
  {
    title: "Started Newton's Laws",
    description: "Physics experiment",
    time: "2 days ago",
    icon: faBookOpen,
  },
];

const achievements = [
  {
    title: "Lab Explorer",
    description: "Complete your first 5 experiments.",
    icon: faTrophy,
    status: "Unlocked",
  },
  {
    title: "STEM Streak",
    description: "Keep learning for 7 consecutive days.",
    icon: faArrowTrendUp,
    status: "Unlocked",
  },
  {
    title: "Top Performer",
    description: "Maintain an average score above 85%.",
    icon: faChartColumn,
    status: "Unlocked",
  },
];

function Progress() {
  return (
    <div className="min-h-screen bg-[#020b1c] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="border-b border-blue-950/60 bg-[#06142d]/80 px-5 py-6 backdrop-blur-xl lg:px-8">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
                  Learning Analytics
                </p>

                <h1 className="mt-2 text-4xl font-black tracking-tight">
                  Your Progress
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-400">
                  Track your STEM learning journey, experiment performance,
                  achievements and learning activity.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-[#071a38] px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Overall Progress
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-black text-cyan-400">
                    75%
                  </span>
                  <span className="pb-1 text-sm text-slate-500">
                    completed
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-8 p-5 lg:p-8">
            {/* Overall Performance */}
            <section className="relative overflow-hidden rounded-2xl border border-blue-900/60 bg-gradient-to-br from-[#071936] to-[#06142c] p-6 shadow-xl shadow-blue-950/30">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                      <FontAwesomeIcon icon={faChartColumn} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">
                        Overall Performance
                      </p>

                      <h2 className="text-2xl font-bold">
                        Great progress so far!
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400">
                    You have completed 18 of 24 experiments. Keep exploring
                    your remaining experiments to continue building your STEM
                    skills.
                  </p>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        Experiment completion
                      </span>

                      <span className="font-semibold text-cyan-400">
                        18 / 24
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-blue-950/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[#06142d]">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "conic-gradient(#22d3ee 0deg 270deg, #10294c 270deg 360deg)",
                      }}
                    />

                    <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#06142d]">
                      <span className="text-4xl font-black text-white">
                        75%
                      </span>

                      <span className="text-xs text-slate-500">
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5 transition hover:border-cyan-500/40">
                <p className="text-sm text-slate-400">Experiments</p>
                <p className="mt-2 text-3xl font-black">24</p>
                <p className="mt-1 text-xs text-slate-500">
                  Total available
                </p>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5 transition hover:border-cyan-500/40">
                <p className="text-sm text-slate-400">Completed</p>
                <p className="mt-2 text-3xl font-black text-cyan-400">18</p>
                <p className="mt-1 text-xs text-slate-500">
                  75% completion
                </p>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5 transition hover:border-cyan-500/40">
                <p className="text-sm text-slate-400">Average Score</p>
                <p className="mt-2 text-3xl font-black">87%</p>
                <p className="mt-1 text-xs text-emerald-400">
                  Strong performance
                </p>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5 transition hover:border-cyan-500/40">
                <p className="text-sm text-slate-400">Learning Streak</p>
                <p className="mt-2 text-3xl font-black">7</p>
                <p className="mt-1 text-xs text-orange-400">
                  Days in a row
                </p>
              </div>
            </section>

            {/* Subject Progress */}
            <section>
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                  Subject Performance
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Progress by Subject
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {subjects.map((subject) => (
                  <div
                    key={subject.name}
                    className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5 transition hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-blue-950/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                          <FontAwesomeIcon icon={subject.icon} />
                        </div>

                        <div>
                          <h3 className="font-bold">{subject.name}</h3>
                          <p className="text-xs text-slate-500">
                            {subject.completed} of {subject.total} completed
                          </p>
                        </div>
                      </div>

                      <span className="text-lg font-black text-cyan-400">
                        {subject.percentage}%
                      </span>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-950/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ width: `${subject.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experiment Performance */}
            <section>
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                  Experiment Analytics
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Experiment Performance
                </h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-blue-900/60 bg-[#071a38]">
                <div className="hidden grid-cols-[1.5fr_1fr_0.7fr_0.8fr] gap-4 border-b border-blue-900/60 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
                  <span>Experiment</span>
                  <span>Subject</span>
                  <span>Score</span>
                  <span>Status</span>
                </div>

                {experimentPerformance.map((experiment) => (
                  <div
                    key={experiment.name}
                    className="grid gap-3 border-b border-blue-900/40 px-5 py-4 last:border-b-0 md:grid-cols-[1.5fr_1fr_0.7fr_0.8fr] md:items-center md:gap-4 md:px-6"
                  >
                    <div>
                      <p className="font-semibold">{experiment.name}</p>
                      <p className="text-xs text-slate-500 md:hidden">
                        {experiment.subject}
                      </p>
                    </div>

                    <span className="hidden text-sm text-slate-400 md:block">
                      {experiment.subject}
                    </span>

                    <span className="font-bold text-cyan-400">
                      {experiment.score}%
                    </span>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                        experiment.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {experiment.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity + Next Goal */}
            <section className="grid gap-6 lg:grid-cols-2">
              {/* Recent Activity */}
              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                      Activity
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Recent Learning
                    </h2>
                  </div>

                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-cyan-400"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.title}
                      className="flex items-center gap-4 rounded-xl border border-blue-900/50 bg-[#06142d] p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                        <FontAwesomeIcon icon={activity.icon} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {activity.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {activity.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-slate-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Goal */}
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#082448] to-[#06142d] p-6">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <FontAwesomeIcon icon={faArrowTrendUp} />
                  </div>

                  <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-cyan-400">
                    Next Goal
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Complete 6 more experiments
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    You're only six experiments away from completing your
                    current learning journey.
                  </p>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-slate-400">18 completed</span>
                      <span className="text-cyan-400">24 total</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-blue-950/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Achievements */}
            <section>
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                  Milestones
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Achievements
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5 transition hover:border-cyan-500/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                        <FontAwesomeIcon icon={achievement.icon} />
                      </div>

                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                        {achievement.status}
                      </span>
                    </div>

                    <h3 className="mt-5 font-bold">
                      {achievement.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Explore CTA */}
            <section className="overflow-hidden rounded-2xl border border-blue-900/60 bg-gradient-to-r from-blue-950/80 to-cyan-950/50 p-6 lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                    Keep Learning
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Ready for your next experiment?
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm text-slate-400">
                    Explore interactive STEM experiments and continue building
                    your practical learning skills.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-[#02101f] transition hover:bg-cyan-400"
                  onClick={() => {
                    window.location.href = "/experiments";
                  }}
                >
                  Explore Experiments
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              </div>
            </section>

            {/* Completion Message */}
            <div className="flex items-center justify-center gap-3 rounded-xl border border-blue-900/40 bg-[#06142d] px-5 py-4 text-center text-sm text-slate-400">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-cyan-400"
              />
              Keep going — consistent learning is the key to mastering STEM.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Progress;