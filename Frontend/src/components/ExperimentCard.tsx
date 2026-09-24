import { useNavigate } from "react-router-dom";

interface ExperimentCardProps {
  title: string;
  subject: string;
  description: string;
  progress: number;
  icon: string;
}

function ExperimentCard({
  title,
  subject,
  description,
  progress,
  icon,
}: ExperimentCardProps) {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (title === "Ohm's Law") {
      navigate("/experiments/ohms-law");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500 transition">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="text-3xl">
            {icon}
          </div>

          <div>
            <p className="text-xs text-blue-400 uppercase">
              {subject}
            </p>

            <h3 className="text-lg font-semibold text-white mt-1">
              {title}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              {description}
            </p>
          </div>
        </div>

        <button
          onClick={handleOpen}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Open →
        </button>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExperimentCard;