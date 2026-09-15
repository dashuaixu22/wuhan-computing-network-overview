import React from 'react';
import { Cpu, Server, Layers, ShoppingBag, ChevronRight, TrendingUp } from 'lucide-react';
import { ComputePowerData } from '../types';

interface ComputeSectionProps {
  data: ComputePowerData;
  onCardClick: (metricName: string) => void;
}

export const ComputeSection: React.FC<ComputeSectionProps> = ({ data, onCardClick }) => {
  return (
    <div
      id="product-compute-module"
      className="group/compute bg-white rounded-[7px] border border-[#E6EAF2] gov-card-shadow p-3.5 transition-all"
    >
      {/* 算力模块顶栏：鼠标移入整卡或顶栏时在右侧展现明细详情跳转入口 */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E6EAF2]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[5px] bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 stroke-[1.8]" />
          </div>
          <h3 className="text-[14.5px] font-bold text-[#25324B]">算力</h3>
        </div>

        <button
          onClick={() => onCardClick('算力详情')}
          className="opacity-0 group-hover/compute:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1 text-[12px] font-medium text-[#3978F6] hover:text-[#2563EB] hover:underline cursor-pointer focus:opacity-100"
          title="查看算力明细与详情"
        >
          <span>查看明细</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 原有六个核心指标：并排3大核心子板块（资源能力、商品供给、订单情况，各2个指标共6个） */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 子板块 1：资源能力（总算力规模 + 新增算力规模） */}
        <div className="rounded-[6px] bg-[#F9FBFE] border border-[#E6EAF2] p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="p-1 rounded bg-[#EAF1FF] text-[#3978F6]">
              <Server className="w-3 h-3" />
            </div>
            <span className="text-[12.5px] font-semibold text-[#25324B]">资源能力</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 1. 总算力规模 */}
            <div
              onClick={() => onCardClick(data.totalCapacity.name)}
              tabIndex={0}
              role="button"
              className="bg-white rounded-[5px] p-2.5 border border-[#DCE4F0] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#3978F6]/80" />
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-[#5F6B7A] mb-0.5">
                  <span className="font-semibold text-[#25324B]">{data.totalCapacity.name}</span>
                  <span className="text-[9.5px] px-1 py-0.2 rounded bg-[#F0F4FA] text-[#5F6B7A] font-medium">
                    {data.totalCapacity.badge || '总存量'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[20px] font-extrabold text-[#1E293B] group-hover:text-[#3978F6] font-mono transition-colors">
                    {data.totalCapacity.value.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#5F6B7A] font-medium">
                    {data.totalCapacity.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. 新增算力规模 */}
            <div
              onClick={() => onCardClick(data.newCapacity.name)}
              tabIndex={0}
              role="button"
              className="bg-[#F4F8FE] rounded-[5px] p-2.5 border border-[#D5E3FA] hover:border-[#3978F6]/70 gov-card-shadow gov-card-shadow-hover transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-[#3978F6] mb-0.5">
                  <span className="font-medium text-[#4A5D78] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#3978F6]" />
                    {data.newCapacity.name}
                  </span>
                  {data.newCapacity.badge && (
                    <span className="text-[9.5px] bg-[#E5EEFF] text-[#2563EB] font-medium px-1 py-0.2 rounded border border-[#C9DCFF]">
                      {data.newCapacity.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[20px] font-extrabold text-[#2563EB] group-hover:text-[#1D4ED8] font-mono transition-colors">
                    +{data.newCapacity.value}
                  </span>
                  <span className="text-[11px] text-[#3978F6] font-medium">
                    {data.newCapacity.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 子板块 2：商品供给（算力商品总数 + 新增算力商品数） */}
        <div className="rounded-[6px] bg-[#F9FBFE] border border-[#E6EAF2] p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="p-1 rounded bg-[#EAF1FF] text-[#3978F6]">
              <Layers className="w-3 h-3" />
            </div>
            <span className="text-[12.5px] font-semibold text-[#25324B]">商品供给</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 3. 算力商品总数 */}
            <div
              onClick={() => onCardClick(data.productSupply.total.name)}
              tabIndex={0}
              role="button"
              className="bg-white rounded-[5px] p-2.5 border border-[#DCE4F0] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#3978F6]/80" />
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-[#5F6B7A] mb-0.5">
                  <span className="font-semibold text-[#25324B] truncate">{data.productSupply.total.name}</span>
                  <span className="text-[9.5px] px-1 py-0.2 rounded bg-[#F0F4FA] text-[#5F6B7A] font-medium">
                    {data.productSupply.total.badge || '总存量'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[20px] font-extrabold text-[#1E293B] group-hover:text-[#3978F6] font-mono transition-colors">
                    {data.productSupply.total.value}
                  </span>
                  <span className="text-[11px] text-[#5F6B7A]">{data.productSupply.total.unit}</span>
                </div>
              </div>
            </div>

            {/* 4. 新增算力商品数量 */}
            <div
              onClick={() => onCardClick(data.productSupply.newAdd.name)}
              tabIndex={0}
              role="button"
              className="bg-[#F4F8FE] rounded-[5px] p-2.5 border border-[#D5E3FA] hover:border-[#3978F6]/70 gov-card-shadow gov-card-shadow-hover transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-[#5F6B7A] font-medium mb-0.5">
                  <span className="truncate flex items-center gap-1 text-[#4A5D78]">
                    <TrendingUp className="w-3 h-3 text-[#3978F6]" />
                    新增商品数
                  </span>
                  {data.productSupply.newAdd.badge && (
                    <span className="text-[9.5px] bg-[#E5EEFF] text-[#2563EB] font-medium px-1 py-0.2 rounded border border-[#C9DCFF]">
                      {data.productSupply.newAdd.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[20px] font-extrabold text-[#2563EB] group-hover:text-[#1D4ED8] font-mono transition-colors">
                    +{data.productSupply.newAdd.value}
                  </span>
                  <span className="text-[11px] text-[#3978F6]">{data.productSupply.newAdd.unit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 子板块 3：订单情况（算力订单总数 + 新增算力订单数） */}
        <div className="rounded-[6px] bg-[#F9FBFE] border border-[#E6EAF2] p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="p-1 rounded bg-[#EAF1FF] text-[#3978F6]">
              <ShoppingBag className="w-3 h-3" />
            </div>
            <span className="text-[12.5px] font-semibold text-[#25324B]">订单情况</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 5. 算力订单总数 */}
            <div
              onClick={() => onCardClick(data.orderStatus.total.name)}
              tabIndex={0}
              role="button"
              className="bg-white rounded-[5px] p-2.5 border border-[#DCE4F0] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#3978F6]/80" />
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-[#5F6B7A] mb-0.5">
                  <span className="font-semibold text-[#25324B] truncate">{data.orderStatus.total.name}</span>
                  <span className="text-[9.5px] px-1 py-0.2 rounded bg-[#F0F4FA] text-[#5F6B7A] font-medium">
                    {data.orderStatus.total.badge || '累计'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[20px] font-extrabold text-[#1E293B] group-hover:text-[#3978F6] font-mono transition-colors">
                    {data.orderStatus.total.value.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#5F6B7A]">{data.orderStatus.total.unit}</span>
                </div>
              </div>
            </div>

            {/* 6. 新增算力订单数量 */}
            <div
              onClick={() => onCardClick(data.orderStatus.newAdd.name)}
              tabIndex={0}
              role="button"
              className="bg-[#F4F8FE] rounded-[5px] p-2.5 border border-[#D5E3FA] hover:border-[#3978F6]/70 gov-card-shadow gov-card-shadow-hover transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-[#5F6B7A] font-medium mb-0.5">
                  <span className="truncate flex items-center gap-1 text-[#4A5D78]">
                    <TrendingUp className="w-3 h-3 text-[#3978F6]" />
                    新增订单数
                  </span>
                  {data.orderStatus.newAdd.badge && (
                    <span className="text-[9.5px] bg-[#E5EEFF] text-[#2563EB] font-medium px-1 py-0.2 rounded border border-[#C9DCFF]">
                      {data.orderStatus.newAdd.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[20px] font-extrabold text-[#2563EB] group-hover:text-[#1D4ED8] font-mono transition-colors">
                    +{data.orderStatus.newAdd.value}
                  </span>
                  <span className="text-[11px] text-[#3978F6]">{data.orderStatus.newAdd.unit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
