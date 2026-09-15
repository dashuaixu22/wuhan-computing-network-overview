import {
  ComputePowerData,
  CoreMetricsData,
  ModelSectionData,
  AgentSectionData,
  DayTrendPoint,
  TimeDimension,
  MonthOption,
} from './types';

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

function generateMonthTrend(year: number, month: number, daysCount: number, startVal: number, endVal: number): DayTrendPoint[] {
  const points: DayTrendPoint[] = [];
  const valDiff = endVal - startVal;
  for (let day = 1; day <= daysCount; day++) {
    const progress = (day - 1) / Math.max(1, daysCount - 1);
    // Add small realistic inflection
    const curve = Math.pow(progress, 0.9);
    const m = String(month).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    points.push({
      date: `${year}-${m}-${d}`,
      displayDate: `${m}-${d}`,
      value: Math.round(startVal + valDiff * curve),
    });
  }
  return points;
}

export const historyMonthOptions: MonthOption[] = [
  { key: '2026-08', label: '2026年08月', shortLabel: '08月', asOf: '2026-08-31 24:00' },
];

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
    name: '相较上月新增客户数',
    value: '28',
    unit: '户',
    badge: '相较上月新增',
    badgeType: 'neutral',
    asOf: '2026-09-14 08:00',
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
    badge: '总存量',
    asOf: '2026-09-14 08:00',
    trend30Days: generateCompute30DaysTrend(),
    trendTitle: '近30日总算力规模变化趋势',
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
      badge: '总存量',
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
      badge: '累计',
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
      badge: '总存量',
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
      badge: '累计',
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
      badge: '总存量',
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
      badge: '累计',
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

// 历史与当月产商品数据集（核心概览不随月份变动）
interface MonthProductConfig {
  asOf: string;
  monthName: string;
  computeTotalCapacity: number;
  computeNewCapacity: number;
  computeSupplyTotal: number;
  computeSupplyNew: number;
  computeOrderTotal: number;
  computeOrderNew: number;
  modelSupplyTotal: number;
  modelSupplyNew: number;
  modelOrderTotal: number;
  modelOrderNew: number;
  agentSupplyTotal: number;
  agentSupplyNew: number;
  agentOrderTotal: number;
  agentOrderNew: number;
  computeTrendStart: number;
  computeTrendDays: number;
}

