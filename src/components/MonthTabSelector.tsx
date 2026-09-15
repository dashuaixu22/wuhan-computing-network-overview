import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { TimeDimension, MonthOption } from '../types';

interface MonthTabSelectorProps {
  timeDimension: TimeDimension;
  selectedHistoryMonth: string;
  historyMonthOptions: MonthOption[];
  onChange: (dimension: TimeDimension, historyMonthKey?: string) => void;
}

export const MonthTabSelector: React.FC<MonthTabSelectorProps> = ({
  timeDimension,
  selectedHistoryMonth,
  historyMonthOptions,
  onChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const activeHistoryOpt = historyMonthOptions.find((opt) => opt.key === selectedHistoryMonth);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center p-0.5 rounded-[6px] bg-[#E9EEF7] border border-[#D7E1EE] text-[12px] select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
    >
      {/* 累计 Tab */}
      <button
        type="button"
        id="tab-cumulative"
        onClick={() => {
          setDropdownOpen(false);
          onChange('cumulative');
        }}
        className={`px-3 py-1 rounded-[4.5px] transition-all cursor-pointer font-medium ${
          timeDimension === 'cumulative'
            ? 'bg-white text-[#3978F6] font-bold shadow-[0_1px_3px_rgba(37,50,75,0.1)]'
            : 'text-[#5F6B7A] hover:text-[#25324B] hover:bg-white/50'
        }`}
        title="查看全周期累计总量数据"
      >
        累计
      </button>

      {/* 本月 Tab */}
      <button
        type="button"
        id="tab-current-month"
        onClick={() => {
          setDropdownOpen(false);
          onChange('current-month');
        }}
        className={`px-3 py-1 rounded-[4.5px] transition-all cursor-pointer font-medium ${
          timeDimension === 'current-month'
            ? 'bg-white text-[#3978F6] font-bold shadow-[0_1px_3px_rgba(37,50,75,0.1)]'
            : 'text-[#5F6B7A] hover:text-[#25324B] hover:bg-white/50'
        }`}
        title="查看2026年9月当月数据（产商品总数为当月总数，新增为相对上月新增）"
      >
        本月
      </button>

      {/* 历史月份 下拉 Tab */}
      <div className="relative">
        <button
          type="button"
          id="tab-history-month"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[4.5px] transition-all cursor-pointer font-medium ${
            timeDimension === 'history-month'
              ? 'bg-white text-[#3978F6] font-bold shadow-[0_1px_3px_rgba(37,50,75,0.1)]'
              : 'text-[#5F6B7A] hover:text-[#25324B] hover:bg-white/50'
          }`}
          title="选择历史月份查看归档数据"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <Calendar className="w-3 h-3 text-[#3978F6]/80" />
          <span>
            {timeDimension === 'history-month' && activeHistoryOpt
              ? activeHistoryOpt.shortLabel
              : '历史月份'}
          </span>
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180 text-[#3978F6]' : 'text-[#7E8B9B]'
            }`}
          />
        </button>

        {/* 历史月份下拉浮层 */}
        {dropdownOpen && (
          <div
            id="history-month-dropdown"
            className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-[7px] border border-[#DCE4F0] shadow-lg py-1 z-50 text-[12px] animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8B98A9] border-b border-[#F0F3F8] flex items-center justify-between">
              <span>选择历史月份</span>
              <span className="text-[10px] font-normal text-[#A3B0C2]">按月归档</span>
            </div>

            <div className="max-h-56 overflow-y-auto py-1 space-y-0.5">
              {historyMonthOptions.map((opt) => {
                const isSelected =
                  timeDimension === 'history-month' && selectedHistoryMonth === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      onChange('history-month', opt.key);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F5F8FE] transition-colors cursor-pointer ${
                      isSelected
                        ? 'text-[#3978F6] font-bold bg-[#F0F5FF]'
                        : 'text-[#25324B]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#3978F6] stroke-[2.2]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
