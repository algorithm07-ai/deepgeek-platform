import { ReportData, ReportIssue } from '@/types/index.d';

// 模拟报告数据生成函数
export function generateMockReports(): ReportData[] {
  return [
    {
      id: '1',
      title: '电商网站后端代码分析',
      description: '分析了电商网站后端代码，发现了多个安全和性能问题',
      language: 'Python',
      date: '3天前',
      status: 'completed',
      type: 'free',
      issueCount: {
        critical: 3,
        medium: 5,
        low: 4
      },
      score: 62,
      issues: generateMockIssues(12, 'free'),
      expiresIn: '4天后'
    },
    {
      id: '2',
      title: '前端React组件库',
      description: '分析了React组件库，发现了内存泄漏和性能优化问题',
      language: 'JavaScript',
      date: '1周前',
      status: 'completed',
      type: 'pro',
      issueCount: {
        critical: 2,
        medium: 4,
        low: 2
      },
      score: 65,
      issues: generateMockIssues(8, 'pro')
    },
    {
      id: '3',
      title: '微服务架构安全分析',
      description: '分析了微服务架构的安全性，发现了多个严重安全漏洞',
      language: 'Java',
      date: '2周前',
      status: 'completed',
      type: 'enterprise',
      issueCount: {
        critical: 5,
        medium: 7,
        low: 3
      },
      score: 45,
      issues: generateMockIssues(15, 'enterprise'),
      collaborators: ['张工程师', '李工程师', '王工程师']
    },
    {
      id: '4',
      title: '移动应用API集成',
      description: '正在分析移动应用的API集成代码',
      language: 'Swift',
      date: '1小时前',
      status: 'processing',
      type: 'pro',
      issueCount: {
        critical: 0,
        medium: 0,
        low: 0
      },
      score: 0,
      issues: []
    }
  ];
}

// 生成模拟问题数据
function generateMockIssues(count: number, type: 'free' | 'pro' | 'enterprise'): ReportIssue[] {
  const issues: ReportIssue[] = [];
  
  // 免费版报告问题
  const freeIssues: ReportIssue[] = [
    {
      id: '1',
      title: '未处理的异常',
      description: '发现多处未处理的异常，可能导致应用崩溃',
      severity: 'critical',
      file: 'src/controllers/user.py',
      line: '42-55'
    },
    {
      id: '2',
      title: 'SQL注入风险',
      description: '发现潜在的SQL注入风险，建议使用参数化查询',
      severity: 'critical',
      file: 'src/controllers/product.py',
      line: '87-95'
    },
    {
      id: '3',
      title: '密码明文存储',
      description: '用户密码以明文形式存储，存在严重安全风险',
      severity: 'critical',
      file: 'src/models/user.py',
      line: '28-35'
    }
  ];
  
  // 专业版报告问题
  const proIssues: ReportIssue[] = [
    {
      id: '1',
      title: '内存泄漏风险',
      description: '在Modal组件中发现潜在的内存泄漏风险，事件监听器在组件卸载后未被正确移除',
      severity: 'critical',
      file: 'src/components/Modal.jsx',
      line: '42-55',
      code: `useEffect(() => {
  window.addEventListener('keydown', handleEscapeKey);
  // 缺少清理函数
}, []);`,
      suggestion: `useEffect(() => {
  window.addEventListener('keydown', handleEscapeKey);
  return () => {
    window.removeEventListener('keydown', handleEscapeKey);
  };
}, []);`
    },
    {
      id: '2',
      title: '不必要的重渲染',
      description: 'Table组件在数据未变化时进行不必要的重渲染，可能导致性能问题',
      severity: 'medium',
      file: 'src/components/Table.jsx',
      line: '87-95',
      suggestion: `// 使用React.memo包装组件
export default React.memo(Table, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});`
    }
  ];
  
  // 企业版报告问题
  const enterpriseIssues: ReportIssue[] = [
    {
      id: '1',
      title: 'API网关缺少请求限流',
      description: 'API网关未实现请求限流机制，容易受到DDoS攻击。建议实现基于IP的请求限流和基于用户的访问频率控制',
      severity: 'critical',
      file: 'src/main/java/com/example/gateway/SecurityConfig.java',
      line: '42-55',
      code: `// 当前配置缺少限流机制
@Configuration
public class SecurityConfig {
    // ...
}`,
      suggestion: `// 添加限流配置
@Configuration
public class SecurityConfig {
    @Bean
    public RateLimiter rateLimiter() {
        return RateLimiter.create(100.0); // 每秒100个请求
    }
    // ...
}`
    },
    {
      id: '2',
      title: '用户服务密码策略不足',
      description: '用户服务的密码策略不够严格，允许简单密码。建议实现更严格的密码复杂度要求和定期密码更新策略',
      severity: 'medium',
      file: 'src/main/java/com/example/user/service/UserService.java',
      line: '87-95',
      code: `// 当前密码验证逻辑
public boolean validatePassword(String password) {
    return password.length() >= 6;
}`,
      suggestion: `// 增强密码验证逻辑
public boolean validatePassword(String password) {
    // 至少8个字符
    if (password.length() < 8) return false;
    
    // 至少包含一个数字
    if (!password.matches(".*\\d.*")) return false;
    
    // 至少包含一个大写字母
    if (!password.matches(".*[A-Z].*")) return false;
    
    // 至少包含一个特殊字符
    if (!password.matches(".*[!@#$%^&*()].*")) return false;
    
    return true;
}`
    }
  ];
  
  // 根据报告类型选择问题集
  let sourceIssues: ReportIssue[] = [];
  switch(type) {
    case 'free':
      sourceIssues = freeIssues;
      break;
    case 'pro':
      sourceIssues = [...freeIssues, ...proIssues];
      break;
    case 'enterprise':
      sourceIssues = [...freeIssues, ...proIssues, ...enterpriseIssues];
      break;
  }
  
  // 确保问题数量不超过源问题数量
  const actualCount = Math.min(count, sourceIssues.length);
  
  // 随机选择问题
  for (let i = 0; i < actualCount; i++) {
    const randomIndex = Math.floor(Math.random() * sourceIssues.length);
    const issue = sourceIssues[randomIndex];
    
    // 避免重复
    if (!issues.find(existingIssue => existingIssue.id === issue.id)) {
      issues.push(issue);
    } else {
      // 如果重复，重试一次
      i--;
    }
  }
  
  return issues;
}

// 根据ID获取报告
export function getReportById(id: string): ReportData | undefined {
  const reports = generateMockReports();
  return reports.find(report => report.id === id);
}

// 获取报告问题统计
export function getReportStats(report: ReportData) {
  return {
    totalIssues: report.issueCount.critical + report.issueCount.medium + report.issueCount.low,
    criticalIssues: report.issueCount.critical,
    mediumIssues: report.issueCount.medium,
    lowIssues: report.issueCount.low,
    score: report.score,
    scoreColor: getScoreColor(report.score),
    scoreText: getScoreText(report.score)
  };
}

// 根据分数获取颜色
function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

// 根据分数获取评价文本
function getScoreText(score: number): string {
  if (score >= 80) return '良好';
  if (score >= 60) return '一般';
  return '需要改进';
}
