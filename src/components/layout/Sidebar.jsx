import React from 'react';
import { Home, Target, Brain, ShieldAlert, BarChart3, MessageSquare, FileText } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: '总览' },
    { id: 'stage1', icon: Target, label: '关卡1：职场画像' },
    { id: 'stage2', icon: Brain, label: '关卡2：性格测评' },
    { id: 'stage3', icon: ShieldAlert, label: '关卡3：公文筐' },
    { id: 'stage4', icon: BarChart3, label: '关卡4：逻辑推演' },
    { id: 'stage5', icon: MessageSquare, label: '关卡5：面试模拟' },
    { id: 'stage6', icon: FileText, label: '关卡6：最终报告' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">华</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">华诚实训平台</h2>
            <p className="text-xs text-slate-400">储干选拔系统</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-slate-500">
        © 2026 华诚集团
      </div>
    </div>
  );
};
