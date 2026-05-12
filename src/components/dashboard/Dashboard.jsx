import React from 'react';
import { Target, Brain, ShieldAlert, BarChart3, MessageSquare, FileText, Lock, CheckCircle } from 'lucide-react';

export const Dashboard = ({ onNavigate }) => {
  const stages = [
    {
      id: 'stage1',
      title: '职场画像',
      description: '胜任力自测',
      icon: Target,
      status: 'available',
      color: 'blue'
    },
    {
      id: 'stage2',
      title: '职业性格测评',
      description: 'MBTI职场版',
      icon: Brain,
      status: 'locked',
      color: 'purple'
    },
    {
      id: 'stage3',
      title: '模拟公文筐',
      description: '管理实操',
      icon: ShieldAlert,
      status: 'locked',
      color: 'rose'
    },
    {
      id: 'stage4',
      title: '逻辑推演',
      description: '数据分析',
      icon: BarChart3,
      status: 'locked',
      color: 'green'
    },
    {
      id: 'stage5',
      title: '面试模拟',
      description: 'AI智能面试',
      icon: MessageSquare,
      status: 'locked',
      color: 'amber'
    },
    {
      id: 'stage6',
      title: '最终报告',
      description: '综合评估',
      icon: FileText,
      status: 'locked',
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">测评仪表板</h1>
        <p className="text-blue-100">完成全部6个关卡，生成您的储干胜任力报告</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isAvailable = stage.status === 'available';

          return (
            <div
              key={stage.id}
              className={`bg-white rounded-xl p-6 border-2 transition-all ${
                isAvailable
                  ? 'border-slate-200 hover:border-blue-300 hover:shadow-lg cursor-pointer'
                  : 'border-slate-100 opacity-60'
              }`}
              onClick={() => isAvailable && onNavigate(stage.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stage.color}-100`}>
                  <Icon size={24} className={`text-${stage.color}-600`} />
                </div>
                {isAvailable ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <Lock size={20} className="text-slate-400" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-400">关卡 {index + 1}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{stage.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{stage.description}</p>

              {isAvailable && (
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  开始测评
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-4">测评说明</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• 请按顺序完成测评，每个关卡完成后自动解锁下一关</li>
          <li>• 测评结果将作为华诚集团2026年储干选拔的重要参考</li>
          <li>• 全部完成后将生成个人胜任力分析报告</li>
        </ul>
      </div>
    </div>
  );
};
