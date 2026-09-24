import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFlask,
  faBookOpen,
  faFlaskVial,
  faChartColumn,
  faListCheck,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: faHouse,
  },
  {
    name: "Experiments",
    path: "/experiments",
    icon: faFlask,
  },
  {
    name: "Courses",
    path: "/courses",
    icon: faBookOpen,
  },
  {
    name: "My Lab",
    path: "/my-lab",
    icon: faFlaskVial,
  },
  {
    name: "Progress",
    path: "/progress",
    icon: faChartColumn,
  },
  {
    name: "Assignments",
    path: "/assignments",
    icon: faListCheck,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: faGear,
  },
];

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-blue-950/60 bg-[#06142d] text-white lg:flex">
      {/* Logo */}
      <div className="border-b border-blue-950/60 px-6 py-6">
        <div className="flex items-center gap-3">
          {/* Custom STEM Logo */}
           <div className="flex h-12 w-12 items-center justify-center">
             <img
               src="/images/logo/logo.png"
               alt="Virtual STEM Lab"
               className="h-12 w-12 object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]"
             />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Virtual <span className="text-cyan-400">STEM</span> Lab
            </h1>

            <p className="text-xs text-slate-500">
              Interactive Learning
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
          Navigation
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-blue-950/50 hover:text-white"
                }`
              }
            >
              <span className="flex w-6 justify-center text-lg">
                <FontAwesomeIcon icon={item.icon} />
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Quote Card */}
      <div className="m-4 rounded-2xl border border-blue-900/50 bg-gradient-to-br from-blue-950/60 to-cyan-950/30 p-5">
        <div className="mb-3 text-2xl text-cyan-400">
          <FontAwesomeIcon icon={faFlask} />
        </div>

        <p className="text-sm italic leading-6 text-slate-300">
          “Real experiments,
          <br />
          virtual freedom.”
        </p>

        <div className="mt-4 h-0.5 w-10 bg-cyan-400" />
      </div>
    </aside>
  );
}

export default Sidebar;