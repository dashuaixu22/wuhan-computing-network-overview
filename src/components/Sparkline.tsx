import React, { useState } from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  unit?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 90,
  height = 28,
  color = '#3978F6',
  unit = '',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const paddingY = 4;
  const paddingX = 2;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * plotWidth;
    const y = height - paddingY - ((val - min) / range) * plotHeight;
    return { x, y, val, idx };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  return (
    <div
      className="relative flex items-center"
      onMouseLeave={() => setHoverIndex(null)}
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible cursor-crosshair"
      >
        <defs>
          <linearGradient id={`spark-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path d={areaD} fill={`url(#spark-grad-${color.replace('#', '')})`} />

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((pt) => (
          <circle
            key={pt.idx}
            cx={pt.x}
            cy={pt.y}
            r={hoverIndex === pt.idx ? 3 : 2}
            className={`transition-all duration-150 ${
              hoverIndex === pt.idx
                ? 'fill-[#3978F6] stroke-white stroke-2'
                : 'fill-transparent hover:fill-[#3978F6]/60'
            }`}
            onMouseEnter={() => setHoverIndex(pt.idx)}
          />
        ))}
      </svg>

      {hoverIndex !== null && (
        <div className="absolute -top-7 right-0 pointer-events-none z-10 whitespace-nowrap rounded bg-[#25324B] px-1.5 py-0.5 text-[11px] text-white shadow-sm font-medium">
          {data[hoverIndex]} {unit}
        </div>
      )}
    </div>
  );
};
