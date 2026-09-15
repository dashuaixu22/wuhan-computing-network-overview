/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PageHeader } from './components/PageHeader';
import { CoreMetricsSection } from './components/CoreMetricsSection';
import { ComputeSection } from './components/ComputeSection';
import { ModelSection } from './components/ModelSection';
import { AgentSection } from './components/AgentSection';
import { LoadingSkeleton, EmptyStateView, ErrorStateView } from './components/StateViews';
import { Toast } from './components/Toast';
import {
  initialCoreMetrics,
  historyMonthOptions,
  getProductDataByDimension,
} from './data';
import { PageStatus, TimeDimension } from './types';
import { Layers } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState<PageStatus>('normal');
  const [timeDimension, setTimeDimension] = useState<TimeDimension>('current-month');
  const [selectedHistoryMonth, setSelectedHistoryMonth] = useState<string>('2026-08');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'info' | 'success'>('info');

  // 核心概览指标：严格保持不变（用户要求：注意只有产商品部分动，核心概览不要动）
  const [coreMetrics] = useState(initialCoreMetrics);

  // 产商品数据：随时间维度动态切换
  const productData = useMemo(() => {
    return getProductDataByDimension(timeDimension, selectedHistoryMonth);
  }, [timeDimension, selectedHistoryMonth]);

  const showToast = (msg: string, type: 'info' | 'success' = 'info') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleTimeDimensionChange = (dimension: TimeDimension, historyMonthKey?: string) => {
    setTimeDimension(dimension);
    if (historyMonthKey) {
      setSelectedHistoryMonth(historyMonthKey);
    }
    const label =
      dimension === 'cumulative'
        ? '累计总量'
        : dimension === 'current-month'
        ? '本月 (2026年09月)'
        : (historyMonthOptions.find((m) => m.key === (historyMonthKey || selectedHistoryMonth))?.label || '历史月份');
    showToast(`产商品数据已切换至【${label}】`, 'info');
  };

  const handleCardClick = (metricName: string) => {
    showToast(`查看【${metricName}】详情`, 'info');
  };

  return (
    <main
      id="wuhan-computing-power-overview"
      className="min-h-screen bg-[#F5F7FB] text-[#25324B] px-3 py-3 sm:px-5 sm:py-4 max-w-[1440px] mx-auto transition-all duration-300 overflow-x-hidden"
    >
      <div className="w-full space-y-3.5">
        {/* 最上方：运营概览、右上角历史月份选择Tab及更新时间 */}
        <PageHeader
          lastUpdated={productData.displayAsOf}
          timeDimension={timeDimension}
          selectedHistoryMonth={selectedHistoryMonth}
          historyMonthOptions={historyMonthOptions}
          onTimeDimensionChange={handleTimeDimensionChange}
        />

        {status === 'loading' && <LoadingSkeleton />}

        {status === 'empty' && (
          <EmptyStateView onRetry={() => setStatus('normal')} />
        )}

        {status === 'error' && (
          <ErrorStateView onRetry={() => setStatus('normal')} />
        )}

        {status === 'normal' && (
          <div className="space-y-3.5">
            {/* 核心概览：与产商品平级，不受月份Tab影响 */}
            <CoreMetricsSection
              metrics={coreMetrics}
              onCardClick={handleCardClick}
            />

            {/* 产商品 */}
            <section id="products-master-section" className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded-[4px] bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-[15px] font-bold text-[#25324B] tracking-tight">
                    产商品
                  </h2>
                  <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-[#EBF2FE] text-[#3978F6] border border-[#D5E3FA]">
                    统计范围：{productData.scopeLabel}
                  </span>
                </div>

                {timeDimension !== 'cumulative' && (
                  <span className="text-[11.5px] text-[#5F6B7A] hidden md:inline-flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3978F6]" />
                    总数显示为所选月份值，新增对比上月
                  </span>
                )}
              </div>

              {/* 算力模块 */}
              <ComputeSection
                data={productData.computeData}
                onCardClick={handleCardClick}
              />

              {/* 模型模块 */}
              <ModelSection
                data={productData.modelData}
                onCardClick={handleCardClick}
              />

              {/* 智能体模块 */}
              <AgentSection
                data={productData.agentData}
                onCardClick={handleCardClick}
              />
            </section>
          </div>
        )}
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </main>
  );
}
