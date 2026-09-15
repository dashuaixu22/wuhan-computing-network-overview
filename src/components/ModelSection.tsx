import React from 'react';
import { Box, Layers, ShoppingBag, TrendingUp } from 'lucide-react';
import { ModelSectionData } from '../types';

interface ModelSectionProps {
  data: ModelSectionData;
}

export const ModelSection: React.FC<ModelSectionProps> = ({ data }) => {
  return (
    <div
      id="product-model-module"
      className="bg-white rounded-[7px] border border-[#E6EAF2] gov-card-shadow p-4 transition-all"
    >
      {/* 顶栏 */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#E6EAF2]">
        <div className="flex items-center gap-2">
          <div className="w-6.5 h-6.5 rounded-[5px] bg-[#EAF1FF] text-[#3978F6] flex items-center justify-center">
            <Box className="w-4 h-4 stroke-[1.8]" />
          </div>
          <h3 className="text-[15px] font-bold text-[#25324B]">模型</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* 商品情况 */}
        <div className="rounded-[6px] bg-[#F9FBFE] border border-[#E6EAF2] p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="p-1 rounded bg-[#EAF1FF] text-[#3978F6]">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-[13px] font-semibold text-[#25324B]">商品情况</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* 模型商品总数 */}
            <div className="group/item bg-white rounded-[6px] p-3 border border-[#DCE4F0] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all flex flex-col justify-between relative overflow-hidden min-h-[78px]">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#3978F6]/80" />
              <div>
                <div className="flex items-center justify-between text-[12px] text-[#5F6B7A] mb-1">
                  <span className="font-semibold text-[#25324B] truncate">{data.productStatus.total.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F0F4FA] text-[#5F6B7A] font-medium">
                    {data.productStatus.total.badge || '总存量'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[23px] font-extrabold text-[#1E293B] group-hover/item:text-[#3978F6] transition-colors font-mono">
                    {data.productStatus.total.value}
                  </span>
                  <span className="text-[12px] text-[#5F6B7A] font-medium">
                    {data.productStatus.total.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* 新增模型商品数量 */}
            <div className="group/item bg-[#F4F8FE] rounded-[6px] p-3 border border-[#D5E3FA] hover:border-[#3978F6]/70 gov-card-shadow gov-card-shadow-hover transition-all flex flex-col justify-between relative overflow-hidden min-h-[78px]">
              <div>
                <div className="flex items-center justify-between text-[12px] text-[#5F6B7A] font-medium mb-1">
                  <span className="truncate flex items-center gap-1 text-[#4A5D78]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#3978F6] transition-transform duration-200 group-hover/item:translate-x-0.5" />
                    {data.productStatus.newAdd.name}
                  </span>
                  {data.productStatus.newAdd.badge && (
                    <span className="text-[10px] bg-[#E5EEFF] text-[#2563EB] font-medium px-1.5 py-0.2 rounded border border-[#C9DCFF]">
                      {data.productStatus.newAdd.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[23px] font-extrabold text-[#2563EB] group-hover/item:text-[#1D4ED8] transition-colors font-mono">
                    +{data.productStatus.newAdd.value}
                  </span>
                  <span className="text-[12px] text-[#3978F6] font-medium">
                    {data.productStatus.newAdd.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 订单情况 */}
        <div className="rounded-[6px] bg-[#F9FBFE] border border-[#E6EAF2] p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="p-1 rounded bg-[#EAF1FF] text-[#3978F6]">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="text-[13px] font-semibold text-[#25324B]">订单情况</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* 模型订单总数 */}
            <div className="group/item bg-white rounded-[6px] p-3 border border-[#DCE4F0] hover:border-[#3978F6]/60 gov-card-shadow gov-card-shadow-hover transition-all flex flex-col justify-between relative overflow-hidden min-h-[78px]">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#3978F6]/80" />
              <div>
                <div className="flex items-center justify-between text-[12px] text-[#5F6B7A] mb-1">
                  <span className="font-semibold text-[#25324B] truncate">{data.orderStatus.total.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F0F4FA] text-[#5F6B7A] font-medium">
                    {data.orderStatus.total.badge || '累计'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[23px] font-extrabold text-[#1E293B] group-hover/item:text-[#3978F6] transition-colors font-mono">
                    {data.orderStatus.total.value.toLocaleString()}
                  </span>
                  <span className="text-[12px] text-[#5F6B7A] font-medium">
                    {data.orderStatus.total.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* 新增模型订单数量 */}
            <div className="group/item bg-[#F4F8FE] rounded-[6px] p-3 border border-[#D5E3FA] hover:border-[#3978F6]/70 gov-card-shadow gov-card-shadow-hover transition-all flex flex-col justify-between relative overflow-hidden min-h-[78px]">
              <div>
                <div className="flex items-center justify-between text-[12px] text-[#5F6B7A] font-medium mb-1">
                  <span className="truncate flex items-center gap-1 text-[#4A5D78]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#3978F6] transition-transform duration-200 group-hover/item:translate-x-0.5" />
                    {data.orderStatus.newAdd.name}
                  </span>
                  {data.orderStatus.newAdd.badge && (
                    <span className="text-[10px] bg-[#E5EEFF] text-[#2563EB] font-medium px-1.5 py-0.2 rounded border border-[#C9DCFF]">
                      {data.orderStatus.newAdd.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[23px] font-extrabold text-[#2563EB] group-hover/item:text-[#1D4ED8] transition-colors font-mono">
                    +{data.orderStatus.newAdd.value}
                  </span>
                  <span className="text-[12px] text-[#3978F6] font-medium">
                    {data.orderStatus.newAdd.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
