import React from 'react';

// Categories defined in the uploaded image
export enum Category {
  MACRO = 'MACRO',
  ENTERPRISE = 'ENTERPRISE',
  LAND = 'LAND',
  NEW_HOUSING = 'NEW_HOUSING',
  SECOND_HAND = 'SECOND_HAND',
  REPORTS = 'REPORTS',
  MAP = 'MAP'
}

export interface NavItem {
  id: Category;
  label: string;
  icon: React.ReactNode;
  subItems?: string[];
}

// Data structures for the dashboard
export interface MetricCardProps {
  title: string;
  value: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  period: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
}

// Specific data types based on image details
export interface LandTransaction {
  id: string;
  city: string;
  district: string;
  plotName: string;
  area: number;
  transactionPrice: number; // in 10k RMB
  date: string;
  usage: string;
}

export interface EnterpriseMetric {
  name: string;
  salesAmount: number; // 100m RMB
  landBank: number; // 10k sqm
  debtRatio: number; // percentage
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}