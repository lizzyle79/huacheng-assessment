export const INTERVIEW_SCENARIO = {
  title: '华诚集团储干选拔面试',
  position: '高潜储干培训生',
  interviewer: '张经理 - 人力资源部',
  company: '华诚集团',

  introduction: `
    <strong>欢迎参加华诚集团2026年高潜储干选拔面试！</strong>

    <strong>面试流程：</strong>
    1. 自我介绍（1-2分钟）
    2. 专业能力问答（3-4个问题）
    3. 情景模拟题（2-3个问题）
    4. 候选人提问环节

    <strong>评分标准：</strong>
    • 逻辑思维与表达能力 (25分)
    • 专业素养与学习能力 (25分)
    • 团队协作与沟通能力 (25分)
    • 职业规划与发展潜力 (25分)
    总分：100分
  `,

  questions: [
    {
      id: 1,
      type: 'introduction',
      question: '首先，请做一个简短的自我介绍。重点包括你的教育背景、相关经历，以及为什么想加入华诚集团。',
      duration: 120,
      tips: '建议控制在1-2分钟内，突出与岗位要求相关的经历和能力。',
      evaluation: {
        criteria: ['内容完整性', '逻辑清晰度', '语言表达能力', '与岗位匹配度'],
        weight: 15
      }
    },
    {
      id: 2,
      type: 'professional',
      question: '在你过往的学习或项目经历中，请描述一个你成功解决复杂问题的案例。你是如何分析问题并找到解决方案的？',
      duration: 180,
      tips: '使用STAR法则：情境(Situation)、任务(Task)、行动(Action)、结果(Result)。',
      evaluation: {
        criteria: ['问题分析能力', '解决方案的创造性', '执行能力', '结果成效'],
        weight: 20
      }
    },
    {
      id: 3,
      type: 'professional',
      question: '作为高潜储干，需要具备快速学习新知识的能力。请举例说明你是如何快速掌握一项新技能或新知识的。',
      duration: 150,
      tips: '重点描述你的学习方法、学习效果以及如何将学到的知识应用到实践中。',
      evaluation: {
        criteria: ['学习主动性', '学习方法有效性', '知识应用能力', '学习成果'],
        weight: 20
      }
    },
    {
      id: 4,
      type: 'situational',
      question: '情景题：你正在负责一个重要项目，距离截止时间只有3天，但你的团队成员突然生病无法完成关键部分。你会如何处理这个情况？',
      duration: 180,
      tips: '请从问题处理、团队协调、应急方案等多个角度来回答。',
      evaluation: {
        criteria: ['应变能力', '团队协作意识', '问题解决能力', '责任心'],
        weight: 20
      }
    },
    {
      id: 5,
      type: 'situational',
      question: '如果你的上级给你安排了一个你认为不合理的任务，你会如何沟通和应对？',
      duration: 150,
      tips: '重点展示你的沟通技巧、解决问题的态度和对组织目标的理解。',
      evaluation: {
        criteria: ['沟通技巧', '情绪管理', '解决问题的思维', '组织忠诚度'],
        weight: 15
      }
    },
    {
      id: 6,
      type: 'career',
      question: '你未来3-5年的职业规划是什么？为什么华诚集团的高潜储干项目适合你的发展？',
      duration: 120,
      tips: '展示你的职业目标清晰度，以及与公司发展方向的契合度。',
      evaluation: {
        criteria: ['目标清晰度', '规划可行性', '与公司匹配度', '发展潜力'],
        weight: 10
      }
    }
  ],

  aiResponses: {
    encouragement: [
      '很好，请继续阐述你的想法。',
      '这个观点很有意思，能详细说明一下吗？',
      '你的思路很清晰，接下来呢？',
      '这个经历很有价值，请继续分享。'
    ],
    followUp: [
      '在这个案例中，你遇到的最大挑战是什么？',
      '如果给你重来一次的机会，你会做得更好吗？',
      '这个经历对你有什么启发？',
      '你的团队成员对此有什么反馈？'
    ],
    positive: [
      '非常好的回答，展示了你出色的思考能力。',
      '这个案例很好地体现了你的问题解决能力。',
      '你的表达很清晰，逻辑性很强。',
      '这个回答很有深度，我很欣赏你的思考方式。'
    ],
    constructive: [
      '我理解你的意思，但可以更具体一些吗？',
      '你的观点很有意思，但可以换个角度思考一下吗？',
      '这个回答虽然不错，但可以更有条理一些。',
      '我希望能听到更多关于你个人思考的内容。'
    ]
  },

  scoringCriteria: {
    logic: { name: '逻辑思维', description: '思维清晰、有条理、分析深入', maxScore: 25 },
    professional: { name: '专业素养', description: '专业知识、学习能力、技能水平', maxScore: 25 },
    communication: { name: '沟通协作', description: '表达流畅、团队意识、情商', maxScore: 25 },
    potential: { name: '发展潜力', description: '职业规划、成长空间、匹配度', maxScore: 25 }
  },

  resultTemplates: {
    excellent: {
      minScore: 85,
      title: '面试表现卓越',
      description: '展现出卓越的综合素质，强烈推荐加入高潜储干项目',
      suggestions: [
        '您的表现非常出色，展现了优秀的专业素养和思维能力',
        '建议继续保持学习的热情，在华诚集团的平台上发挥所长',
        '我们期待您的加入，相信您会成为优秀的储干人才'
      ]
    },
    good: {
      minScore: 75,
      title: '面试表现良好',
      description: '具备良好的综合素质，推荐加入高潜储干项目',
      suggestions: [
        '您的面试表现良好，展示了不错的专业能力',
        '建议在表达方式上可以更加自信，在逻辑性方面继续提升',
        '我们相信您在华诚集团会有很好的发展前景'
      ]
    },
    qualified: {
      minScore: 60,
      title: '面试表现合格',
      description: '基本符合储干要求，可以进入培养池',
      suggestions: [
        '您的表现达到了基本要求，展现了发展潜力',
        '建议加强专业知识的学习，提升表达的逻辑性和深度',
        '欢迎加入华诚集团，我们期待看到您的成长和进步'
      ]
    },
    needImprovement: {
      minScore: 0,
      title: '需要进一步提升',
      description: '当前表现未达到储干标准，建议继续锻炼后重新面试',
      suggestions: [
        '建议在相关领域积累更多实践经验',
        '可以参加一些专业培训，提升专业技能和表达能力',
        '欢迎在积累更多经验后重新申请我们的储干项目'
      ]
    }
  }
};
