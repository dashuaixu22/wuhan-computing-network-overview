/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageHeader } from './components/PageHeader';
import { CoreMetricsSection } from './components/CoreMetricsSection';
import { ComputeSection } from './components/ComputeSection';
import { ModelSection } from './components/ModelSection';
import { AgentSection } from './components/AgentSection';
import { LoadingSkeleton, EmptyStateView, ErrorStateView } from './components/StateViews';
import { Toast } from './components/Toast';
import {
  initialCoreMetrics,
  initialComputeData,
  initialModelData,
  initialAgentData,
} from './data';
import { PageStatus } from './types';
import { Layers } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState<PageStatus>('normal');
  const [lastUpdated] = useState<string>('2026-09-14 08:10');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'info' | 'success'>('info');

  const [coreMetrics] = useState(initialCoreMetrics);
  const [computeData] = useState(initialComputeData);
  const [modelData] = useState(initialModelData);
  const [agentData] = useState(initialAgentData);

  const showToast = (msg: string, type: 'info' | 'success' = 'info') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
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
        {/* 最上方：仅保留“运营概览”及更新时间，已删除刷新按钮 */}
        <PageHeader lastUpdated={lastUpdated} />

        {status === 'loading' && <LoadingSkeleton />}

        {status === 'empty' && (
          <EmptyStateView onRetry={() => setStatus('normal')} />
        )}

        {status === 'error' && (
          <ErrorStateView onRetry={() => setStatus('normal')} />
        )}

        {status === 'normal' && (
          <div className="space-y-3.5">
            {/* 核心概览：与产商品平级 */}
            <CoreMetricsSection
              metrics={coreMetrics}
              onCardClick={handleCardClick}
            />

            {/* 产商品 */}
            <section id="products-master-section" className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5.5 h-5.5 rounded-[4px] bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-[15px] font-bold text-[#25324B] tracking-tight">
                  产商品
                </h2>
              </div>

              {/* 算力模块：重构空间规划、去除右侧多余描述及截至时间 */}
              <ComputeSection
                data={computeData}
                onCardClick={handleCardClick}
              />

              {/* 模型模块：去除右侧描述、去除迷你趋势线、去除截至时间 */}
              <ModelSection
                data={modelData}
                onCardClick={handleCardClick}
              />

              {/* 智能体模块：去除右侧描述、去除迷你趋势线、去除截至时间 */}
              <AgentSection
                data={agentData}
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
