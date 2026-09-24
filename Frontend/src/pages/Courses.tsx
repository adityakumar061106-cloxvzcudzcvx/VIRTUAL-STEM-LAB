import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faFlask,
  faDna,
  faCalculator,
  faLaptopCode,
  faMagnifyingGlass,
  faArrowRight,
  faChartLine,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const courses = [
  {
    title: "Physics",
    description: "Explore mechanics, electricity, waves and motion.",
    lessons: 24,
    progress: 72,
    icon: faAtom,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "Chemistry",
    description: "Learn reactions, acids, bases and atomic structure.",
    lessons: 20,
    progress: 58,
    icon: faFlask,
    gradient: "from-purple-600 to-pink-500",
  },
  {
    title: "Biology",
    description: "Discover cells, plants, organisms and human biology.",
    lessons: 18,
    progress: 81,
    icon: faDna,
    gradient: "from-emerald-600 to-green-400",
  },
  {
    title: "Mathematics",
    description:
      "Build strong foundations in algebra, calculus and statistics.",
    lessons: 26,
    progress: 64,
    icon: faCalculator,
    gradient: "from-orange-600 to-yellow-400",
  },
  {
    title: "Computer Science",
    description:
      "Learn programming, algorithms and computational thinking.",
    lessons: 22,
    progress: 45,
    icon: faLaptopCode,
    gradient: "from-indigo-600 to-violet-500",
  },
];

const filters = [
  "All",
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Computer Science",
];

function Courses() {
  return (
    <div className="min-h-screen bg-[#020b1c] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="border-b border-blue-950/60 bg-[#06142d]/80 px-6 py-5 backdrop-blur-xl lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Learning Center
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                  Courses
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Build your STEM knowledge through interactive courses.
                </p>
              </div>

              <div className="hidden items-center gap-3 rounded-xl border border-blue-900/60 bg-blue-950/40 px-4 py-3 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Your Progress
                  </p>

                  <p className="text-lg font-bold text-cyan-400">
                    68%
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            {/* Search + Filters */}
            <section className="mb-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search */}
                <div className="relative w-full md:max-w-md">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                  />

                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full rounded-xl border border-blue-900/60 bg-[#071a38] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/70"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {filters.map((filter, index) => (
                    <button
                      key={filter}
                      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                        index === 0
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

            {/* Course Heading */}
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Explore Courses
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose a subject and continue learning.
                  </p>
                </div>

                <span className="text-sm text-slate-500">
                  {courses.length} courses
                </span>
              </div>

              {/* Course Cards */}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <article
                    key={course.title}
                    className="group overflow-hidden rounded-2xl border border-blue-900/60 bg-[#071a38] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/30"
                  >
                    {/* Banner */}
                    <div
                      className={`relative h-36 bg-gradient-to-br ${course.gradient} p-6`}
                    >
                      <div className="absolute inset-0 bg-black/10" />

                      <div className="relative flex h-full items-center justify-between">
                        <div>
                          <FontAwesomeIcon
                            icon={course.icon}
                            className="text-4xl"
                          />

                          <h3 className="mt-2 text-xl font-bold">
                            {course.title}
                          </h3>
                        </div>

                        <div className="rounded-xl bg-white/15 px-3 py-2 backdrop-blur-md">
                          <p className="text-xs text-white/70">
                            Lessons
                          </p>

                          <p className="text-lg font-bold">
                            {course.lessons}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <p className="min-h-[48px] text-sm leading-6 text-slate-400">
                        {course.description}
                      </p>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500">
                            Course Progress
                          </span>

                          <span className="text-xs font-semibold text-cyan-400">
                            {course.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-blue-950/80">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{
                              width: `${course.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Continue Button */}
                      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-[#02101f]">
                        <FontAwesomeIcon icon={faBookOpen} />

                        <span>Continue Learning</span>

                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Bottom Banner */}
            <section className="mt-8 overflow-hidden rounded-2xl border border-blue-800/60 bg-gradient-to-r from-blue-950/80 to-cyan-950/50 p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Keep Learning
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Turn curiosity into knowledge.
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Complete lessons, perform experiments and track
                    your progress.
                  </p>
                </div>

                <button className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-[#02101f] transition hover:bg-cyan-400">
                  <FontAwesomeIcon icon={faChartLine} />
                  <span>View My Progress</span>
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

export default Courses;