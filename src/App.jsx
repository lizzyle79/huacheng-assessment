/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { CompetencyHub } from './components/competency/CompetencyHub';
import { InterviewSimulator } from './components/interview/InterviewSimulator';
import { FinalReport } from './components/report/FinalReport';
import { Home } from './components/Home';
import { MBTIAssessment } from './components/MBTIAssessment';
import { LogicDeduction } from './components/LogicDeduction';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Brain, ShieldAlert, BarChart3, AlertCircle, Award } from 'lucide-react';
import { L1_SURVEY, L2_PERSONALITY, L3_IN_BASKET } from './huachengContent';
import { MBTI_QUESTIONS, MBTI_PERSONALITY_TYPES } from './mbtiContent';

import { GlobalProvider, useGlobalContext } from './context/GlobalContext';

export default function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

function AppContent() {
  const { isLoggedIn, mbtiResult, updateMbti, scores, updateScore } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [l3Choice, setL3Choice] = useState(null);
  const [l1Scores, setL1Scores] = useState({});

  if (!isLoggedIn) {
    return <Home />;
  }

  const handleMbtiSelect = (type) => {
    updateMbti(type);
  };

  const handleL3Choice = (id, weight) => {
    setL3Choice(id);
    updateScore('l3', weight);
  };

  const handleL1Score = (questionId, score) => {
    setL1Scores(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const dominantJP = mbtiResult.J >= mbtiResult.P ? 'J' : 'P';
  const dominantNS = mbtiResult.N >= mbtiResult.S ? 'N' : 'S';

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'stage1':
        return (
          <div className="space-y-6">
            <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-slate-800">关卡 1：职场画像（胜任力自测）</h2>
              </div>
              <p className="text-slate-500 mb-8 italic">"自知者明"。请基于华诚集团储干三大核心胜任力，对自己的过往表现进行客观评价（1分：非常不匹配 - 5分：非常匹配）。</p>
              <div className="space-y-6">
                {L1_SURVEY.map(q => (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{q.dimension}</span>
                      <p className="text-sm text-slate-700 font-medium mt-1">{q.text}</p>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          onClick={() => handleL1Score(q.id, score)}
                          className={`w-8 h-8 rounded-lg border text-xs font-bold transition-all ${
                            l1Scores[q.id] === score
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('stage2')}
                disabled={Object.keys(l1Scores).length < L1_SURVEY.length}
                className="btn-primary mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交画像并解锁性格测评
              </button>
            </div>
          </div>
        );
      case 'stage2':
        return <MBTIAssessment setActiveTab={setActiveTab} updateScore={updateScore} />;
      case 'stage3':
        return (
          <div className="space-y-6">
            <div className="p-8 bg-slate-900 text-white rounded-xl shadow-sm border border-slate-800 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 text-rose-400">
                <ShieldAlert size={24} />
                <h2 className="text-2xl font-bold">关卡 3：模拟公文筐（管理实操）</h2>
              </div>
              <div className="border border-white/10 bg-white/5 p-6 rounded-2xl mb-8">
                <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-500/20 rounded text-[10px] border border-blue-500/30 font-mono">MON 08:30</span>
                  {L3_IN_BASKET.scenario.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">{L3_IN_BASKET.scenario.content}</p>
              </div>

              <div className="space-y-4">
                {L3_IN_BASKET.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleL3Choice(opt.id, opt.weight)}
                    className={`w-full p-5 hover:bg-white/10 border transition-all group rounded-2xl text-left ${
                      l3Choice === opt.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                        l3Choice === opt.id ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'
                      }`}>{opt.id}</span>
                      <p className="text-sm text-slate-100 flex-1 leading-relaxed">{opt.text}</p>
                    </div>
                  </button>
                ))}
              </div>

              {l3Choice && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-6 bg-blue-600/20 border border-blue-500/30 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="text-amber-400" size={20} />
                      <h4 className="font-bold text-blue-400">专家点评 (基于 {dominantNS}{dominantJP} 特质)</h4>
                    </div>
                    <span className="text-2xl font-black text-blue-400">{L3_IN_BASKET.options.find(o => o.id === l3Choice)?.weight} <span className="text-xs">PTS</span></span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {L3_IN_BASKET.options.find(o => o.id === l3Choice)?.comment}
                  </p>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <p className="text-xs text-blue-300 font-bold mb-2 flex items-center gap-2">
                       <Brain size={14} /> 个性化赋能建议：
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      {dominantJP === 'J' ? '作为典型的 J 型人，你具备卓越的计划性。但在处理此次"客户纠纷"时，除了进度表，更需调用感性同理心与现场灵活性。' : '作为 P 型人，你的敏捷应对是优势。但在华诚的高标准交付下，请务必建立更强的"闭环意识"，确保数据汇报不因灵活处理而产生实质性延误。'}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-12 pt-6 border-t border-white/5 text-slate-500 text-[10px] uppercase tracking-widest flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-rose-500"></span> 系统判定中...
                </div>
                <button
                  onClick={() => setActiveTab('stage4')}
                  disabled={!l3Choice}
                  className="px-6 py-2 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  进入下一关
                </button>
              </div>
            </div>
          </div>
        );
      case 'stage4':
        return <LogicDeduction setActiveTab={setActiveTab} />;
      case 'stage5':
        return <InterviewSimulator />;
      case 'stage6':
        return <FinalReport mbti={mbtiResult} l3Score={scores.l3} />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header />

        <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="px-8 py-4 text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest border-t border-slate-100 bg-white">
          华诚集团 2026 高潜储干选拔专供版 © Powered by AssessFlow Pro AI
        </footer>
      </main>

      {/* Global AI Floating Toggle */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-indigo-600 rounded-full shadow-2xl shadow-indigo-200 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group">
          <AlertCircle size={24} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute right-full mr-4 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            实训助手在线
          </div>
        </button>
      </div>
    </div>
  );
}