const monthConfigs: Record<string, MonthProductConfig> = {
  // 本月 (2026-09)
  '2026-09': {
    asOf: '2026-09-14 08:10',
    monthName: '9月',
    computeTotalCapacity: 420,
    computeNewCapacity: 65,
    computeSupplyTotal: 12,
    computeSupplyNew: 3,
    computeOrderTotal: 218,
    computeOrderNew: 26,
    modelSupplyTotal: 26,
    modelSupplyNew: 4,
    modelOrderTotal: 485,
    modelOrderNew: 57,
    agentSupplyTotal: 14,
    agentSupplyNew: 2,
    agentOrderTotal: 142,
    agentOrderNew: 16,
    computeTrendStart: 355,
    computeTrendDays: 14,
  },
  // 2026-08
  '2026-08': {
    asOf: '2026-08-31 24:00',
    monthName: '8月',
    computeTotalCapacity: 385,
    computeNewCapacity: 45,
    computeSupplyTotal: 11,
    computeSupplyNew: 2,
    computeOrderTotal: 195,
    computeOrderNew: 23,
    modelSupplyTotal: 22,
    modelSupplyNew: 3,
    modelOrderTotal: 428,
    modelOrderNew: 36,
    agentSupplyTotal: 12,
    agentSupplyNew: 2,
    agentOrderTotal: 126,
    agentOrderNew: 18,
    computeTrendStart: 340,
    computeTrendDays: 31,
  },
  // 2026-07
  '2026-07': {
    asOf: '2026-07-31 24:00',
    monthName: '7月',
    computeTotalCapacity: 340,
    computeNewCapacity: 40,
    computeSupplyTotal: 9,
    computeSupplyNew: 2,
    computeOrderTotal: 172,
    computeOrderNew: 22,
    modelSupplyTotal: 19,
    modelSupplyNew: 3,
    modelOrderTotal: 392,
    modelOrderNew: 32,
    agentSupplyTotal: 10,
    agentSupplyNew: 1,
    agentOrderTotal: 108,
    agentOrderNew: 15,
    computeTrendStart: 300,
    computeTrendDays: 31,
  },
  // 2026-06
  '2026-06': {
    asOf: '2026-06-30 24:00',
    monthName: '6月',
    computeTotalCapacity: 300,
    computeNewCapacity: 35,
    computeSupplyTotal: 7,
    computeSupplyNew: 1,
    computeOrderTotal: 150,
    computeOrderNew: 20,
    modelSupplyTotal: 16,
    modelSupplyNew: 2,
    modelOrderTotal: 360,
    modelOrderNew: 30,
    agentSupplyTotal: 9,
    agentSupplyNew: 2,
    agentOrderTotal: 93,
    agentOrderNew: 12,
    computeTrendStart: 265,
    computeTrendDays: 30,
  },
  // 2026-05
  '2026-05': {
    asOf: '2026-05-31 24:00',
    monthName: '5月',
    computeTotalCapacity: 265,
    computeNewCapacity: 30,
    computeSupplyTotal: 6,
    computeSupplyNew: 1,
    computeOrderTotal: 130,
    computeOrderNew: 18,
    modelSupplyTotal: 14,
    modelSupplyNew: 2,
    modelOrderTotal: 330,
    modelOrderNew: 25,
    agentSupplyTotal: 7,
    agentSupplyNew: 1,
    agentOrderTotal: 81,
    agentOrderNew: 10,
    computeTrendStart: 235,
    computeTrendDays: 31,
  },
  // 2026-04
  '2026-04': {
    asOf: '2026-04-30 24:00',
    monthName: '4月',
    computeTotalCapacity: 235,
    computeNewCapacity: 25,
    computeSupplyTotal: 5,
    computeSupplyNew: 1,
    computeOrderTotal: 112,
    computeOrderNew: 15,
    modelSupplyTotal: 12,
    modelSupplyNew: 2,
    modelOrderTotal: 305,
    modelOrderNew: 22,
    agentSupplyTotal: 6,
    agentSupplyNew: 1,
    agentOrderTotal: 71,
    agentOrderNew: 9,
    computeTrendStart: 210,
    computeTrendDays: 30,
  },
  // 2026-03
  '2026-03': {
    asOf: '2026-03-31 24:00',
    monthName: '3月',
    computeTotalCapacity: 210,
    computeNewCapacity: 20,
    computeSupplyTotal: 4,
    computeSupplyNew: 1,
    computeOrderTotal: 97,
    computeOrderNew: 14,
    modelSupplyTotal: 10,
    modelSupplyNew: 1,
    modelOrderTotal: 283,
    modelOrderNew: 20,
    agentSupplyTotal: 5,
    agentSupplyNew: 1,
    agentOrderTotal: 62,
    agentOrderNew: 8,
    computeTrendStart: 190,
    computeTrendDays: 31,
  },
};

