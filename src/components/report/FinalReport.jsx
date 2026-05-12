import React from 'react';
import { Award, TrendingUp, CheckCircle, Clock, Mail, Target, Briefcase, Brain, BarChart3, ShieldAlert, MessageSquare } from 'lucide-react';
import { useGlobalContext } from '../../context/GlobalContext';
import { MBTI_PERSONALITY_TYPES } from '../../mbtiContent';

export const FinalReport = ({ setActiveTab }) => {
  const { userData, mbtiResult, scores } = useGlobalContext();

  // 计算各关卡得分
  const calculateScores = () => {
    // 关卡1：职场画像（假设满分15分）
    const l1Score = scores.l1 || 12; // 基于用户完成情况

    // 关卡2：MBTI测评（满分25分，基于回答完整性）
    const l2Score = (mbtiResult.E + mbtiResult.I + mbtiResult.S + mbtiResult.N +
                    mbtiResult.T + mbtiResult.F + mbtiResult.J + mbtiResult.P) > 0 ? 22 : 18;

    // 关卡3：公文筐（满分20分，使用实际得分）
    const l3Score = scores.l3 || 15;

    // 关卡4：逻辑推演（满分20分，模拟得分）
    const l4Score = scores.l4 || 16;

    // 关卡5：面试模拟（满分20分，模拟得分）
    const l5Score = scores.l5 || 17;

    return {
      l1: l1Score,
      l2: l2Score,
      l3: l3Score,
      l4: l4Score,
      l5: l5Score,
      total: l1Score + l2Score + l3Score + l4Score + l5Score
    };
  };

  const calculatedScores = calculateScores();

  // 确定评估等级
  const getEvaluationLevel = (totalScore) => {
    if (totalScore >= 90) {
      return {
        level: 'S级 - 卓越',
        color: 'amber',
        bgColor: 'bg-amber-500',
        textColor: 'text-amber-600',
        description: '表现卓越，展现出优秀的综合素质和巨大发展潜力',
        possibility: '极高'
      };
    } else if (totalScore >= 80) {
      return {
        level: 'A级 - 优秀',
        color: 'emerald',
        bgColor: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        description: '表现优秀，具备良好的综合素质和发展潜力',
        possibility: '很高'
      };
    } else if (totalScore >= 70) {
      return {
        level: 'B级 - 良好',
        color: 'blue',
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-600',
        description: '表现良好，基本符合高潜储干的要求',
        possibility: '较高'
      };
    } else if (totalScore >= 60) {
      return {
        level: 'C级 - 合格',
        color: 'green',
        bgColor: 'bg-green-500',
        textColor: 'text-green-600',
        description: '表现合格，具备一定的发展潜力',
        possibility: '中等'
      };
    } else {
      return {
        level: 'D级 - 待提升',
        color: 'slate',
        bgColor: 'bg-slate-500',
        textColor: 'text-slate-600',
        description: '当前表现未达到预期，建议继续锻炼提升',
        possibility: '较低'
      };
    }
  };

  const evaluationLevel = getEvaluationLevel(calculatedScores.total);

  // 获取MBTI类型描述
  const getMBTIType = () => {
    const type =
      (mbtiResult.E >= mbtiResult.I ? 'E' : 'I') +
      (mbtiResult.S >= mbtiResult.N ? 'S' : 'N') +
      (mbtiResult.T >= mbtiResult.F ? 'T' : 'F') +
      (mbtiResult.J >= mbtiResult.P ? 'J' : 'P');

    return MBTI_PERSONALITY_TYPES[type] || {
      name: '未知类型',
      description: '您的MBTI类型分析'
    };
  };

  const mbtiType = getMBTIType();

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-amber-400" size={32} />
            <div>
              <h1 className="text-3xl font-bold">华诚集团2026年高潜储干选拔最终评估报告</h1>
              <p className="text-purple-100 mt-1">候选人：{userData?.name} | 学号：{userData?.studentId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 综合评估等级 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">综合评估等级</h2>
          <div className={`px-6 py-3 ${evaluationLevel.bgColor} text-white rounded-xl`}>
            <span className="text-2xl font-bold">{evaluationLevel.level}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-600">总得分</span>
              <span className="text-3xl font-black text-indigo-600">{calculatedScores.total}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(calculatedScores.total, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">满分100分</p>
          </div>

          <div className="space-y-4">
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg">
              <p className="text-sm font-semibold text-indigo-900 mb-1">综合评价</p>
              <p className="text-sm text-slate-700">{evaluationLevel.description}</p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-lg">
              <p className="text-sm font-semibold text-amber-900 mb-1">录用可能性</p>
              <p className="text-sm text-slate-700">{evaluationLevel.possibility}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 各关卡详细得分 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">各关卡详细得分</h2>

        <div className="space-y-4">
          {/* 关卡1 */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">关卡1：职场画像（胜任力自测）</h4>
              <p className="text-sm text-slate-600">考察三大核心胜任力的自我认知</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{calculatedScores.l1}</p>
              <p className="text-xs text-slate-500">/ 15分</p>
            </div>
          </div>

          {/* 关卡2 */}
          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">关卡2：职业性格测评（MBTI）</h4>
              <p className="text-sm text-slate-600">
                类型：{mbtiType.name} |
                {(mbtiResult.E >= mbtiResult.I ? 'E' : 'I')}{(mbtiResult.S >= mbtiResult.N ? 'S' : 'N')}{(mbtiResult.T >= mbtiResult.F ? 'T' : 'F')}{(mbtiResult.J >= mbtiResult.P ? 'J' : 'P')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">{calculatedScores.l2}</p>
              <p className="text-xs text-slate-500">/ 25分</p>
            </div>
          </div>

          {/* 关卡3 */}
          <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl border border-rose-200">
            <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">关卡3：模拟公文筐（管理实操）</h4>
              <p className="text-sm text-slate-600">危机处理和决策能力评估</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-rose-600">{calculatedScores.l3}</p>
              <p className="text-xs text-slate-500">/ 20分</p>
            </div>
          </div>

          {/* 关卡4 */}
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">关卡4：逻辑推演与战略决策</h4>
              <p className="text-sm text-slate-600">数据分析和战略思维能力</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{calculatedScores.l4}</p>
              <p className="text-xs text-slate-500">/ 20分</p>
            </div>
          </div>

          {/* 关卡5 */}
          <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">关卡5：AI面试模拟</h4>
              <p className="text-sm text-slate-600">综合表现和沟通能力评估</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">{calculatedScores.l5}</p>
              <p className="text-xs text-slate-500">/ 20分</p>
            </div>
          </div>
        </div>
      </div>

      {/* 能力雷达图 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">能力维度分析</h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-sm font-bold text-slate-900">自我认知</p>
            <p className="text-xs text-slate-600">优秀</p>
          </div>

          <div className="text-center">
            <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
              <div className="bg-purple-600 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm font-bold text-slate-900">性格特质</p>
            <p className="text-xs text-slate-600">良好</p>
          </div>

          <div className="text-center">
            <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
              <div className="bg-rose-600 h-3 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm font-bold text-slate-900">执行能力</p>
            <p className="text-xs text-slate-600">优秀</p>
          </div>

          <div className="text-center">
            <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
              <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-sm font-bold text-slate-900">综合素质</p>
            <p className="text-xs text-slate-600">优秀</p>
          </div>
        </div>
      </div>

      {/* 发展建议 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp size={24} className="text-indigo-600" />
          个性化发展建议
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">优势领域</h4>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 具备良好的自我认知和职业规划意识</li>
              <li>• 在面对挑战时能保持冷静并做出决策</li>
              <li>• 展现出学习和适应新环境的能力</li>
            </ul>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-lg">
            <h4 className="font-bold text-amber-900 mb-2">提升空间</h4>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 建议在数据分析的深度方面继续加强</li>
              <li>• 可以进一步提升跨部门沟通协作能力</li>
              <li>• 鼓励在战略思考方面进行更多训练</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 重要通知 */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl shadow-xl p-8">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <Clock size={48} className="text-blue-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">重要通知</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">测评完成</p>
                  <p className="text-blue-100 text-sm">恭喜您完成了华诚集团2026年高潜储干选拔的全部6个关卡测评！</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                <Mail size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">录用结果通知</p>
                  <p className="text-blue-100 text-sm">我们将在<strong className="text-amber-300">3个工作日内</strong>通过邮件方式通知您最终的录用结果，请保持关注您的邮箱。</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                <Briefcase size={20} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">后续安排</p>
                  <p className="text-blue-100 text-sm">被录取的候选人将收到详细的入职指导和培训安排，请做好相应准备。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 感谢信息 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="text-white" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">感谢您的参与！</h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          无论结果如何，这次测评经历都是您职业发展道路上的宝贵财富。
          华诚集团期待与优秀的人才共同成长！
        </p>
      </div>
    </div>
  );
};
