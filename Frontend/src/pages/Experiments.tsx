import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faClock,
  faFlask,
  faFlaskVial,
  faHeartPulse,
  faMagnifyingGlass,
  faScaleBalanced,
  faSeedling,
  faVial,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";

type Subject = "Physics" | "Chemistry" | "Biology";

type Experiment = {
  id: number;
  title: string;
  subject: Subject;
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
  duration: number;
  icon: typeof faFlask;
  description: string;
  gradient: string;
  learningPoints: string[];
  route?: string;
};

const experiments: Experiment[] = [
  {
    id: 1,
    title: "Ohm's Law",
    subject: "Physics",
    difficulty: "Medium",
    progress: 80,
    duration: 15,
    icon: faBolt,
    description:
      "Explore the relationship between voltage, current, and resistance using an interactive virtual circuit.",
    gradient: "from-cyan-500/30 via-blue-600/20 to-indigo-600/30",
    learningPoints: [
      "Understand Ohm's Law",
      "Measure voltage and current",
      "Explore resistance changes",
    ],
    route: "/experiments/ohms-law",
  },
  {
    id: 2,
    title: "Chemical Reactions",
    subject: "Chemistry",
    difficulty: "Medium",
    progress: 65,
    duration: 20,
    icon: faVial,
    description:
      "Observe how different substances react and learn about the signs of chemical reactions.",
    gradient: "from-purple-500/30 via-fuchsia-600/20 to-pink-600/30",
    learningPoints: [
      "Identify chemical reactions",
      "Observe reaction changes",
      "Understand reactants and products",
    ],
  },
  {
    id: 3,
    title: "Plant Biology",
    subject: "Biology",
    difficulty: "Easy",
    progress: 90,
    duration: 15,
    icon: faSeedling,
    description:
      "Investigate plant structures and discover how plants transport water and nutrients.",
    gradient: "from-emerald-500/30 via-green-600/20 to-teal-600/30",
    learningPoints: [
      "Identify plant structures",
      "Understand photosynthesis",
      "Explore water transport",
    ],
  },
  {
    id: 4,
    title: "Newton's Laws",
    subject: "Physics",
    difficulty: "Medium",
    progress: 45,
    duration: 18,
    icon: faScaleBalanced,
    description:
      "Experiment with forces, motion, and acceleration through interactive physics simulations.",
    gradient: "from-orange-500/30 via-amber-600/20 to-yellow-600/30",
    learningPoints: [
      "Understand force and motion",
      "Explore Newton's three laws",
      "Analyze acceleration",
    ],
  },
  {
    id: 5,
    title: "Acids and Bases",
    subject: "Chemistry",
    difficulty: "Hard",
    progress: 35,
    duration: 20,
    icon: faFlask,
    description:
      "Explore pH, acids, bases, and indicators through a safe virtual chemistry laboratory.",
    gradient: "from-rose-500/30 via-red-600/20 to-orange-600/30",
    learningPoints: [
      "Understand pH scale",
      "Differentiate acids and bases",
      "Use chemical indicators",
    ],
  },
  {
    id: 6,
    title: "Human Body Systems",
    subject: "Biology",
    difficulty: "Easy",
    progress: 55,
    duration: 22,
    icon: faHeartPulse,
    description:
      "Explore major human body systems and understand how organs work together.",
    gradient: "from-red-500/30 via-pink-600/20 to-purple-600/30",
    learningPoints: [
      "Explore major organs",
      "Understand body systems",
      "Learn how systems interact",
    ],
  },
];

const subjects = ["All", "Physics", "Chemistry", "Biology"] as const;

