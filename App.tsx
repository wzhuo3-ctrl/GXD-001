import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Assistant from './components/Assistant';
import { StatCard, GenericLineChart, DualAxisChart, LandTable, EnterpriseTable } from './components/DashboardWidgets';
import MapWidget from './components/MapWidget';
import { Category } from './types';
import { getMacroData, getHousingTrendData, getLandTransactions, getEnterpriseData } from './services/mockData';
import { Search, Bell, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.MACRO);

  // Mock data fetching
  const macroData = getMacroData();
  const housingData = getHousingTrendData();
  const landData = getLandTransactions();
  const enterpriseData = getEnterpriseData();

  const renderContent = () => {
    switch (activeCategory) {
      case Category.MACRO:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="全国GDP (季度)" value="29.6 万亿" change="+4.7%" trend="up" />
              <StatCard title="房地产开发投资" value="4.2 万亿" change="-10.1%" trend="down" />
              <StatCard title="M2 货币供应量" value="301 万亿" change="+7.0%" trend="up" />
              <StatCard title="城镇化率" value="66.16%" change="+0.9%" trend="up" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GenericLineChart data={macroData} title="GDP 增长率趋势 (%)" dataKey="value" color="#0ea5e9" />
              <GenericLineChart data={macroData} title="固定资产投资总额" dataKey="value2" color="#8b5cf6" />
            </div>
          </div>
        );
      case Category.LAND:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="土地成交总面积" value="1,240 公顷" change="-5.2%" trend="down" />
              <StatCard title="平均楼面价" value="12,400 /平" change="+2.1%" trend="up" />
              <StatCard title="平均溢价率" value="4.5%" change="-0.8%" trend="down" />
              <StatCard title="流拍地块" value="12 宗" change="+2" trend="down" />
            </div>
            <LandTable data={landData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <GenericLineChart data={housingData} title="土地供应趋势 (万平米)" dataKey="value2" color="#10b981" />
            </div>
          </div>
        );
      case Category.NEW_HOUSING:
      case Category.SECOND_HAND:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100">
               <div className="space-x-4">
                  <span className="font-semibold text-slate-700">选择城市:</span>
                  <select className="bg-slate-50 border border-slate-200 rounded-md text-sm p-1">
                    <option>北京</option>
                    <option>上海</option>
                    <option>深圳</option>
                  </select>
               </div>
               <div className="text-sm text-slate-500">数据更新时间: 2024-06-25</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="平均成交价" value="¥57,000" change="+1.2%" trend="up" />
              <StatCard title="月度成交量" value="4,200 套" change="+5.4%" trend="up" />
              <StatCard title="去化周期" value="14.2 个月" change="-0.2" trend="up" />
            </div>
            <DualAxisChart data={housingData} title="量价走势分析 (近6个月)" />
          </div>
        );
      case Category.ENTERPRISE:
        return (
           <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="百强房企销售额" value="3400 亿" change="-12%" trend="down" />
                <StatCard title="平均负债率" value="68.4%" change="-1.5%" trend="up" />
                <StatCard title="新增融资规模" value="450 亿" change="+8%" trend="up" />
              </div>
              <EnterpriseTable data={enterpriseData} />
           </div>
        );
      case Category.MAP:
        return (
          <div className="space-y-6 animate-fadeIn">
             <div className="bg-white p-4 rounded-xl border border-slate-100 mb-4">
               <h2 className="text-lg font-semibold text-slate-800">地块与项目分布图</h2>
               <p className="text-sm text-slate-500">可视化查看全国主要城市土地成交与在售项目分布</p>
             </div>
             <MapWidget />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-96 text-slate-400 flex-col">
            <Settings size={48} className="mb-4 text-slate-300" />
            <p className="text-lg">模块正在开发中</p>
            <p className="text-sm">请选择宏观、土地、房企或楼市模块。</p>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch(activeCategory) {
      case Category.MACRO: return '宏观经济分析';
      case Category.LAND: return '土地市场监测';
      case Category.ENTERPRISE: return '房企经营情报';
      case Category.NEW_HOUSING: return '新房市场动态';
      case Category.SECOND_HAND: return '二手房市场分析';
      case Category.REPORTS: return '行业研究报告';
      case Category.MAP: return 'GIS地图数据检索';
      default: return '数据看板';
    }
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      
      <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center text-slate-800">
             <h1 className="text-xl font-bold tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索数据、地块、企业..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
             {renderContent()}
          </div>
        </div>
      </main>

      {/* AI Assistant Floating Widget */}
      <Assistant />
    </div>
  );
};

export default App;