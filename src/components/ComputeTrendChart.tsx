import React, { useState, useRef, useEffect } from 'react';
import { DayTrendPoint } from '../types';

interface ComputeTrendChartProps {
  data: DayTrendPoint[];
  unit: string;
}

export const ComputeTrendChart: React.FC<ComputeTrendChartProps> = ({ data, unit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverPoint, setHoverPoint] = useState<{
    point: DayTrendPoint;
    x: number;
    y: number;
  } | null>(null);

  const [dimensions, setDimensions] = useState({ width: 600, height: 115 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setDimensions({
            width: Math.max(300, entry.contentRect.width),
            height: 115,
          });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!data || data.length === 0) return null;

  const { width, height } = dimensions;
  const paddingLeft = 42;
  const paddingRight = 14;
  const paddingTop = 12;
  const paddingBottom = 20;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const minVal = Math.floor(Math.min(...data.map((d) => d.value)) / 200) * 200;
  const maxVal = Math.ceil(Math.max(...data.map((d) => d.value)) / 200) * 200;
  const valRange = maxVal - minVal || 1;

  const yTicks = [
    minVal,
    minVal + Math.round(valRange * 0.5),
    maxVal,
  ];

  const coords = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
    const y = paddingTop + plotHeight - ((d.value - minVal) / valRange) * plotHeight;
    return { x, y, data: d };
  });

  const linePath = coords.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, '');

  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${paddingTop + plotHeight} L ${coords[0].x.toFixed(1)} ${paddingTop + plotHeight} Z`;

  const xTickIndices = [0, 7, 14, 21, 29];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    let closest = coords[0];
    let minDist = Math.abs(coords[0].x - mouseX);

    for (let i = 1; i < coords.length; i++) {
      const dist = Math.abs(coords[i].x - mouseX);
      if (dist < minDist) {
        minDist = dist;
        closest = coords[i];
      }
    }

    setHoverPoint({
      point: closest.data,
      x: closest.x,
      y: closest.y,
    });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11.5px] font-medium text-[#5F6B7A]">近30日总算力规模变化趋势</span>
          <span className="text-[10.5px] text-[#9AA5B5]">单位: {unit}</span>
        </div>
        <div className="flex items-center gap-1 text-[10.5px] text-[#9AA5B5]">
          <span className="inline-block w-2.5 h-0.5 bg-[#3978F6] rounded-full"></span>
          <span>历史规模曲线</span>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full h-[115px] select-none">
        <svg
          width={width}
          height={height}
          className="overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverPoint(null)}
        >
          <defs>
            <linearGradient id="computeAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3978F6" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#3978F6" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {yTicks.map((val) => {
            const y = paddingTop + plotHeight - ((val - minVal) / valRange) * plotHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#E6EAF2"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 6}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#9AA5B5"
                  fontSize="10"
                  fontFamily="inherit"
                >
                  {val}
                </text>
              </g>
            );
          })}

          <line
            x1={paddingLeft}
            y1={paddingTop + plotHeight}
            x2={width - paddingRight}
            y2={paddingTop + plotHeight}
            stroke="#D6DFEB"
            strokeWidth="1"
          />

          <path d={areaPath} fill="url(#computeAreaGradient)" />
          <path
            d={linePath}
            fill="none"
            stroke="#3978F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {xTickIndices.map((idx) => {
            const pt = coords[idx];
            if (!pt) return null;
            return (
              <g key={idx}>
                <line
                  x1={pt.x}
                  y1={paddingTop + plotHeight}
                  x2={pt.x}
                  y2={paddingTop + plotHeight + 4}
                  stroke="#9AA5B5"
                  strokeWidth="1"
                />
                <text
                  x={pt.x}
                  y={paddingTop + plotHeight + 14}
                  textAnchor="middle"
                  fill="#9AA5B5"
                  fontSize="10"
                  fontFamily="inherit"
                >
                  {pt.data.date.slice(5)}
                </text>
              </g>
            );
          })}

          {hoverPoint && (
            <g>
              <line
                x1={hoverPoint.x}
                y1={paddingTop}
                x2={hoverPoint.x}
                y2={paddingTop + plotHeight}
                stroke="#3978F6"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={hoverPoint.x}
                cy={hoverPoint.y}
                r="4"
                fill="#3978F6"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {hoverPoint && (
          <div
            className="absolute pointer-events-none z-20 bg-white/95 backdrop-blur-xs border border-[#E6EAF2] rounded-[4px] px-2 py-1 shadow-md text-[11px]"
            style={{
              left: Math.min(Math.max(hoverPoint.x - 45, 10), width - 110),
              top: Math.max(hoverPoint.y - 45, 0),
            }}
          >
            <div className="text-[#9AA5B5] text-[10px] leading-tight">{hoverPoint.point.date}</div>
            <div className="font-bold text-[#25324B] font-mono leading-tight">
              {hoverPoint.point.value.toLocaleString()}{' '}
              <span className="font-normal text-[10px] text-[#5F6B7A]">{unit}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
