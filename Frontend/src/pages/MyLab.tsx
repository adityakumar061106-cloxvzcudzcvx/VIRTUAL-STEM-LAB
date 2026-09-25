import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faBookOpen,
  faChartLine,
  faCheckCircle,
  faClock,
  faFlask,
  faMagnifyingGlass,
  faSeedling,
  faVial,
} from "@fortawesome/free-solid-svg-icons";

type LabItem = {
  id: number;
  title: string;
  subject: string;
  type: "Experiment" | "Course";
  progress: number;
  duration: string;
  status: "In Progress" | "Completed" | "Saved";
  icon: typeof faBolt;
  gradient: string;
  route?: string;
};

const labItems: LabItem[] = [
  {
    id: 1,
    title: "Ohm's Law",
    subject: "Physics",
    type: "Experiment",
    progress: 80,
    duration: "15 min",
    status: "In Progress",
    icon: faBolt,
    gradient: "from-blue-600 to-cyan-500",
    route: "/experiments/ohms-law",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    subject: "Physics",
    type: "Course",
    progress: 68,
    duration: "45 min",
    status: "In Progress",
    icon: faBookOpen,
    gradient: "from-indigo-600 to-violet-500",
    route: "/courses",
  },
  {
    id: 3,
    title: "Chemical Reactions",
    subject: "Chemistry",
    type: "Experiment",
    progress: 65,
    duration: "20 min",
    status: "In Progress",
    icon: faVial,
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: 4,
    title: "Plant Biology",
    subject: "Biology",
    type: "Experiment",
    progress: 100,
    duration: "15 min",
    status: "Completed",
    icon: faSeedling,
    gradient: "from-emerald-600 to-green-400",
  },
  {
    id: 5,
    title: "Acids and Bases",
    subject: "Chemistry",
    type: "Experiment",
    progress: 35,
    duration: "20 min",
    status: "Saved",
    icon: faFlask,
    gradient: "from-orange-600 to-yellow-400",
  },
  {
    id: 6,
    title: "Human Body Systems",
    subject: "Biology",
    type: "Experiment",
    progress: 55,
    duration: "22 min",
    status: "Saved",
    icon: faFlask,
    gradient: "from-rose-600 to-red-400",
  },
];

const filters = [
  "All",
  "Experiments",
  "Courses",
  "In Progress",
  "Completed",
  "Saved",
];

const subjectProgress = [
  {
    subject: "Physics",
    progress: 72,
    color: "from-blue-500 to-cyan-400",
  },
  {
    subject: "Chemistry",
    progress: 58,
    color: "from-purple-500 to-pink-400",
  },
  {
    subject: "Biology",
    progress: 81,
    color: "from-emerald-500 to-green-400",
  },
];

const recentActivities = [
  {
    title: "Ohm's Law",
    type: "Experiment",
    time: "Recently",
    icon: faBolt,
  },
  {
    title: "Physics Fundamentals",
    type: "Course",
    time: "Yesterday",
    icon: faBookOpen,
  },
  {
    title: "Chemical Reactions",
    type: "Experiment",
    time: "2 days ago",
    icon: faVial,
  },
  {
    title: "Plant Biology",
    type: "Experiment",
    time: "3 days ago",
    icon: faSeedling,
  },
];

