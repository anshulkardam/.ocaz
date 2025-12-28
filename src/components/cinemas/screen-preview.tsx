"use client";

export default function ScreenPreview({
  rows = 8,
  columns = 10,
}: {
  rows?: number;
  columns?: number;
}) {
  const seats = Array.from({ length: rows * columns }).map((_, i) => {
    const r = Math.floor(i / columns) + 1;
    const c = (i % columns) + 1;
    return { id: `${r}-${c}`, row: r, column: c };
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg p-4 sm:p-6">
      {/* Curved Screen */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="relative w-full max-w-md">
          <div
            className="w-full h-3 sm:h-4 bg-linear-to-b from-gray-800 via-gray-700 to-gray-600 rounded-t-full shadow-lg"
            style={{
              borderRadius: "100% / 30%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 -2px 10px rgba(255,255,255,0.1)",
            }}
          />
          <div className="text-center mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
            SCREEN
          </div>
        </div>
      </div>

      {/* Seats Grid */}
      <div
        className="grid gap-1.5 sm:gap-2 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          maxWidth: `${columns * 40}px`,
        }}
      >
        {seats.map((s) => (
          <div
            key={s.id}
            title={`Row ${s.row} - Seat ${s.column}`}
            className="aspect-square rounded-md bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-400 dark:border-emerald-600 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors cursor-pointer flex items-center justify-center group relative"
          >
            <span className="text-[8px] sm:text-[10px] text-emerald-700 dark:text-emerald-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {s.row}
              {String.fromCharCode(64 + s.column)}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-400 dark:border-emerald-600" />
          <span className="text-gray-600 dark:text-gray-300">Available</span>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          {rows} × {columns} = {rows * columns} seats
        </div>
      </div>
    </div>
  );
}
