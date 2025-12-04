import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { ChartDataPoint, LandTransaction, EnterpriseMetric } from '../types';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

// --- Stat Card ---
interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, color = "blue" }) => {
  const getIcon = () => {
    if (trend === 'up') return <ArrowUp size={16} className="text-emerald-500" />;
    if (trend === 'down') return <ArrowDown size={16} className="text-rose-500" />;
    return <Minus size={16} className="text-slate-400" />;
  };

  const getChangeColor = () => {
    if (trend === 'up') return 'text-emerald-600 bg-emerald-50';
    if (trend === 'down') return 'text-rose-600 bg-rose-50';
    return 'text-slate-600 bg-slate-50';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-slate-500 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {change && (
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getChangeColor()}`}>
            {getIcon()}
            <span className="ml-1">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Charts ---

export const GenericLineChart: React.FC<{ data: ChartDataPoint[], title: string, dataKey: string, color: string }> = ({ data, title, dataKey, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96 flex flex-col">
    <h3 className="text-lg font-semibold text-slate-800 mb-6">{title}</h3>
    <div className="flex-1 w-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b' }}
          />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fillOpacity={1} fill={`url(#color${dataKey})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const DualAxisChart: React.FC<{ data: ChartDataPoint[], title: string }> = ({ data, title }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96 flex flex-col">
    <h3 className="text-lg font-semibold text-slate-800 mb-6">{title}</h3>
    <div className="flex-1 w-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="value" name="均价 (元/平米)" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={30} />
          <Line yAxisId="right" type="monotone" dataKey="value2" name="成交量 (套)" stroke="#f59e0b" strokeWidth={2} dot={{r: 4, strokeWidth: 2}} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// --- Tables ---

export const LandTable: React.FC<{ data: LandTransaction[] }> = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-slate-800">最新土地成交记录</h3>
      <button className="text-sm text-brand-600 font-medium hover:text-brand-700">导出Excel</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-slate-900 font-semibold">
          <tr>
            <th className="px-6 py-4">地块ID</th>
            <th className="px-6 py-4">城市/区域</th>
            <th className="px-6 py-4">地块名称</th>
            <th className="px-6 py-4">规划用途</th>
            <th className="px-6 py-4 text-right">面积 (平米)</th>
            <th className="px-6 py-4 text-right">成交价 (万元)</th>
            <th className="px-6 py-4">成交日期</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
              <td className="px-6 py-4">{row.city} - {row.district}</td>
              <td className="px-6 py-4 font-medium text-slate-900">{row.plotName}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  row.usage.includes('住宅') ? 'bg-indigo-100 text-indigo-800' :
                  row.usage.includes('商业') ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {row.usage}
                </span>
              </td>
              <td className="px-6 py-4 text-right">{row.area.toLocaleString()}</td>
              <td className="px-6 py-4 text-right font-medium text-slate-900">{row.transactionPrice.toLocaleString()}</td>
              <td className="px-6 py-4 text-slate-500">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const EnterpriseTable: React.FC<{ data: EnterpriseMetric[] }> = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-6 border-b border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800">Top 房企经营数据</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-slate-900 font-semibold">
          <tr>
            <th className="px-6 py-4">排名</th>
            <th className="px-6 py-4">企业名称</th>
            <th className="px-6 py-4 text-right">销售额 (亿元)</th>
            <th className="px-6 py-4 text-right">土储 (万平米)</th>
            <th className="px-6 py-4 text-right">负债率</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr key={row.name} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                 <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                   idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
                 }`}>
                   {idx + 1}
                 </span>
              </td>
              <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
              <td className="px-6 py-4 text-right">{row.salesAmount}</td>
              <td className="px-6 py-4 text-right">{row.landBank.toLocaleString()}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end">
                  <span className={`${row.debtRatio > 65 ? 'text-red-600' : 'text-emerald-600'}`}>{row.debtRatio}%</span>
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full ml-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${row.debtRatio > 65 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${row.debtRatio}%` }} 
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);