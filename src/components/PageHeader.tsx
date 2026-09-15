import React from 'react';
import { MonthTabSelector } from './MonthTabSelector';
import { TimeDimension, MonthOption } from '../types';

interface PageHeaderProps {
  lastUpdated: string;
  timeDimension: TimeDimension;
  selectedHistoryMonth: string;
  historyMonthOptions: MonthOption[];
  onTimeDimensionChange: (dimension: TimeDimension, historyMonthKey?: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  lastUpdated,
  timeDimension,
  selectedHistoryMonth,
  historyMonthOptions,
  onTimeDimensionChange,
}) => {
  return (
    <header
      id="overview-page-header"
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2.5 border-b border-[#E6EAF2]"
    >
      <div className="flex items-center gap-2">
        <div className="w-[3px] h-[16px] bg-[#3978F6] rounded-full flex-shrink-0" />
        <h1 className="text-[17px] font-bold text-[#25324B] tracking-tight leading-none">
          运营概览
        </h1>
      </div>

      {/* 右上角：历史月份选择Tab与更新时间 */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <MonthTabSelector
          timeDimension={timeDimension}
          selectedHistoryMonth={selectedHistoryMonth}
          historyMonthOptions={historyMonthOptions}
          onChange={onTimeDimensionChange}
        />

        <div className="h-3.5 w-[1px] bg-[#DCE4F0] hidden sm:block" />

        <div className="flex items-center text-[12px] text-[#5F6B7A]">
          <span className="text-[#9AA5B5]">
            {timeDimension === 'history-month' ? '数据归档至：' : '数据更新至：'}
          </span>
          <span className="font-mono text-[#25324B] font-medium ml-0.5">{lastUpdated}</span>
        </div>
      </div>
    </header>
  );
};
