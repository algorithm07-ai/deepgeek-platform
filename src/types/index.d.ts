// 全局类型定义
import React from 'react';

declare global {
  // 确保JSX可用
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// 报告相关类型
export interface ReportIssue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'medium' | 'low';
  file?: string;
  line?: string;
  code?: string;
  suggestion?: string;
  references?: string[]; // 添加参考资料数组
}

export interface ReportData {
  id: string;
  title: string;
  description: string;
  language: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  type: 'free' | 'pro' | 'enterprise';
  issueCount: {
    critical: number;
    medium: number;
    low: number;
  };
  score: number;
  issues: ReportIssue[];
  expiresIn?: string; // 仅对免费版有效
  collaborators?: string[]; // 仅对企业版有效
}

// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  subscription: 'free' | 'pro' | 'enterprise';
}

// 导出默认空对象，确保文件被视为模块
export default {};
