import React from 'react';

const StatsCard = ({
  title = "Total Predictions",
  value = 0,
  icon = null, // optional SVG or icon component
  colorClass = "from-cyan-400 to-teal-400"
}) => {
  return (
    <div className={`bg-[#111] border border-cyan-500/30 rounded-2xl p-5 shadow-lg shadow-cyan-500/20 flex items-center gap-4 transition-all duration-300 hover:shadow-cyan-500/40`}>
      {icon && (
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r ${colorClass} text-white`}>
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-white font-bold text-xl">{value.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default StatsCard;
