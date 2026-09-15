import React from 'react';
import {
  TrendingUp,
  Users,
  Radio,
  LayoutDashboard,
} from 'lucide-react';
import { CoreMetricsData } from '../types';

interface CoreMetricsSectionProps {
  metrics: CoreMetricsData;
  onCardClick: (metricName: string) => void;
}

export const CoreMetricsSection: React.FC<CoreMetricsSectionProps> = ({
  metrics,
  onCardClick,
}) => {
  const asOfTime = metrics.totalRevenue.asOf;

  return (
    <section id="core-overview-section" className="space-y-2.5">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5.5 h-5.5 rounded-[4px] bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
            <LayoutDashboard className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[15px] font-bold text-[#25324B] tracking-tight">
            核心概览
          </h2>
          <span className="text-[12px] text-[#9AA5B5] ml-1 hidden sm:inline-block">
            平台经营与实时运行概况
          </span>
        </div>
      </div>

      {/* 整体网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* ======================================================== */}
        {/* 1. 经营收入主卡（桌面端 5 列） */}
        {/* ======================================================== */}
        <div
          id="theme-card-revenue"
          onClick={() => onCardClick(metrics.totalRevenue.name)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCardClick(metrics.totalRevenue.name);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="经营收入概览，点击查看总收入详情"
          className="md:col-span-12 min-[1200px]:col-span-5 group relative bg-gradient-to-br from-[#F1F6FF] via-[#F8FAFF] to-[#FFFFFF] rounded-[8px] border border-[#E6EAF2] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all duration-200 cursor-pointer overflow-hidden p-3.5 flex flex-col justify-between"
        >
          {/* 顶部克制的蓝色强调线 */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3978F6] via-[#60A5FA] to-transparent opacity-90" />

          {/* 背景淡雅装饰图形 */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#3978F6]/[0.035] pointer-events-none blur-xl" />

          {/* 核心展示区：左侧经营收入(总收入) + 右侧内嵌卡片(本月收入) */}
          <div className="relative z-10">
            {/* 并排双轴：左为主总收入大盘（含标题），右为内嵌指标卡片（本月收入） */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
              {/* 左侧：经营收入与总收入数值（同一体系） */}
              <div className="sm:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5.5 h-5.5 rounded-full bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] font-bold text-[#25324B]">
                    总收入
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EAF1FF] text-[#2563EB] font-medium">
                    累计
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[34px] font-extrabold text-[#1E293B] tracking-tight group-hover:text-[#3978F6] transition-colors font-mono leading-none">
                    {metrics.totalRevenue.value}
                  </span>
                  <span className="text-[13px] font-semibold text-[#5F6B7A]">
                    {metrics.totalRevenue.unit}
                  </span>
                </div>
              </div>

              {/* 右侧：内嵌卡片指标（本月收入） */}
              <div className="sm:col-span-5">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(metrics.monthRevenue.name);
                  }}
                  className="py-2.5 px-3 rounded-[6px] bg-white border border-[#DCE4F0] hover:border-[#3978F6] transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between"
                  title="点击查看本月收入详情"
                >
                  <div className="flex items-center justify-between text-[11.5px] text-[#5F6B7A] mb-1">
                    <span className="font-semibold text-[#475569]">{metrics.monthRevenue.name}</span>
                    <span className="text-[9.5px] px-1 py-0.2 rounded bg-[#F0F4FA] text-[#2563EB] font-medium">当月</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[19px] font-bold text-[#25324B] font-mono leading-none group-hover/month:text-[#3978F6]">
                      {metrics.monthRevenue.value}
                    </span>
                    <span className="text-[11px] text-[#5F6B7A] font-medium">
                      {metrics.monthRevenue.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底栏：截至时间与详情链接 */}
          <div className="relative z-10 mt-3 pt-2 border-t border-[#3978F6]/10 flex items-center justify-between text-[11px] text-[#9AA5B5] px-0.5">
            <span>截至 {asOfTime}</span>
            <span className="text-[#3978F6] opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-medium">
              查看台账 &gt;
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. 客户规模卡（桌面端 4 列） */}
        {/* ======================================================== */}
        <div
          id="theme-card-customers"
          onClick={() => onCardClick(metrics.totalCustomers.name)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCardClick(metrics.totalCustomers.name);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="客户规模概览，点击查看客户总数详情"
          className="md:col-span-6 min-[1200px]:col-span-4 group relative bg-white rounded-[8px] border border-[#E6EAF2] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all duration-200 cursor-pointer overflow-hidden p-3.5 flex flex-col justify-between"
        >
          {/* 右上角非常淡的用户群组线性装饰图形 */}
          <div className="absolute -right-2 top-2 pointer-events-none opacity-[0.05] text-[#3978F6]">
            <Users className="w-20 h-20 stroke-[1]" />
          </div>

          {/* 上半部分：分类标题与客户总数 */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5.5 h-5.5 rounded-full bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
                  <Users className="w-3 h-3" />
                </div>
                <span className="text-[12.5px] font-semibold text-[#5F6B7A]">
                  客户规模
                </span>
              </div>
              <span className="text-[11px] text-[#9AA5B5] font-normal">
                {metrics.totalCustomers.name}
              </span>
            </div>

            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-[32px] font-extrabold text-[#1E293B] tracking-tight group-hover:text-[#3978F6] transition-colors font-mono leading-none">
                {metrics.totalCustomers.value}
              </span>
              <span className="text-[13px] font-semibold text-[#5F6B7A]">
                {metrics.totalCustomers.unit}
              </span>
            </div>
          </div>

          {/* 下半部分：相较上月新增客户 */}
          <div className="relative z-10 mt-2.5 pt-2 border-t border-[#E6EAF2]">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(metrics.newCustomers.name);
              }}
              className="flex items-center justify-between py-1.5 px-2.5 rounded-[5px] bg-[#F9FBFE] border border-[#E6EAF2]/80 hover:bg-[#F0F5FF] hover:border-[#3978F6]/30 transition-colors"
              title="点击查看新增客户详情"
            >
              <span className="text-[12px] text-[#5F6B7A]">
                相较上月新增客户
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-[15px] font-bold text-[#3978F6] font-mono leading-none">
                  +{metrics.newCustomers.value}
                </span>
                <span className="text-[11px] text-[#5F6B7A]">
                  {metrics.newCustomers.unit}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#9AA5B5] mt-1.5 px-0.5">
              <span>截至 {asOfTime}</span>
              <span className="text-[#3978F6] opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-medium">
                客户名单 &gt;
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. 实时活跃卡（桌面端 3 列） */}
        {/* ======================================================== */}
        <div
          id="theme-card-active"
          onClick={() => onCardClick(metrics.onlineUsers.name)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCardClick(metrics.onlineUsers.name);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="实时活跃概览，点击查看在线用户数详情"
          className="md:col-span-6 min-[1200px]:col-span-3 group relative bg-white rounded-[8px] border border-[#E6EAF2] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all duration-200 cursor-pointer overflow-hidden p-3.5 flex flex-col justify-between"
        >
          {/* 背景极浅雷达同心圆信号线装饰 */}
          <div className="absolute right-0 bottom-0 pointer-events-none translate-x-4 translate-y-4">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="70" cy="70" r="60" stroke="#3978F6" strokeWidth="1" strokeDasharray="3 3" opacity="0.08" />
              <circle cx="70" cy="70" r="40" stroke="#3978F6" strokeWidth="1" strokeDasharray="2 2" opacity="0.1" />
              <circle cx="70" cy="70" r="20" stroke="#3978F6" strokeWidth="1" opacity="0.12" />
            </svg>
          </div>

          {/* 上半部分：分类名称与实时状态呼吸灯 */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5.5 h-5.5 rounded-full bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
                  <Radio className="w-3 h-3" />
                </div>
                <span className="text-[12.5px] font-semibold text-[#5F6B7A]">
                  实时活跃
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#3978F6] text-[10.5px] font-medium border border-[#3978F6]/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3978F6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3978F6]"></span>
                </span>
                <span>{metrics.onlineUsers.badge || '近5分钟'}</span>
              </div>
            </div>

            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-[32px] font-extrabold text-[#1E293B] tracking-tight group-hover:text-[#3978F6] transition-colors font-mono leading-none">
                {metrics.onlineUsers.value}
              </span>
              <span className="text-[13px] font-semibold text-[#5F6B7A]">
                {metrics.onlineUsers.unit}
              </span>
            </div>
          </div>

          {/* 下半部分：持续更新与更新时间说明 */}
          <div className="relative z-10 mt-2.5 pt-2 border-t border-[#E6EAF2]">
            <div className="flex items-center justify-between py-1.5 px-2.5 rounded-[5px] bg-[#F9FBFE] border border-[#E6EAF2]/80">
              <span className="text-[11px] text-[#5F6B7A] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                数据持续更新
              </span>
              <span className="text-[11px] text-[#3978F6] font-medium">
                实时流
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#9AA5B5] mt-1.5 px-0.5">
              <span>刷新于 {metrics.onlineUsers.asOf}</span>
              <span className="text-[#3978F6] opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-medium">
                明细 &gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
