import React from 'react';
import { RefreshCw, Inbox, AlertTriangle } from 'lucide-react';

interface LoadingSkeletonProps {
  type?: 'full' | 'cards';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = () => {
  return (
    <div className="space-y-6 animate-pulse" id="loading-state-view">
      <div>
        <div className="h-4 w-28 bg-[#E6EAF2] rounded mb-3"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-[8px] p-4 border border-[#E6EAF2] gov-card-shadow h-[116px] flex flex-col justify-between"
            >
              <div className="h-3.5 w-20 bg-[#E6EAF2] rounded"></div>
              <div className="h-7 w-28 bg-[#EAF1FF] rounded"></div>
              <div className="h-2.5 w-24 bg-[#F0F3F8] rounded"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="h-5 w-24 bg-[#E6EAF2] rounded"></div>

        <div className="bg-white rounded-[8px] p-5 border border-[#E6EAF2] gov-card-shadow space-y-4">
          <div className="h-4 w-32 bg-[#E6EAF2] rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 h-52 bg-[#F5F7FB] rounded"></div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-24 bg-[#F5F7FB] rounded"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map((m) => (
            <div key={m} className="bg-white rounded-[8px] p-5 border border-[#E6EAF2] gov-card-shadow space-y-4">
              <div className="h-4 w-28 bg-[#E6EAF2] rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-28 bg-[#F5F7FB] rounded"></div>
                <div className="h-28 bg-[#F5F7FB] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const EmptyStateView: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <div
      id="empty-state-view"
      className="w-full bg-white rounded-[8px] border border-[#E6EAF2] gov-card-shadow p-12 flex flex-col items-center justify-center text-center my-6"
    >
      <div className="w-12 h-12 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#9AA5B5] mb-3">
        <Inbox className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-[15px] font-medium text-[#25324B] mb-1">暂无概览运行数据</h3>
      <p className="text-[13px] text-[#9AA5B5] max-w-sm mb-4">
        当前统计周期内尚未同步或生成算力网相关产商品指标，请稍后刷新或检查平台运行服务。
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium text-[#3978F6] bg-[#EAF1FF] hover:bg-[#3978F6] hover:text-white rounded-[6px] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          重新获取数据
        </button>
      )}
    </div>
  );
};

export const ErrorStateView: React.FC<{ onRetry: () => void; errorMsg?: string }> = ({
  onRetry,
  errorMsg = '服务接口响应超时或网络异常，无法加载武汉算力网概览指标。',
}) => {
  return (
    <div
      id="error-state-view"
      className="w-full bg-white rounded-[8px] border border-[#FEE2E2] gov-card-shadow p-12 flex flex-col items-center justify-center text-center my-6"
    >
      <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#EF4444] mb-3">
        <AlertTriangle className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-[15px] font-medium text-[#25324B] mb-1">数据加载异常</h3>
      <p className="text-[13px] text-[#5F6B7A] max-w-md mb-4">{errorMsg}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-[#3978F6] hover:bg-[#2B61D4] rounded-[6px] shadow-sm transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        重新加载概览
      </button>
    </div>
  );
};