function MyLab() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = useMemo(() => {
    return labItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase());

      let matchesFilter = true;

      if (activeFilter === "Experiments") {
        matchesFilter = item.type === "Experiment";
      } else if (activeFilter === "Courses") {
        matchesFilter = item.type === "Course";
      } else if (
        activeFilter === "In Progress" ||
        activeFilter === "Completed" ||
        activeFilter === "Saved"
      ) {
        matchesFilter = item.status === activeFilter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const totalItems = labItems.length;

  const experimentCount = labItems.filter(
    (item) => item.type === "Experiment"
  ).length;

  const courseCount = labItems.filter(
    (item) => item.type === "Course"
  ).length;

  const completedCount = labItems.filter(
    (item) => item.status === "Completed"
  ).length;

  const overallProgress = Math.round(
    labItems.reduce((sum, item) => sum + item.progress, 0) / totalItems
  );

  const continueItem = labItems[0];

  const handleOpen = (item: LabItem) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <div className="min-h-screen bg-[#020b1c] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* HEADER */}
          <header className="border-b border-blue-950/60 bg-[#06142d]/80 px-6 py-5 backdrop-blur-xl lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Personal Workspace
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                  My Lab
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Manage your experiments, courses and learning activities.
                </p>
              </div>

              <div className="hidden items-center gap-3 rounded-xl border border-blue-900/60 bg-blue-950/40 px-4 py-3 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Overall Progress
                  </p>

                  <p className="text-lg font-bold text-cyan-400">
                    {overallProgress}%
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            {/* STATS */}
            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Total Items
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {totalItems}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <FontAwesomeIcon icon={faFlask} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Experiments
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {experimentCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <FontAwesomeIcon icon={faBolt} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Courses
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {courseCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Completed
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {completedCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                </div>
              </div>
            </section>

            {/* CONTINUE LEARNING */}
            <section className="mb-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Pick Up Where You Left Off
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Continue Learning
                </h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-blue-900/60 bg-[#071a38]">
                <div className="flex flex-col md:flex-row">
                  <div
                    className={`relative flex min-h-[190px] flex-1 items-center bg-gradient-to-br ${continueItem.gradient} p-7`}
                  >
                    <div className="absolute inset-0 bg-black/10" />

                    <div className="relative">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        {continueItem.type}
                      </p>

                      <FontAwesomeIcon
                        icon={continueItem.icon}
                        className="mt-4 text-4xl"
                      />

                      <h3 className="mt-3 text-2xl font-bold">
                        {continueItem.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/75">
                        {continueItem.subject} • {continueItem.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center p-7">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Current Progress
                        </p>

                        <p className="mt-1 text-2xl font-bold text-cyan-400">
                          {continueItem.progress}%
                        </p>
                      </div>

                      <FontAwesomeIcon
                        icon={faChartLine}
                        className="text-2xl text-cyan-500/60"
                      />
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-950/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{
                          width: `${continueItem.progress}%`,
                        }}
                      />
                    </div>

                    <button
                      onClick={() => handleOpen(continueItem)}
                      className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-[#02101f] transition hover:bg-cyan-400"
                    >
                      Continue Experiment
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SEARCH + FILTER */}
            <section className="mb-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-md">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search your lab..."
                    className="w-full rounded-xl border border-blue-900/60 bg-[#071a38] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/70"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                        activeFilter === filter
                          ? "bg-cyan-500 text-[#02101f]"
                          : "border border-blue-900/60 bg-[#071a38] text-slate-400 hover:border-cyan-500/50 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* MY LEARNING ITEMS */}
            <section className="mb-8">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    My Learning Items
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your saved courses and experiments.
                  </p>
                </div>

                <span className="text-sm text-slate-500">
                  {filteredItems.length} items
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] px-6 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    No items found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try another search term or select a different filter.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <article
                      key={item.id}
                      className="group overflow-hidden rounded-2xl border border-blue-900/60 bg-[#071a38] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/30"
                    >
                      <div
                        className={`relative h-36 bg-gradient-to-br ${item.gradient} p-6`}
                      >
                        <div className="absolute inset-0 bg-black/10" />

                        <div className="relative flex h-full items-center justify-between">
                          <div>
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="text-4xl"
                            />

                            <h3 className="mt-2 text-xl font-bold">
                              {item.title}
                            </h3>
                          </div>

                          <div className="rounded-xl bg-white/15 px-3 py-2 backdrop-blur-md">
                            <p className="text-xs text-white/70">
                              {item.type}
                            </p>

                            <p className="text-sm font-bold">
                              {item.subject}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                              item.status === "Completed"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : item.status === "Saved"
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "bg-cyan-500/10 text-cyan-400"
                            }`}
                          >
                            {item.status}
                          </span>

                          <span className="flex items-center gap-2 text-xs text-slate-500">
                            <FontAwesomeIcon icon={faClock} />
                            {item.duration}
                          </span>
                        </div>

                        <div className="mt-5">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">
                              Progress
                            </span>

                            <span className="text-xs font-semibold text-cyan-400">
                              {item.progress}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-blue-950/80">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                              style={{
                                width: `${item.progress}%`,
                              }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpen(item)}
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-[#02101f]"
                        >
                          <FontAwesomeIcon icon={faBookOpen} />

                          <span>
                            {item.progress === 100
                              ? "Review Activity"
                              : "Continue Learning"}
                          </span>

                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* PROGRESS BY SUBJECT + RECENT ACTIVITY */}
            <section className="grid gap-6 lg:grid-cols-2">
              {/* Subject Progress */}
              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-6">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Performance
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Progress by Subject
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track your learning across STEM subjects.
                  </p>
                </div>

                <div className="space-y-6">
                  {subjectProgress.map((subject) => (
                    <div key={subject.subject}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-300">
                          {subject.subject}
                        </span>

                        <span className="text-sm font-semibold text-cyan-400">
                          {subject.progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-blue-950/80">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
                          style={{
                            width: `${subject.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl border border-blue-900/60 bg-[#071a38] p-6">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Activity
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your latest learning activities.
                  </p>
                </div>

                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.title}
                      className="flex items-center justify-between rounded-xl border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-cyan-500/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                          <FontAwesomeIcon icon={activity.icon} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {activity.type}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs text-slate-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* BOTTOM BANNER */}
            <section className="mt-8 overflow-hidden rounded-2xl border border-blue-800/60 bg-gradient-to-r from-blue-950/80 to-cyan-950/50 p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Your Virtual Lab
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Learn. Experiment. Discover.
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Continue your courses and perform interactive STEM
                    experiments.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/experiments")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-[#02101f] transition hover:bg-cyan-400"
                >
                  <FontAwesomeIcon icon={faFlask} />

                  <span>Explore Experiments</span>

                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyLab;