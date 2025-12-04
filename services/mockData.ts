import { ChartDataPoint, LandTransaction, EnterpriseMetric } from '../types';

// Macro Economic Data (GDP, etc.)
export const getMacroData = (): ChartDataPoint[] => [
  { name: '2023 一季度', value: 4.5, value2: 1200 },
  { name: '2023 二季度', value: 6.3, value2: 1250 },
  { name: '2023 三季度', value: 4.9, value2: 1300 },
  { name: '2023 四季度', value: 5.2, value2: 1400 },
  { name: '2024 一季度', value: 5.3, value2: 1420 },
  { name: '2024 二季度', value: 4.7, value2: 1450 },
];

// Housing Trends (Price vs Volume)
export const getHousingTrendData = (): ChartDataPoint[] => [
  { name: '1月', value: 54000, value2: 1200 },
  { name: '2月', value: 53500, value2: 980 },
  { name: '3月', value: 55000, value2: 1500 },
  { name: '4月', value: 56000, value2: 1350 },
  { name: '5月', value: 55800, value2: 1400 },
  { name: '6月', value: 57000, value2: 1600 },
];

// Land Transactions Mock
export const getLandTransactions = (): LandTransaction[] => [
  { id: 'L001', city: '北京', district: '朝阳区', plotName: '朝阳崔各庄地块', area: 45000, transactionPrice: 350000, date: '2024-05-15', usage: '住宅用地' },
  { id: 'L002', city: '北京', district: '海淀区', plotName: '海淀西北旺地块', area: 22000, transactionPrice: 280000, date: '2024-06-02', usage: '商业用地' },
  { id: 'L003', city: '上海', district: '浦东新区', plotName: '浦东张江地块', area: 56000, transactionPrice: 420000, date: '2024-06-10', usage: '综合用地' },
  { id: 'L004', city: '广州', district: '天河区', plotName: '天河智慧城地块', area: 33000, transactionPrice: 190000, date: '2024-06-12', usage: '住宅用地' },
  { id: 'L005', city: '深圳', district: '南山区', plotName: '南山后海地块', area: 18000, transactionPrice: 310000, date: '2024-06-15', usage: '商业用地' },
];

// Enterprise Data
export const getEnterpriseData = (): EnterpriseMetric[] => [
  { name: '保利发展', salesAmount: 450, landBank: 2300, debtRatio: 65 },
  { name: '万科集团', salesAmount: 380, landBank: 2100, debtRatio: 68 },
  { name: '中海地产', salesAmount: 320, landBank: 1800, debtRatio: 55 },
  { name: '华润置地', salesAmount: 290, landBank: 1600, debtRatio: 58 },
  { name: '龙湖集团', salesAmount: 180, landBank: 1200, debtRatio: 60 },
];