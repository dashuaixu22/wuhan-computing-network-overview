import { ComputePowerData, CoreMetricsData, ModelSectionData, AgentSectionData, DayTrendPoint } from './types';

function generateCompute30DaysTrend(): DayTrendPoint[] {
  const points: DayTrendPoint[] = [];
  const baseValue = 2150;
  const stepGrowth = [
    0, 10, 10, 15, 20, 20, 35, 40, 45, 60,
    70, 75, 90, 120, 130, 150, 180, 210, 230, 260,
    300, 340, 390, 440, 490, 540, 590, 640, 670, 700
  ];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(2026, 8, 14);
    d.setDate(d.getDate() - i);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `2026-${m}-${day}`;
    const displayDate = `${m}-${day}`;
    const idx = 29 - i;
    const val = baseValue + (stepGrowth[idx] || 0);
    points.push({
      date: dateStr,
      displayDate,
      value: val,
    });
  }
  return points;
}

export const initialCoreMetrics: CoreMetricsData = {
  totalRevenue: {
    id: 'core-total-rev',
    name: '总收入',
    value: '12,458.60',
    unit: '万元',
    asOf: '2026-09-14 08:00',
    category: '平台商业价值',
  },
  monthRevenue: {
    id: 'core-month-rev',
    name: '本月收入',
    value: '1,842.30',
    unit: '万元',
    asOf: '2026-09-14 08:00',
    category: '月度经营指标',
  },
  totalCustomers: {
    id: 'core-total-cust',
    name: '客户总数',
    value: '386',
    unit: '户',
    asOf: '2026-09-14 08:00',
    category: '服务生态群体',
  },
  newCustomers: {
    id: 'core-new-cust',
    name: '新增客户数',
    value: '4',
    unit: '户',
    badge: '昨日新增',
    badgeType: 'neutral',
    asOf: '2026-09-13 24:00',
    category: '服务生态增长',
  },
  onlineUsers: {
    id: 'core-online-users',
    name: '在线用户数',
    value: '128',
    unit: '人',
    badge: '近5分钟',
    badgeType: 'live',
    asOf: '2026-09-14 08:10',
    category: '平台即时活跃',
  },
};

export const initialComputeData: ComputePowerData = {
  totalCapacity: {
    name: '总算力规模',
    value: 2850,
    unit: 'PFLOPS',
    asOf: '2026-09-14 08:00',
    trend30Days: generateCompute30DaysTrend(),
  },
  newCapacity: {
    name: '新增算力规模',
    value: 120,
    unit: 'PFLOPS',
    badge: '昨日新增',
    asOf: '2026-09-13 24:00',
  },
  productSupply: {
    total: {
      name: '算力商品总数',
      value: 48,
      unit: '项',
      asOf: '2026-09-14 08:00',
    },
    newAdd: {
      name: '新增算力商品数量',
      value: 2,
      unit: '项',
      badge: '昨日新增',
      asOf: '2026-09-13 24:00',
    },
  },
  orderStatus: {
    total: {
      name: '算力订单总数',
      value: 1520,
      unit: '单',
      asOf: '2026-09-14 08:00',
    },
    newAdd: {
      name: '新增算力订单数量',
      value: 18,
      unit: '单',
      badge: '昨日新增',
      asOf: '2026-09-13 24:00',
    },
  },
};

export const initialModelData: ModelSectionData = {
  productStatus: {
    total: {
      name: '模型商品总数',
      value: 156,
      unit: '项',
      asOf: '2026-09-14 08:00',
      trend: [110, 118, 122, 129, 134, 140, 145, 149, 153, 156],
    },
    newAdd: {
      name: '新增模型商品数量',
      value: 3,
      unit: '项',
      badge: '昨日新增',
      asOf: '2026-09-13 24:00',
    },
  },
  orderStatus: {
    total: {
      name: '模型订单总数',
      value: 3842,
      unit: '单',
      asOf: '2026-09-14 08:00',
      trend: [2600, 2750, 2900, 3100, 3250, 3420, 3550, 3680, 3760, 3842],
    },
    newAdd: {
      name: '新增模型订单数量',
      value: 45,
      unit: '单',
      badge: '昨日新增',
      asOf: '2026-09-13 24:00',
    },
  },
};

export const initialAgentData: AgentSectionData = {
  productStatus: {
    total: {
      name: '智能体产商品数量',
      value: 64,
      unit: '项',
      asOf: '2026-09-14 08:00',
      trend: [32, 36, 40, 43, 48, 51, 55, 58, 62, 64],
    },
    newAdd: {
      name: '新增智能体数量',
      value: 2,
      unit: '项',
      badge: '昨日新增',
      asOf: '2026-09-13 24:00',
    },
  },
  orderStatus: {
    total: {
      name: '智能体订单总数',
      value: 926,
      unit: '单',
      asOf: '2026-09-14 08:00',
      trend: [580, 620, 670, 710, 750, 790, 830, 870, 900, 926],
    },
    newAdd: {
      name: '新增智能体订单数量',
      value: 14,
      unit: '单',
      badge: '昨日新增',
      asOf: '2026-09-13 24:00',
    },
  },
};
