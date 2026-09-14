import React from 'react';

interface PageHeaderProps {
  lastUpdated: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ lastUpdated }) => {
  return (
    <header
      id="overview-page-header"
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2.5 border-b border-[#E6EAF2]"
    >
      <div className="flex items-center gap-2">
        <div className="w-[3px] h-[16px] bg-[#3978F6] rounded-full flex-shrink-0" />
        <h1 className="text-[17px] font-bold text-[#25324B] tracking-tight leading-none">
          运营概览
        </h1>
      </div>

      <div className="flex items-center text-[12px] text-[#5F6B7A]">
        <span className="text-[#9AA5B5]">数据更新至：</span>
        <span className="font-mono text-[#25324B] font-medium ml-0.5">{lastUpdated}</span>
      </div>
    </header>
  );
};