function Experiments() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] =
    useState<(typeof subjects)[number]>("All");
  const [selectedExperiment, setSelectedExperiment] =
    useState<Experiment | null>(null);

  const filteredExperiments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return experiments.filter((experiment) => {
      const matchesSubject =
        activeSubject === "All" || experiment.subject === activeSubject;

      const matchesSearch =
        query.length === 0 ||
        experiment.title.toLowerCase().includes(query) ||
        experiment.subject.toLowerCase().includes(query) ||
        experiment.description.toLowerCase().includes(query);

      return matchesSubject && matchesSearch;
    });
  }, [search, activeSubject]);

  const handleOpenExperiment = (experiment: Experiment) => {
    if (experiment.route) {
      navigate(experiment.route);
      return;
    }

    setSelectedExperiment(experiment);
  };

  const getDifficultyClasses = (difficulty: Experiment["difficulty"]) => {
    if (difficulty === "Easy") {
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
    }

    if (difficulty === "Medium") {
      return "border-amber-500/20 bg-amber-500/10 text-amber-400";
    }

    return "border-rose-500/20 bg-rose-500/10 text-rose-400";
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* Header */}
          <section className="border-b border-blue-950/50 bg-[#030b1c]">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    <FontAwesomeIcon icon={faFlask} />
                    <span>Virtual Laboratory</span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Experiments
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                    Explore interactive STEM experiments and improve your
                    practical knowledge.
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-blue-900/50 bg-blue-950/20 px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <FontAwesomeIcon icon={faFlask} className="text-lg" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold">
                      {experiments.length}
                    </p>
                    <p className="text-xs text-slate-500">
                      Available Experiments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            {/* Search + Filter */}
            <div className="mb-8 flex flex-col gap-5">
              <div className="relative max-w-xl">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search experiments..."
                  className="w-full rounded-2xl border border-blue-900/60 bg-[#07152d] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => {
                  const isActive = activeSubject === subject;

                  return (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => setActiveSubject(subject)}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/5"
                          : "border-blue-900/50 bg-[#07152d] text-slate-400 hover:border-blue-700/70 hover:text-white"
                      }`}
                    >
                      {subject}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result heading */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Explore Experiments
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Showing {filteredExperiments.length} of{" "}
                  {experiments.length} experiments
                </p>
              </div>
            </div>

            {/* Empty state */}
            {filteredExperiments.length === 0 ? (
              <div className="rounded-3xl border border-blue-900/50 bg-[#07152d] px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950/60 text-2xl text-slate-500">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  No experiments found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Try changing your search term or selecting a different
                  subject.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveSubject("All");
                  }}
                  className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Experiment Grid */
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredExperiments.map((experiment) => (
                  <article
                    key={experiment.id}
                    className="group overflow-hidden rounded-3xl border border-blue-900/50 bg-[#07152d] shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-950/20"
                  >
                    {/* Icon Header */}
                    <div
                      className={`relative h-44 overflow-hidden bg-gradient-to-br ${experiment.gradient}`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%)]" />

                      <div className="absolute left-5 top-5">
                        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-md">
                          {experiment.subject}
                        </span>
                      </div>

                      <div className="absolute right-5 top-5">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${getDifficultyClasses(
                            experiment.difficulty
                          )}`}
                        >
                          {experiment.difficulty}
                        </span>
                      </div>

                      {/* Main Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-4xl text-cyan-300 shadow-2xl shadow-cyan-950/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                          <FontAwesomeIcon icon={experiment.icon} />
                        </div>
                      </div>

                      {/* Decorative circles */}
                      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full border border-white/5" />
                      <div className="absolute -right-10 -bottom-16 h-40 w-40 rounded-full border border-white/5" />
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
                          {experiment.title}
                        </h3>

                        <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
                          <FontAwesomeIcon icon={faClock} />
                          <span>{experiment.duration} min</span>
                        </div>
                      </div>

                      <p className="min-h-[72px] text-sm leading-6 text-slate-400">
                        {experiment.description}
                      </p>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-500">
                            Progress
                          </span>

                          <span className="font-semibold text-cyan-400">
                            {experiment.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-blue-950/80">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                            style={{ width: `${experiment.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-5 flex items-center justify-between border-t border-blue-900/40 pt-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
                          Interactive Lab
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenExperiment(experiment)}
                          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/30"
                        >
                          {experiment.route ? "Open Lab" : "Preview"}

                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-xs transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Preview Modal */}
      {selectedExperiment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedExperiment(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-blue-800/60 bg-[#07152d] shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative overflow-hidden border-b border-blue-900/50 bg-gradient-to-br from-blue-950/80 to-cyan-950/30 p-6">
              <button
                type="button"
                onClick={() => setSelectedExperiment(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close preview"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-300">
                  <FontAwesomeIcon icon={selectedExperiment.icon} />
                </div>

                <div className="pr-10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {selectedExperiment.subject}
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-white">
                    {selectedExperiment.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-sm leading-6 text-slate-400">
                {selectedExperiment.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-xl border border-blue-900/50 bg-blue-950/40 px-3 py-2 text-xs text-slate-300">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="mr-2 text-cyan-400"
                  />
                  {selectedExperiment.duration} minutes
                </span>

                <span
                  className={`rounded-xl border px-3 py-2 text-xs ${getDifficultyClasses(
                    selectedExperiment.difficulty
                  )}`}
                >
                  {selectedExperiment.difficulty} Difficulty
                </span>

                <span className="rounded-xl border border-blue-900/50 bg-blue-950/40 px-3 py-2 text-xs text-slate-300">
                  {selectedExperiment.progress}% Complete
                </span>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white">
                  What you'll explore
                </h4>

                <div className="mt-3 space-y-2">
                  {selectedExperiment.learningPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-xl border border-blue-900/40 bg-blue-950/20 px-4 py-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30" />
                      <span className="text-sm text-slate-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExperiment(null)}
                className="mt-6 w-full rounded-xl border border-blue-800/50 bg-blue-950/30 py-3 text-sm font-semibold text-slate-300 transition hover:bg-blue-950/60 hover:text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Experiments;