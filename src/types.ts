export type PageStatus = 'normal' | 'loading' | 'empty' | 'error';
export type TimeDimension = 'cumulative' | 'current-month' | 'history-month';

export interface MonthOption {
  key: string;
  label: string;
  shortLabel: string;
  asOf: string;
}

export interface MetricCardItem {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  badge?: string;
  badgeType?: 'primary' | 'neutral' | 'live';
  asOf: string;
  category?: string;
  trend?: number[];
}

export interface DayTrendPoint {
  date: string;
  value: number;
  displayDate: string;
}

export interface ComputePowerData {
  totalCapacity: {
    name: string;
    value: number;
    unit: string;
    badge?: string;
    asOf: string;
    trend30Days: DayTrendPoint[];
    trendTitle?: string;
  };
  newCapacity: {
    name: string;
    value: number;
    unit: string;
    badge: string;
    asOf: string;
  };
  productSupply: {
    total: { name: string; value: number; unit: string; badge?: string; asOf: string };
    newAdd: { name: string; value: number; unit: string; badge: string; asOf: string };
  };
  orderStatus: {
    total: { name: string; value: number; unit: string; badge?: string; asOf: string };
    newAdd: { name: string; value: number; unit: string; badge: string; asOf: string };
  };
}

export interface ModelSectionData {
  productStatus: {
    total: { name: string; value: number; unit: string; badge?: string; asOf: string; trend: number[] };
    newAdd: { name: string; value: number; unit: string; badge: string; asOf: string };
  };
  orderStatus: {
    total: { name: string; value: number; unit: string; badge?: string; asOf: string; trend: number[] };
    newAdd: { name: string; value: number; unit: string; badge: string; asOf: string };
  };
}

export interface AgentSectionData {
  productStatus: {
    total: { name: string; value: number; unit: string; badge?: string; asOf: string; trend: number[] };
    newAdd: { name: string; value: number; unit: string; badge: string; asOf: string };
  };
  orderStatus: {
    total: { name: string; value: number; unit: string; badge?: string; asOf: string; trend: number[] };
    newAdd: { name: string; value: number; unit: string; badge: string; asOf: string };
  };
}

export interface CoreMetricsData {
  totalRevenue: MetricCardItem;
  monthRevenue: MetricCardItem;
  totalCustomers: MetricCardItem;
  newCustomers: MetricCardItem;
  onlineUsers: MetricCardItem;
}
