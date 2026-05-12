export const LOGIC_DEDUCTION_SCENARIO = {
  title: '华诚集团市场扩张战略分析',
  subtitle: '基于真实业务数据的战略决策推演',

  context: `
    <strong>背景情况：</strong>
    华诚集团是一家从事高端装备制造的龙头企业，主要产品包括工业机器人、智能生产线和自动化设备。

    <strong>当前挑战：</strong>
    随着国内市场竞争加剧，公司正在考虑海外市场扩张战略。作为战略部项目经理，你需要分析以下数据并做出战略建议。

    <strong>数据情况：</strong>
    1. 国内市场：年销售额50亿元，增长率从去年的15%下降到今年的8%
    2. 东南亚市场：潜在市场规模200亿元，年增长率12%，已有3家竞争对手布局
    3. 欧洲市场：潜在市场规模500亿元，年增长率5%，技术壁垒高，认证周期长
    4. 公司现状：现金流充足(10亿元)，研发投入占比8%，品牌知名度国内第一
  `,

  dataCharts: [
    {
      title: '各区域市场增长率对比',
      data: [
        { region: '国内市场', growthRate: 8, trend: '↓ 下降', previousRate: 15 },
        { region: '东南亚', growthRate: 12, trend: '→ 稳定', previousRate: 11 },
        { region: '欧洲', growthRate: 5, trend: '↑ 缓慢增长', previousRate: 3 }
      ]
    },
    {
      title: '市场规模与竞争强度',
      data: [
        { region: '国内市场', size: 80, competition: '高', existingPlayers: '20+' },
        { region: '东南亚', size: 200, competition: '中', existingPlayers: '3家' },
        { region: '欧洲', size: 500, competition: '低', existingPlayers: '5家' }
      ]
    }
  ],

  questions: [
    {
      id: 1,
      type: 'analysis',
      question: '基于提供的数据，你认为华诚集团面临的核心挑战是什么？',
      options: [
        {
          id: 'A',
          text: '国内市场增长放缓，需要寻找新的增长点',
          analysis: '正确识别了增长压力，但缺乏对数据背后深层原因的分析',
          score: 6
        },
        {
          id: 'B',
          text: '竞争对手增加，市场份额受到威胁',
          analysis: '关注了竞争因素，但数据显示国内市场竞争格局相对稳定',
          score: 4
        },
        {
          id: 'C',
          text: '国内市场饱和且增长快速放缓，同时面临技术升级压力和国际竞争的双重挑战',
          analysis: '全面分析了数据，结合了增长率下降(15%→8%)的趋势和行业特点',
          score: 10
        },
        {
          id: 'D',
          text: '研发投入不足，技术创新能力有待提升',
          analysis: '数据中没有显示研发投入不足的问题(8%的研发投入属于行业较高水平)',
          score: 2
        }
      ]
    },
    {
      id: 2,
      type: 'strategy',
      question: '针对东南亚市场，你会建议华诚集团采取什么进入策略？',
      options: [
        {
          id: 'A',
          text: '直接设立全资子公司，快速占领市场',
          analysis: '过于激进，忽略了已有3家竞争对手的风险和本地化需求',
          score: 4
        },
        {
          id: 'B',
          text: '寻找本地合作伙伴，通过合资方式进入，降低风险并获得本地资源',
          analysis: '平衡了风险控制和市场进入速度，考虑了本地化因素',
          score: 9
        },
        {
          id: 'C',
          text: '先建立办事处进行市场调研，再逐步扩大投资',
          analysis: '稳健但可能错失市场机会，考虑到已有竞争对手布局',
          score: 6
        },
        {
          id: 'D',
          text: '收购当地竞争对手，快速获得市场份额',
          analysis: '收购成本高且整合风险大，对于首次进入的市场过于冒险',
          score: 3
        }
      ]
    },
    {
      id: 3,
      type: 'data',
      question: '如果公司只能选择一个海外市场优先进入，你会选择哪个市场？请基于数据进行决策。',
      options: [
        {
          id: 'A',
          text: '选择东南亚，因为市场规模适中且增长稳定',
          analysis: '考虑了市场规模和增长，但未充分分析竞争环境',
          score: 6
        },
        {
          id: 'B',
          text: '选择欧洲，因为市场规模最大(500亿)',
          analysis: '只看到了市场规模，忽略了技术壁垒高、认证周期长等关键约束条件',
          score: 3
        },
        {
          id: 'C',
          text: '选择东南亚，因为市场规模可观(200亿)、增长率稳定(12%)、竞争相对较小(仅3家竞争对手)，且文化差异较小',
          analysis: '全面分析了市场规模、增长率、竞争强度和文化因素，逻辑清晰',
          score: 10
        },
        {
          id: 'D',
          text: '同时进入两个市场，分散风险',
          analysis: '忽略了资源约束和管理复杂度，可能导致两个市场都做不好',
          score: 2
        }
      ]
    },
    {
      id: 4,
      type: 'forecast',
      question: '预测3年后，如果华诚集团成功进入东南亚市场并获得15%的市场份额，对公司的整体影响如何？',
      options: [
        {
          id: 'A',
          text: '总销售额将增长30亿(200亿×15%)，显著提升公司规模',
          analysis: '计算正确，但没有考虑对公司整体战略布局和品牌国际化的影响',
          score: 6
        },
        {
          id: 'B',
          text: '新增30亿销售额，占当前总收入的60%，将显著改变公司的收入结构，降低对国内市场的依赖',
          analysis: '不仅计算了财务影响，还分析了战略意义，考虑了风险分散',
          score: 10
        },
        {
          id: 'C',
          text: '销售额增长不多，对整体影响有限',
          analysis: '低估了30亿新增收入的意义(相当于当前收入的60%)',
          score: 2
        },
        {
          id: 'D',
          text: '会增加成本，短期内可能影响利润率',
          analysis: '过于保守，没有看到市场扩张带来的规模效应和品牌价值提升',
          score: 4
        }
      ]
    },
    {
      id: 5,
      type: 'optimization',
      question: '在实施海外扩张战略时，你认为华诚集团最需要优化的内部能力是什么？',
      options: [
        {
          id: 'A',
          text: '加强研发投入，提升产品技术含量',
          analysis: '研发投入已经较高(8%)，这不是当前的瓶颈',
          score: 4
        },
        {
          id: 'B',
          text: '建立国际化管理团队和跨文化管理能力',
          analysis: '准确识别了海外扩张的关键成功因素，这是最容易忽视的软实力',
          score: 10
        },
        {
          id: 'C',
          text: '扩大生产规模，降低成本',
          analysis: '成本固然重要，但海外扩张初期更重要的是本地化和适应能力',
          score: 5
        },
        {
          id: 'D',
          text: '加大营销投入，提升品牌知名度',
          analysis: '品牌建设重要，但缺乏针对不同市场的差异化考虑',
          score: 6
        }
      ]
    },
    {
      id: 6,
      type: 'risk',
      question: '在推进东南亚市场战略时，你认为最大的风险是什么？应该如何应对？',
      options: [
        {
          id: 'A',
          text: '最大风险是政策变化，应对措施是积极与当地政府建立良好关系',
          analysis: '识别了政治风险，但相对较为常见，应对措施比较常规',
          score: 6
        },
        {
          id: 'B',
          text: '最大风险是低估本地化难度和跨文化管理挑战，应对措施是大量招聘本地人才并充分授权',
          analysis: '深刻识别了企业国际化中最容易被忽视的风险，应对措施具体可行',
          score: 10
        },
        {
          id: 'C',
          text: '最大风险是竞争对手的价格战，应对措施是保持成本优势',
          analysis: '价格战风险存在，但不是海外扩张初期的主要风险',
          score: 5
        },
        {
          id: 'D',
          text: '最大风险是汇率波动，应对措施是使用金融工具对冲',
          analysis: '汇率风险确实存在，但可以通过金融工具相对容易地管理',
          score: 4
        }
      ]
    }
  ]
};

export const LOGIC_DEDUCTION_SCORING = {
  excellent: { min: 54, max: 60, title: '卓越', description: '展现出卓越的战略思维和数据分析能力' },
  good: { min: 48, max: 53, title: '优秀', description: '具备良好的逻辑推理和战略思考能力' },
  average: { min: 36, max: 47, title: '合格', description: '基本的逻辑分析能力，有提升空间' },
  poor: { min: 0, max: 35, title: '需提升', description: '建议加强数据分析和战略思维训练' }
};
