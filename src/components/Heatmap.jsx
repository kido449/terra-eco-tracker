import { useMemo } from 'react';

/**
 * GitHub-style contribution heatmap calendar.
 * Shows the past ~365 days as a grid of colored cells.
 */
export default function Heatmap({ data = {}, className = '' }) {
  const weeks = useMemo(() => {
    const result = [];
    const today = new Date();
    // Start from ~364 days ago, on a Sunday
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    // Adjust to the previous Sunday
    start.setDate(start.getDate() - start.getDay());

    let current = new Date(start);
    let weekArr = [];

    while (current <= today) {
      const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
      const count = data[dateStr] || 0;
      const level = count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;

      weekArr.push({ date: dateStr, count, level });

      if (weekArr.length === 7) {
        result.push(weekArr);
        weekArr = [];
      }

      current.setDate(current.getDate() + 1);
    }

    // Push any remaining days
    if (weekArr.length > 0) {
      result.push(weekArr);
    }

    return result;
  }, [data]);

  const months = useMemo(() => {
    const labels = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    weeks.forEach((week, i) => {
      const firstDay = week[0];
      if (firstDay) {
        const d = new Date(firstDay.date);
        if (d.getDate() <= 7) {
          labels.push({ index: i, label: monthNames[d.getMonth()] });
        }
      }
    });

    return labels;
  }, [weeks]);

  return (
    <div className={className}>
      {/* Month labels */}
      <div className="flex mb-1 ml-8" style={{ gap: 0 }}>
        {months.map((m, i) => (
          <span
            key={i}
            className="text-[10px] text-white/30"
            style={{ position: 'relative', left: `${m.index * 14}px` }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex gap-0.5">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1.5 text-[10px] text-white/30 justify-between py-1">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Grid */}
        <div className="flex gap-0.5 overflow-x-auto pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  className={`w-3 h-3 rounded-sm heatmap-${day.level} transition-colors duration-200`}
                  title={`${day.date}: ${day.count} action${day.count !== 1 ? 's' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 text-[10px] text-white/30">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={`w-3 h-3 rounded-sm heatmap-${level}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
