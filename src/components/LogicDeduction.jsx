import React, { useState } from 'react';
import { BarChart3, CheckCircle, AlertCircle, TrendingUp, PieChart, Target, Lightbulb, Shield } from 'lucide-react';
import { LOGIC_DEDUCTION_SCENARIO, LOGIC_DEDUCTION_SCORING } from '../huachengLogic4';

export const LogicDeduction = ({ setActiveTab }) => {
  const [currentStep, setCurrentStep] = useState('scenario'); // scenario, questions, result
  const [answers, setAnswers] = useState({});
  const [showAnalysis, setShowAnalysis] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (questionId, optionId, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { optionId, score }
    }));
    setShowAnalysis(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const calculateTotalScore = () => {
    let total = 0;
    Object.values(answers).forEach(answer => {
      total += answer.score;
    });
    setTotalScore(total);
    setCurrentStep('result');
  };

  const getScoreLevel = (score) => {
    if (score >= LOGIC_DEDUCTION_SCORING.excellent.min) return LOGIC_DEDUCTION_SCORING.excellent;
    if (score >= LOGIC_DEDUCTION_SCORING.good.min) return LOGIC_DEDUCTION_SCORING.good;
    if (score >= LOGIC_DEDUCTION_SCORING.average.min) return LOGIC_DEDUCTION_SCORING.average;
    return LOGIC_DEDUCTION_SCORING.poor;
  };

  const renderScenario = () => (
    <div className="space-y-6">
      <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-green-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">关卡 4：逻辑推演与战略决策</h2>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">{LOGIC_DEDUCTION_SCENARIO.title}</h3>
          <p className="text-slate-600 mb-4">{LOGIC_DEDUCTION_SCENARIO.subtitle}</p>
          <div
            className="text-sm text-slate-700 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: LOGIC_DEDUCTION_SCENARIO.context }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {LOGIC_DEDUCTION_SCENARIO.dataCharts.map((chart, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <PieChart size={20} className="text-green-600" />
                {chart.title}
              </h4>
              <div className="space-y-3">
                {chart.data.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{item.region}</p>
                      <p className="text-xs text-slate-500">{item.competition || item.trend}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{item.growthRate || item.size}{item.growthRate ? '%' : '亿'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-slate-900 mb-2">分析提示</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                请仔细分析以上数据，考虑市场规模、增长率、竞争环境、技术壁垒等多维度因素。
                每个问题都有最佳答案，请根据数据逻辑进行推演和判断。
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentStep('questions')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
        >
          开始逻辑推演分析
        </button>
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div className="space-y-6">
      <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-800">逻辑推演问题</h2>
          </div>
          <div className="text-sm text-slate-600">
            已完成：{Object.keys(answers).length}/{LOGIC_DEDUCTION_SCENARIO.questions.length}
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(answers).length / LOGIC_DEDUCTION_SCENARIO.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {LOGIC_DEDUCTION_SCENARIO.questions.map((q) => {
            const answer = answers[q.id];
            const hasAnswered = !!answer;

            return (
              <div key={q.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-start gap-3 mb-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                    {q.id}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-500 uppercase mb-2">
                      {q.type === 'analysis' && '数据分析题'}
                      {q.type === 'strategy' && '战略决策题'}
                      {q.type === 'data' && '数据推理题'}
                      {q.type === 'forecast' && '预测推演题'}
                      {q.type === 'optimization' && '优化建议题'}
                      {q.type === 'risk' && '风险评估题'}
                    </p>
                    <p className="text-base font-bold text-slate-900">{q.question}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {q.options.map((option) => {
                    const isSelected = answer?.optionId === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => !hasAnswered && handleAnswer(q.id, option.id, option.score)}
                        disabled={hasAnswered}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-green-500 bg-green-50'
                            : hasAnswered
                            ? 'border-slate-200 bg-slate-100 opacity-60'
                            : 'border-slate-200 hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            isSelected ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {option.id}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900 font-medium">{option.text}</p>
                            {showAnalysis[q.id] && isSelected && (
                              <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                                <div className="flex items-start gap-2">
                                  <Lightbulb size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-xs font-bold text-blue-900 mb-1">专家解析</p>
                                    <p className="text-xs text-blue-800 leading-relaxed">{option.analysis}</p>
                                    <p className="text-xs text-blue-600 mt-2 font-semibold">得分：{option.score}分</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          {isSelected && <CheckCircle size={20} className="text-green-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(answers).length === LOGIC_DEDUCTION_SCENARIO.questions.length && (
          <button
            onClick={calculateTotalScore}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all mt-8"
          >
            查看分析结果
          </button>
        )}
      </div>
    </div>
  );

  const renderResult = () => {
    const scoreLevel = getScoreLevel(totalScore);
    const percentage = Math.round((totalScore / 60) * 100);

    return (
      <div className="space-y-6">
        <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
              <BarChart3 className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">逻辑推演评估报告</h2>
            <div className="text-5xl font-black text-green-600 mb-4">{totalScore}分</div>
            <div className="text-xl font-semibold text-slate-700">{scoreLevel.title}</div>
            <p className="text-slate-600 mt-2">{scoreLevel.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{percentage}%</div>
              <div className="text-xs text-slate-500 mt-1">正确率</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{LOGIC_DEDUCTION_SCENARIO.questions.length}</div>
              <div className="text-xs text-slate-500 mt-1">题目总数</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-xs text-slate-500 mt-1">考察维度</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">战略</div>
              <div className="text-xs text-slate-500 mt-1">思维类型</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-600" />
              能力维度分析
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">数据分析能力</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                  <span className="text-sm font-bold text-green-600">强</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">战略思维能力</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                  <span className="text-sm font-bold text-blue-600">良</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">风险评估能力</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <span className="text-sm font-bold text-purple-600">良</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield size={20} className="text-amber-600" />
              发展建议
            </h3>
            <div className="space-y-3 text-sm text-slate-700">
              {totalScore >= 54 ? (
                <>
                  <p>• 您展现出卓越的战略思维和数据分析能力，适合从事战略规划、投资分析等高端岗位</p>
                  <p>• 建议继续深化行业研究，培养跨领域思维，为承担更大责任做好准备</p>
                </>
              ) : totalScore >= 48 ? (
                <>
                  <p>• 您具备良好的逻辑推理能力，能够基于数据进行有效分析</p>
                  <p>• 建议多参与实际业务决策，提升战略思考的深度和广度</p>
                </>
              ) : totalScore >= 36 ? (
                <>
                  <p>• 您具备基本的逻辑分析能力，但在系统化思考方面还有提升空间</p>
                  <p>• 建议加强数据敏感度训练，学习更多战略分析框架和方法论</p>
                </>
              ) : (
                <>
                  <p>• 建议系统学习数据分析和商业推理方法，提升逻辑思维能力</p>
                  <p>• 推荐参加相关培训课程，多阅读商业案例分析，培养战略眼光</p>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('stage5')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
        >
          完成逻辑推演并进入下一关
        </button>
      </div>
    );
  };

  return (
    <div>
      {currentStep === 'scenario' && renderScenario()}
      {currentStep === 'questions' && renderQuestions()}
      {currentStep === 'result' && renderResult()}
    </div>
  );
};
