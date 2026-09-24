import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const labs = [
  {
    title: "Physics Lab",
    description: "Explore motion, force, energy and more.",
    image: "/images/labs/physics.png",
    gradient: "from-blue-950 to-indigo-950",
    border: "border-blue-700/70",
  },
  {
    title: "Chemistry Lab",
    description: "Mix, observe, and create reactions.",
    image: "/images/labs/chemistry.png",
    gradient: "from-cyan-950 to-teal-950",
    border: "border-cyan-600/60",
  },
  {
    title: "Biology Lab",
    description: "Explore life, cells and ecosystems.",
    image: "/images/labs/biology.png",
    gradient: "from-purple-950 to-fuchsia-950",
    border: "border-purple-600/60",
  },
  {
    title: "Mathematics Lab",
    description: "Visualize concepts and solve problems.",
    image: "/images/labs/mathematics.png",
    gradient: "from-amber-950 to-orange-950",
    border: "border-amber-600/60",
  },
  {
    title: "Computer Science Lab",
    description: "Code, build and simulate.",
    image: "/images/labs/computer-science.png",
    gradient: "from-blue-950 to-sky-950",
    border: "border-blue-600/60",
  },
];

const popularExperiments = [
  {
    title: "Ohm's Law",
    subject: "Physics",
    description:
      "Study the relationship between voltage, current and resistance.",
    time: "15 min",
    difficulty: "Medium",
    images: "/images/experiments/ohms-law.png",
    iconBg: "bg-blue-600",
  },
  {
    title: "Chemical Reactions",
    subject: "Chemistry",
    description:
      "Observe different types of chemical reactions.",
    time: "20 min",
    difficulty: "Medium",
    images: "/images/experiments/chemical-reactions.png",
    iconBg: "bg-cyan-600",
  },
  {
    title: "Plant Cell Structure",
    subject: "Biology",
    description:
      "Explore the structure of plant cells in detail.",
    time: "15 min",
    difficulty: "Easy",
    images: "/images/experiments/plant-biology.png",
    iconBg: "bg-fuchsia-600",
  },
  {
    title: "Pendulum Motion",
    subject: "Physics",
    description:
      "Study the effect of length on time period.",
    time: "18 min",
    difficulty: "Medium",
    images: "/images/experiments/pendulum-motion.png",
    iconBg: "bg-blue-600",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020b1c] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* ================= HEADER ================= */}
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-blue-950/60 bg-[#041126]/95 px-5 backdrop-blur-xl lg:px-8">
            
            {/* Mobile Logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                ⚗
              </div>

              <span className="font-bold">
                Virtual <span className="text-cyan-400">STEM</span> Lab
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-5 text-sm text-slate-400 lg:flex">
              <span className="cursor-pointer hover:text-white">
                Explore
              </span>

              <span className="text-blue-900">•</span>

              <span className="cursor-pointer hover:text-white">
                Experiment
              </span>

              <span className="text-blue-900">•</span>

              <span className="cursor-pointer hover:text-white">
                Learn
              </span>
            </div>

            <div className="ml-auto flex items-center gap-5">
              {/* Search */}
              <div className="hidden h-10 w-72 items-center gap-3 rounded-full border border-blue-900/50 bg-blue-950/50 px-4 md:flex">
                <span className="text-lg text-slate-400">⌕</span>

                <input
                  type="text"
                  placeholder="Search experiments, topics..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              {/* Notification */}
              <button className="relative text-2xl text-slate-300 transition hover:text-white">
                ♧
                <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-400" />
              </button>

              <div className="h-8 w-px bg-blue-950" />

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 font-bold">
                  AK
                </div>

                <div className="hidden md:block">
                  <p className="text-sm font-medium">
                    Aditya Kumar
                  </p>

                  <p className="text-xs text-slate-500">
                    BCA Semester 3
                  </p>
                </div>

                <span className="hidden text-slate-400 md:block">
                 ⌄
                </span>
              </div>
            </div>
          </header>

          {/* ================= CONTENT ================= */}
          <div className="p-5 lg:p-8">
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">

              {/* ================= LEFT ================= */}
              <div className="min-w-0">

                {/* Hero */}
                <section
                  className="relative min-h-[365px] overflow-hidden rounded-2xl border border-blue-700/60 bg-cover bg-center p-10"
                  style={{
                    backgroundImage: "url('/images/hero/stem-lab.png')",
                  }}
                >
                    <div className="absolute inset-0 bg-[#06142d]/65" /> 

                    <div className="relative z-10 max-w-[58%]"></div>
                  
                  {/* Glow */}
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

                  <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

                  <div className="relative z-10 max-w-xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                      Welcome to
                    </p>

                    <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                      Virtual{" "}
                      <span className="text-cyan-400">
                        STEM
                      </span>{" "}
                      Lab
                    </h1>

                    <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/80">
                      Perform real-world experiments, build your
                      skills, and explore the world of Science,
                      Technology, Engineering and Mathematics —
                      all from your browser!
                    </p>

                    <button
                      onClick={() => navigate("/experiments")}
                      className="mt-7 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/30"
                    >
                      Start Exploring
                      <span className="text-xl">→</span>
                    </button>
                  </div>

                  
                </section>

                {/* Select a Lab */}
                <section className="mt-8">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Select a Lab
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Choose a subject and start exploring.
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/experiments")}
                      className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
                    {labs.map((lab) => (
                      <button
                        key={lab.title}
                        onClick={() => navigate("/experiments")}
                        className={`group relative overflow-hidden rounded-xl border ${lab.border} bg-gradient-to-br ${lab.gradient} p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/50`}
                      >
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-xl" />

                        <div className="relative">
                          <div className="mb-5 h-24 w-full overflow-hidden rounded-xl bg-white/5 backdrop-blur">
                            <img
                              src={lab.image}
                              alt={lab.title}
                             className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                          </div>

                          <h3 className="font-bold">
                            {lab.title}
                          </h3>

                          <p className="mt-2 min-h-[48px] text-xs leading-5 text-slate-300">
                            {lab.description}
                          </p>

                          <div className="mt-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition group-hover:bg-white/20">
                            →
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Popular Experiments */}
                <section className="mt-9">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Popular Experiments
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Continue with experiments students love.
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/experiments")}
                      className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {popularExperiments.map((experiment) => (
                      <button
                        key={experiment.title}
                        onClick={() => {
                          if (
                            experiment.title ===
                            "Ohm's Law"
                          ) {
                            navigate(
                              "/experiments/ohms-law"
                            );
                          } else {
                            navigate("/experiments");
                          }
                        }}
                        className="group overflow-hidden rounded-xl border border-blue-900/50 bg-[#071936] text-left transition duration-300 hover:-translate-y-1 hover:border-blue-600/70 hover:shadow-xl hover:shadow-blue-950/40"
                      >
                        {/* Image Area */}
                        <div className="relative h-50 overflow-hidden bg-gradient-to-br from-blue-950 via-[#092557] to-cyan-950">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_60%)]" />

                          <img
                           src={experiment.images}
                           alt={experiment.title}
                           className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                          <span
                            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold text-white ${experiment.iconBg}`}
                          >
                            {experiment.subject}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-4">
                          <h3 className="font-bold group-hover:text-cyan-300">
                            {experiment.title}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-slate-400">
                            {experiment.description}
                          </p>

                          <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-2">
                              ◷ {experiment.time}
                            </span>

                            <span className="flex items-center gap-1">
                              <span className="text-amber-400">
                                ▮▮▮
                              </span>

                              {experiment.difficulty}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              {/* ================= RIGHT SIDEBAR ================= */}
              <aside className="space-y-5">

                {/* Quick Tools */}
                <section className="rounded-2xl border border-blue-900/60 bg-[#061631] p-5">
                  <h2 className="text-lg font-bold">
                    Quick Tools
                  </h2>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Simulation Tools",
                        description:
                          "Open interactive simulators",
                        icon: "▣",
                      },
                      {
                        title: "Lab Manuals",
                        description:
                          "View experiment guides",
                        icon: "▤",
                      },
                      {
                        title: "Calculator",
                        description:
                          "Scientific & graphing calculator",
                        icon: "▦",
                      },
                      {
                        title: "Notes & Resources",
                        description:
                          "Study material & references",
                        icon: "▱",
                      },
                    ].map((tool) => (
                      <button
                        key={tool.title}
                        className="group flex w-full items-center gap-4 rounded-xl border border-blue-900/50 bg-blue-950/40 p-3 text-left transition hover:border-blue-600/60 hover:bg-blue-900/40"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xl text-cyan-300">
                          {tool.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold">
                            {tool.title}
                          </p>

                          <p className="mt-1 truncate text-[11px] text-slate-500">
                            {tool.description}
                          </p>
                        </div>

                        <span className="text-xl text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300">
                          ›
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Recent Activity */}
                <section className="rounded-2xl border border-blue-900/60 bg-[#061631] p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">
                      Recent Activity
                    </h2>

                    <button className="text-xs font-medium text-cyan-400 hover:text-cyan-300">
                      View All
                    </button>
                  </div>

                  <div className="mt-5 space-y-5">
                    {[
                      {
                        title: "Completed Ohm's Law",
                        subtitle: "Physics Lab • 2h ago",
                        icon: "⚛",
                      },
                      {
                        title: "Viewed Chemical Reactions",
                        subtitle: "Chemistry Lab • 5h ago",
                        icon: "⚗",
                      },
                      {
                        title: "Started Plant Cell Structure",
                        subtitle: "Biology Lab • 1 day ago",
                        icon: "🧬",
                      },
                      {
                        title: "Joined Virtual Lab Session",
                        subtitle:
                          "Computer Science Lab • 2 days ago",
                        icon: "▣",
                      },
                    ].map((activity) => (
                      <div
                        key={activity.title}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-lg">
                          {activity.icon}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-500">
                            {activity.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Progress */}
                <section className="rounded-2xl border border-blue-900/60 bg-[#061631] p-5">
                  <h2 className="text-lg font-bold">
                    Your Progress
                  </h2>

                  <div className="mt-5 flex items-center gap-5">
                    {/* Circle */}
                    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#22d3ee_0_65%,#172b4f_65%_100%)]">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#061631]">
                        <span className="text-2xl font-bold">
                          65%
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-slate-400">
                        Labs Completed
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        13{" "}
                        <span className="text-sm font-normal text-slate-500">
                          / 20
                        </span>
                      </p>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-950">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{ width: "65%" }}
                        />
                      </div>
                    </div>
                  </div>
                </section>

              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;