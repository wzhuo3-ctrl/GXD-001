import React from 'react';
import { 
  PieChart, Building2, Map, FileText, 
  TrendingUp, Home, Layers, Activity 
} from 'lucide-react';
import { Category, NavItem } from '../types';

interface SidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: Category.MACRO, label: '宏观经济', icon: <Activity size={20} /> },
  { id: Category.ENTERPRISE, label: '房企监测', icon: <Building2 size={20} /> },
  { id: Category.LAND, label: '土地市场', icon: <Layers size={20} /> },
  { id: Category.NEW_HOUSING, label: '新房市场', icon: <Home size={20} /> },
  { id: Category.SECOND_HAND, label: '二手房市场', icon: <TrendingUp size={20} /> },
  { id: Category.REPORTS, label: '报告与排名', icon: <FileText size={20} /> },
  { id: Category.MAP, label: '地图检索', icon: <Map size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col shadow-xl fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">国</div>
        <span className="text-white font-bold text-lg tracking-tight">国信达数据</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          市场数据中心
        </div>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelectCategory(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm transition-all duration-200 border-l-4 ${
                  activeCategory === item.id
                    ? 'border-brand-500 bg-slate-800 text-white'
                    : 'border-transparent hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className={`${activeCategory === item.id ? 'text-brand-400' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-xs font-bold text-white">管</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">管理员</p>
            <p className="text-xs text-slate-500">查看个人资料</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;