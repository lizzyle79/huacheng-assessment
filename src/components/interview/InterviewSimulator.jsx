import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, Send, Clock, User, Briefcase, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { INTERVIEW_SCENARIO } from '../../huachengInterview';

export const InterviewSimulator = ({ setActiveTab }) => {
  const [stage, setStage] = useState('intro'); // intro, interview, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [currentResponse, setCurrentResponse] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewScore, setInterviewScore] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  const questions = INTERVIEW_SCENARIO.questions;

  useEffect(() => {
    let timer;
    if (stage === 'interview' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage, timeRemaining]);

  const startInterview = () => {
    setStage('interview');
    setCurrentQuestionIndex(0);
    setTimeRemaining(questions[0].duration);
  };

  const handleTimeout = () => {
    // 自动提交当前答案
    if (currentResponse.trim()) {
      submitResponse();
    }
  };

  const submitResponse = () => {
    if (!currentResponse.trim()) return;

    setUserResponses(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: {
        response: currentResponse,
        timeSpent: questions[currentQuestionIndex].duration - timeRemaining,
        timestamp: new Date().toISOString()
      }
    }));

    // AI面试官反馈
    const feedback = getAIFeedback(currentResponse, currentQuestionIndex);

    // 延迟后进入下一题或结束
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentResponse('');
        setTimeRemaining(questions[currentQuestionIndex + 1].duration);
      } else {
        calculateFinalScore();
      }
    }, 2000);
  };

  const getAIFeedback = (response, questionIndex) => {
    // 简单的AI反馈逻辑
    const responseLength = response.length;
    const question = questions[questionIndex];

    if (responseLength < 50) {
      return INTERVIEW_SCENARIO.aiResponses.constructive[0];
    } else if (responseLength > 200) {
      return INTERVIEW_SCENARIO.aiResponses.positive[0];
    } else {
      return INTERVIEW_SCENARIO.aiResponses.encouragement[Math.floor(Math.random() * INTERVIEW_SCENARIO.aiResponses.encouragement.length)];
    }
  };

  const calculateFinalScore = () => {
    // 模拟评分计算
    let total = 0;
    let completedQuestions = Object.keys(userResponses).length;

    questions.forEach(q => {
      if (userResponses[q.id]) {
        // 基于回答长度和质量计算分数
        const responseLength = userResponses[q.id].response.length;
        let questionScore = 0;

        if (responseLength > 200) {
          questionScore = q.evaluation.weight * 0.9;
        } else if (responseLength > 100) {
          questionScore = q.evaluation.weight * 0.8;
        } else if (responseLength > 50) {
          questionScore = q.evaluation.weight * 0.7;
        } else {
          questionScore = q.evaluation.weight * 0.6;
        }

        total += questionScore;
      }
    });

    // 确保总分在合理范围内
    total = Math.min(100, Math.max(0, Math.round(total)));
    setTotalScore(total);
    setInterviewScore(getResultLevel(total));
    setStage('result');
  };

  const getResultLevel = (score) => {
    if (score >= INTERVIEW_SCENARIO.resultTemplates.excellent.minScore) {
      return INTERVIEW_SCENARIO.resultTemplates.excellent;
    } else if (score >= INTERVIEW_SCENARIO.resultTemplates.good.minScore) {
      return INTERVIEW_SCENARIO.resultTemplates.good;
    } else if (score >= INTERVIEW_SCENARIO.resultTemplates.qualified.minScore) {
      return INTERVIEW_SCENARIO.resultTemplates.qualified;
    } else {
      return INTERVIEW_SCENARIO.resultTemplates.needImprovement;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderIntro = () => (
    <div className="space-y-6">
      <div className="p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-200">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="text-indigo-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">关卡 5：AI 面试模拟</h2>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">{INTERVIEW_SCENARIO.title}</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Briefcase className="text-indigo-600" size={20} />
              <div>
                <p className="text-sm text-slate-500">应聘岗位</p>
                <p className="font-semibold text-slate-900">{INTERVIEW_SCENARIO.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <User className="text-indigo-600" size={20} />
              <div>
                <p className="text-sm text-slate-500">面试官</p>
                <p className="font-semibold text-slate-900">{INTERVIEW_SCENARIO.interviewer}</p>
              </div>
            </div>
          </div>

          <div
            className="text-sm text-slate-700 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: INTERVIEW_SCENARIO.introduction }}
          />
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {Object.entries(INTERVIEW_SCENARIO.scoringCriteria).map(([key, criteria]) => (
            <div key={key} className="bg-white rounded-xl p-4 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">{criteria.name}</h4>
              <p className="text-xs text-slate-600 mb-2">{criteria.description}</p>
              <p className="text-lg font-bold text-indigo-600">{criteria.maxScore}分</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
          <h4 className="font-bold text-slate-900 mb-2">面试须知</h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• 总共{questions.length}个问题，涵盖自我介绍、专业能力、情景模拟等</li>
            <li>• 每个问题有建议的回答时间，请合理安排时间</li>
            <li>• 回答将被记录并评分，请认真对待每个问题</li>
            <li>• 完成所有问题后将生成面试评估报告</li>
          </ul>
        </div>

        <button
          onClick={startInterview}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare size={20} />
          开始面试
        </button>
      </div>
    </div>
  );

  const renderInterview = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
          {/* 进度条 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">面试进度</span>
              <span className="text-sm font-bold text-indigo-600">{currentQuestionIndex + 1}/{questions.length}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 计时器 */}
          <div className="flex items-center gap-2 mb-6 p-4 bg-slate-50 rounded-lg">
            <Clock className={timeRemaining < 30 ? "text-red-500" : "text-indigo-600"} size={20} />
            <div className="flex-1">
              <p className="text-sm text-slate-600">剩余时间</p>
              <p className={`text-2xl font-bold ${timeRemaining < 30 ? 'text-red-500' : 'text-indigo-600'}`}>
                {formatTime(timeRemaining)}
              </p>
            </div>
          </div>

          {/* 当前问题 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-full">
                问题 {currentQuestion.id}
              </span>
              <span className="text-sm text-slate-500">
                {currentQuestion.type === 'introduction' && '自我介绍'}
                {currentQuestion.type === 'professional' && '专业能力'}
                {currentQuestion.type === 'situational' && '情景模拟'}
                {currentQuestion.type === 'career' && '职业规划'}
              </span>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl border-l-4 border-indigo-600">
              <p className="text-base font-semibold text-slate-900">{currentQuestion.question}</p>
              <p className="text-sm text-slate-600 mt-3">
                💡 {currentQuestion.tips}
              </p>
            </div>
          </div>

          {/* 回答区域 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Mic className="text-indigo-600" size={20} />
              <h4 className="font-semibold text-slate-900">您的回答</h4>
            </div>

            <textarea
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              placeholder="请输入您的回答..."
              className="w-full h-48 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              maxLength={1000}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{currentResponse.length}/1000字</span>
              <button
                onClick={submitResponse}
                disabled={!currentResponse.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2 px-6 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Send size={18} />
                提交回答
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const result = interviewScore;

    return (
      <div className="space-y-6">
        <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-4">
              <Award className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">AI 面试评估报告</h2>
            <div className="text-5xl font-black text-indigo-600 mb-4">{totalScore}分</div>
            <div className="text-xl font-semibold text-slate-700">{result.title}</div>
            <p className="text-slate-600 mt-2">{result.description}</p>
          </div>

          {/* 能力维度评分 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(INTERVIEW_SCENARIO.scoringCriteria).map(([key, criteria], index) => {
              const scores = [
                Math.round(totalScore * 0.9 / 100 * criteria.maxScore),
                Math.round(totalScore * 0.85 / 100 * criteria.maxScore),
                Math.round(totalScore * 0.8 / 100 * criteria.maxScore),
                Math.round(totalScore * 0.75 / 100 * criteria.maxScore)
              ];
              const score = scores[index];

              return (
                <div key={key} className="bg-white rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{score}分</div>
                  <div className="text-xs text-slate-500 mt-1">{criteria.name}</div>
                </div>
              );
            })}
          </div>

          {/* 面试表现总结 */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600" />
              面试表现分析
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">完成题目数量</span>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm font-bold text-slate-900">{Object.keys(userResponses).length}/{questions.length}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">平均回答时长</span>
                <span className="text-sm font-bold text-slate-900">
                  {Math.round(Object.values(userResponses).reduce((sum, r) => sum + r.timeSpent, 0) / Object.keys(userResponses).length / 60)}分钟
                </span>
              </div>
            </div>
          </div>

          {/* AI评价和建议 */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">AI 面试官评价</h3>
            <div className="space-y-3">
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                  <CheckCircle size={16} className="text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-slate-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('stage6')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
        >
          查看最终评估报告
        </button>
      </div>
    );
  };

  return (
    <div>
      {stage === 'intro' && renderIntro()}
      {stage === 'interview' && renderInterview()}
      {stage === 'result' && renderResult()}
    </div>
  );
};
