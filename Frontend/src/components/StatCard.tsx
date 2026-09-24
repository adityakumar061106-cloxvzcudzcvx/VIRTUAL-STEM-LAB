interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  description: string;
}

function StatCard({
  title,
  value,
  icon,
  description,
}: StatCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        {description}
      </p>
    </div>
  );
}

export default StatCard;