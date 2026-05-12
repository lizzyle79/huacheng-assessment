import React, { useState } from 'react';
import { Brain, CheckCircle, AlertCircle } from 'lucide-react';
import { MBTI_QUESTIONS, MBTI_SCORING_RULES, MBTI_PERSONALITY_TYPES } from '../mbtiContent';
import { useGlobalContext } from '../context/GlobalContext';

export const MBTIAssessment = ({ setActiveTab }) => {
  const { updateMbti } = useGlobalContext();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [finalType, setFinalType] = useState('');
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  const handleScoreChange = (questionId, option, score) => {
    const validScore = Math.max(0, Math.min(5, parseInt(score) || 0));
    const otherOption = option === 'A' ? 'B' : 'A';
    const otherScore = 5 - validScore;

    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [option]: validScore,
        [otherOption]: otherScore
      }
    }));
  };

  const calculateMBTI = () => {
    let newScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // 按照MBTI3.html的严格计分规则
    // E/I维度：问题1,5,9,13,17,21,25,29,33,37,41,45 (A选项=E分, B选项=I分)
    MBTI_SCORING_RULES.EI.forEach(questionId => {
      const answer = answers[questionId];
      if (answer) {
        newScores.E += answer.A || 0;
        newScores.I += answer.B || 0;
      }
    });

    // S/N维度：问题2,6,10,14,18,22,26,30,34,38,42,46 (A选项=S分, B选项=N分)
    MBTI_SCORING_RULES.SN.forEach(questionId => {
      const answer = answers[questionId];
      if (answer) {
        newScores.S += answer.A || 0;
        newScores.N += answer.B || 0;
      }
    });

    // T/F维度：问题3,7,11,15,19,23,27,31,35,39,43,47 (A选项=T分, B选项=F分)
    MBTI_SCORING_RULES.TF.forEach(questionId => {
      const answer = answers[questionId];
      if (answer) {
        newScores.T += answer.A || 0;
        newScores.F += answer.B || 0;
      }
    });

    // J/P维度：问题4,8,12,16,20,24,28,32,36,40,44,48 (A选项=J分, B选项=P分)
    MBTI_SCORING_RULES.JP.forEach(questionId => {
      const answer = answers[questionId];
      if (answer) {
        newScores.J += answer.A || 0;
        newScores.P += answer.B || 0;
      }
    });

    setScores(newScores);

    // 确定最终类型（严格按照MBTI3.html的逻辑）
    const type =
      (newScores.E > newScores.I ? 'E' : 'I') +
      (newScores.S > newScores.N ? 'S' : 'N') +
      (newScores.T > newScores.F ? 'T' : 'F') +
      (newScores.J > newScores.P ? 'J' : 'P');

    setFinalType(type);
    setShowResult(true);
  };

  const progress = Object.keys(answers).length;
  const progressPercent = (progress / MBTI_QUESTIONS.length) * 100;

  if (showResult) {
    const personality = MBTI_PERSONALITY_TYPES[finalType] || {
      name: '未知类型',
      description: '您的性格类型是独特的。',
      jobs: []
    };

    return (
      <div className="space-y-6">
        <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-sm border border-purple-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-4">
              <Brain className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">您的MBTI性格类型</h2>
            <div className="text-5xl font-black text-purple-600 mb-4">{finalType}</div>
            <div className="text-xl font-semibold text-slate-700">{personality.name}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">E: {scores.E}</div>
              <div className="text-2xl font-bold text-purple-600">I: {scores.I}</div>
              <div className="text-xs text-slate-500 mt-1">外向/内向</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">S: {scores.S}</div>
              <div className="text-2xl font-bold text-teal-600">N: {scores.N}</div>
              <div className="text-xs text-slate-500 mt-1">感觉/直觉</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">T: {scores.T}</div>
              <div className="text-2xl font-bold text-pink-600">F: {scores.F}</div>
              <div className="text-xs text-slate-500 mt-1">思考/情感</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">J: {scores.J}</div>
              <div className="text-2xl font-bold text-amber-600">P: {scores.P}</div>
              <div className="text-xs text-slate-500 mt-1">判断/感知</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="font-bold text-slate-900 mb-3">性格描述</h3>
            <p className="text-slate-700 leading-relaxed">{personality.description}</p>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-3">适合的工作领域</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {personality.jobs.map((job, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm text-slate-700">{job}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('stage3')}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
        >
          完成测评并进入公文筐
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-800">关卡 2：职业性格测评（MBTI 专业版）</h2>
          </div>
          <div className="text-sm text-slate-600">
            进度：{progress}/{MBTI_QUESTIONS.length} ({Math.round(progressPercent)}%)
          </div>
        </div>

        <div className="mb-8">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-slate-900 mb-2">测评说明</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            以下每道题目均有两个答案：A和B。请仔细阅读题目，按照与你性格相符的程度分别赋予A和B一个分数（0-5分），并使每组的两个分数之和为5分。
            如果你觉得在不同的情境里，两个答案或许都能反映你的倾向，那么请按照你的行为方式选择一个对你来说最自然、最顺畅和最从容的答案。
          </p>
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
          {MBTI_QUESTIONS.map((q, index) => {
            const answer = answers[q.id] || {};
            const scoreA = answer.A || 0;
            const scoreB = answer.B || 0;

            const dimensionColors = {
              'EI': 'blue',
              'SN': 'green',
              'TF': 'red',
              'JP': 'orange'
            };
            const color = dimensionColors[q.dimension];

            return (
              <div key={q.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span className={`text-xs font-bold text-${color}-600 uppercase`}>
                    {q.dimension}维度
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 mb-4">{q.question}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-purple-600 w-6">A</span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 mb-2">{q.optionA}</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={scoreA}
                          onChange={(e) => handleScoreChange(q.id, 'A', e.target.value)}
                          className="w-16 px-3 py-2 border border-slate-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <span className="text-xs text-slate-500">分</span>
                        <span className="text-xs text-slate-400">→ B自动为: {5 - scoreA}分</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-purple-600 w-6">B</span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 mb-2">{q.optionB}</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={scoreB}
                          onChange={(e) => handleScoreChange(q.id, 'B', e.target.value)}
                          className="w-16 px-3 py-2 border border-slate-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <span className="text-xs text-slate-500">分</span>
                        <span className="text-xs text-slate-400">→ A自动为: {5 - scoreB}分</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    {scoreA + scoreB === 5 ? (
                      <>
                        <CheckCircle size={14} className="text-green-500" />
                        <span>分数合计正确：{scoreA} + {scoreB} = 5</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} className="text-amber-500" />
                        <span>请确保A+B=5（当前：{scoreA} + {scoreB} = {scoreA + scoreB}）</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={calculateMBTI}
          disabled={progress < MBTI_QUESTIONS.length}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          提交测评并查看结果
        </button>

        {progress < MBTI_QUESTIONS.length && (
          <p className="text-center text-sm text-slate-500 mt-4">
            请完成所有 {MBTI_QUESTIONS.length} 道题目后再提交（当前已完成 {progress} 道）
          </p>
        )}
      </div>
    </div>
  );
};