export function getProductDataByDimension(
  dimension: TimeDimension,
  historyMonthKey: string = '2026-08'
): {
  computeData: ComputePowerData;
  modelData: ModelSectionData;
  agentData: AgentSectionData;
  displayAsOf: string;
  scopeLabel: string;
} {
  if (dimension === 'cumulative') {
    return {
      computeData: initialComputeData,
      modelData: initialModelData,
      agentData: initialAgentData,
      displayAsOf: '2026-09-14 08:10',
      scopeLabel: '累计总量',
    };
  }

  const monthKey = dimension === 'current-month' ? '2026-09' : historyMonthKey;
  const cfg = monthConfigs[monthKey] || monthConfigs['2026-08'];
  const monthNum = parseInt(monthKey.split('-')[1], 10);
  const isCurrentMonth = dimension === 'current-month';
  const totalBadgeName = isCurrentMonth ? '本月总数' : '所选月总数';
  const trendTitleName = isCurrentMonth
    ? `2026年${monthNum}月算力规模变化趋势 (截至9月14日)`
    : `算力规模变化趋势 (${cfg.monthName})`;

  const computeTrend = generateMonthTrend(
    2026,
    monthNum,
    cfg.computeTrendDays,
    cfg.computeTrendStart,
    cfg.computeTotalCapacity
  );

  const computeData: ComputePowerData = {
    totalCapacity: {
      name: '本月算力规模',
      value: cfg.computeTotalCapacity,
      unit: 'PFLOPS',
      badge: totalBadgeName,
      asOf: cfg.asOf,
      trend30Days: computeTrend,
      trendTitle: trendTitleName,
    },
    newCapacity: {
      name: '新增算力规模',
      value: cfg.computeNewCapacity,
      unit: 'PFLOPS',
      badge: '相较于上月新增',
      asOf: cfg.asOf,
    },
    productSupply: {
      total: {
        name: '本月算力商品数',
        value: cfg.computeSupplyTotal,
        unit: '项',
        badge: totalBadgeName,
        asOf: cfg.asOf,
      },
      newAdd: {
        name: '新增算力商品数量',
        value: cfg.computeSupplyNew,
        unit: '项',
        badge: '相较于上月新增',
        asOf: cfg.asOf,
      },
    },
    orderStatus: {
      total: {
        name: '本月算力订单数',
        value: cfg.computeOrderTotal,
        unit: '单',
        badge: totalBadgeName,
        asOf: cfg.asOf,
      },
      newAdd: {
        name: '新增算力订单数量',
        value: cfg.computeOrderNew,
        unit: '单',
        badge: '相较于上月新增',
        asOf: cfg.asOf,
      },
    },
  };

  const modelData: ModelSectionData = {
    productStatus: {
      total: {
        name: '本月模型商品数',
        value: cfg.modelSupplyTotal,
        unit: '项',
        badge: totalBadgeName,
        asOf: cfg.asOf,
        trend: [
          Math.round(cfg.modelSupplyTotal * 0.7),
          Math.round(cfg.modelSupplyTotal * 0.8),
          Math.round(cfg.modelSupplyTotal * 0.9),
          cfg.modelSupplyTotal,
        ],
      },
      newAdd: {
        name: '新增模型商品数量',
        value: cfg.modelSupplyNew,
        unit: '项',
        badge: '相较于上月新增',
        asOf: cfg.asOf,
      },
    },
    orderStatus: {
      total: {
        name: '本月模型订单数',
        value: cfg.modelOrderTotal,
        unit: '单',
        badge: totalBadgeName,
        asOf: cfg.asOf,
        trend: [
          Math.round(cfg.modelOrderTotal * 0.65),
          Math.round(cfg.modelOrderTotal * 0.75),
          Math.round(cfg.modelOrderTotal * 0.88),
          cfg.modelOrderTotal,
        ],
      },
      newAdd: {
        name: '新增模型订单数量',
        value: cfg.modelOrderNew,
        unit: '单',
        badge: '相较于上月新增',
        asOf: cfg.asOf,
      },
    },
  };

  const agentData: AgentSectionData = {
    productStatus: {
      total: {
        name: '本月智能体商品数',
        value: cfg.agentSupplyTotal,
        unit: '项',
        badge: totalBadgeName,
        asOf: cfg.asOf,
        trend: [
          Math.round(cfg.agentSupplyTotal * 0.6),
          Math.round(cfg.agentSupplyTotal * 0.75),
          Math.round(cfg.agentSupplyTotal * 0.9),
          cfg.agentSupplyTotal,
        ],
      },
      newAdd: {
        name: '新增智能体数量',
        value: cfg.agentSupplyNew,
        unit: '项',
        badge: '相较于上月新增',
        asOf: cfg.asOf,
      },
    },
    orderStatus: {
      total: {
        name: '本月智能体订单数',
        value: cfg.agentOrderTotal,
        unit: '单',
        badge: totalBadgeName,
        asOf: cfg.asOf,
        trend: [
          Math.round(cfg.agentOrderTotal * 0.7),
          Math.round(cfg.agentOrderTotal * 0.82),
          Math.round(cfg.agentOrderTotal * 0.92),
          cfg.agentOrderTotal,
        ],
      },
      newAdd: {
        name: '新增智能体订单数量',
        value: cfg.agentOrderNew,
        unit: '单',
        badge: '相较于上月新增',
        asOf: cfg.asOf,
      },
    },
  };

  return {
    computeData,
    modelData,
    agentData,
    displayAsOf: cfg.asOf,
    scopeLabel: isCurrentMonth ? '2026年09月' : `2026年${String(monthNum).padStart(2, '0')}月`,
  };
}
