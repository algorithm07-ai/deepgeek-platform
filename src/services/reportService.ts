/**
 * 报告服务层
 * 处理报告相关的业务逻辑
 */

import { ReportData, ReportIssue, ReportFilter } from '@/types/index.d';
import apiService from './api';
import { generateMockReports, getReportById as getMockReportById, getReportStats as getMockReportStats } from '@/models/report';

// 是否使用模拟数据
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || true;

/**
 * 报告服务
 */
export const reportService = {
  /**
   * 获取报告列表
   * @param filter 过滤条件
   * @param token 认证令牌
   * @returns Promise<ReportData[]>
   */
  getReports: async (filter?: ReportFilter, token?: string): Promise<ReportData[]> => {
    if (USE_MOCK_DATA) {
      // 使用模拟数据
      let reports = generateMockReports();
      
      // 应用过滤条件
      if (filter) {
        if (filter.type) {
          reports = reports.filter(report => report.type === filter.type);
        }
        if (filter.status) {
          reports = reports.filter(report => report.status === filter.status);
        }
        if (filter.language) {
          reports = reports.filter(report => report.language === filter.language);
        }
        if (filter.dateRange) {
          // 简化的日期过滤逻辑
          if (filter.dateRange === 'last7days') {
            reports = reports.filter(report => report.date.includes('天前') || report.date.includes('周前'));
          } else if (filter.dateRange === 'last30days') {
            reports = reports.filter(report => true); // 所有模拟数据都在30天内
          }
        }
        if (filter.severity) {
          reports = reports.filter(report => {
            if (filter.severity === 'critical' && report.issueCount.critical > 0) return true;
            if (filter.severity === 'medium' && report.issueCount.medium > 0) return true;
            if (filter.severity === 'low' && report.issueCount.low > 0) return true;
            return false;
          });
        }
        if (filter.searchTerm) {
          const term = filter.searchTerm.toLowerCase();
          reports = reports.filter(report => 
            report.title.toLowerCase().includes(term) || 
            report.description.toLowerCase().includes(term)
          );
        }
      }
      
      return reports;
    } else {
      // 使用真实API
      try {
        const response = await apiService.getReports(filter, token || '');
        return response.data;
      } catch (error) {
        console.error('获取报告列表失败:', error);
        throw error;
      }
    }
  },
  
  /**
   * 获取报告详情
   * @param reportId 报告ID
   * @param token 认证令牌
   * @returns Promise<ReportData>
   */
  getReportById: async (reportId: string, token?: string): Promise<ReportData> => {
    if (USE_MOCK_DATA) {
      // 使用模拟数据
      const report = getMockReportById(reportId);
      if (!report) {
        throw new Error(`未找到ID为${reportId}的报告`);
      }
      return report;
    } else {
      // 使用真实API
      try {
        const response = await apiService.getReportById(reportId, token || '');
        return response.data;
      } catch (error) {
        console.error(`获取报告详情失败 (ID: ${reportId}):`, error);
        throw error;
      }
    }
  },
  
  /**
   * 获取报告统计数据
   * @param reportId 报告ID或报告数据
   * @param token 认证令牌
   * @returns Promise<ReportStats>
   */
  getReportStats: async (reportId: string | ReportData, token?: string) => {
    if (typeof reportId === 'object') {
      // 如果传入的是报告数据对象，直接计算统计数据
      return getMockReportStats(reportId);
    }
    
    if (USE_MOCK_DATA) {
      // 使用模拟数据
      const report = getMockReportById(reportId);
      if (!report) {
        throw new Error(`未找到ID为${reportId}的报告`);
      }
      return getMockReportStats(report);
    } else {
      // 使用真实API
      try {
        const response = await apiService.getReportStats(reportId, token || '');
        return response.data;
      } catch (error) {
        console.error(`获取报告统计数据失败 (ID: ${reportId}):`, error);
        throw error;
      }
    }
  },
  
  /**
   * 获取报告问题列表
   * @param reportId 报告ID
   * @param filter 过滤条件
   * @param token 认证令牌
   * @returns Promise<ReportIssue[]>
   */
  getReportIssues: async (reportId: string, filter?: any, token?: string): Promise<ReportIssue[]> => {
    if (USE_MOCK_DATA) {
      // 使用模拟数据
      const report = getMockReportById(reportId);
      if (!report) {
        throw new Error(`未找到ID为${reportId}的报告`);
      }
      
      let issues = [...report.issues];
      
      // 应用过滤条件
      if (filter) {
        if (filter.severity) {
          issues = issues.filter(issue => issue.severity === filter.severity);
        }
        if (filter.searchTerm) {
          const term = filter.searchTerm.toLowerCase();
          issues = issues.filter(issue => 
            issue.title.toLowerCase().includes(term) || 
            issue.description.toLowerCase().includes(term) ||
            (issue.code && issue.code.toLowerCase().includes(term))
          );
        }
      }
      
      return issues;
    } else {
      // 使用真实API
      try {
        const response = await apiService.getReportIssues(reportId, filter, token || '');
        return response.data;
      } catch (error) {
        console.error(`获取报告问题列表失败 (ID: ${reportId}):`, error);
        throw error;
      }
    }
  },
  
  /**
   * 添加报告评论
   * @param reportId 报告ID
   * @param commentData 评论数据
   * @param token 认证令牌
   * @returns Promise<any>
   */
  addComment: async (reportId: string, commentData: any, token?: string): Promise<any> => {
    if (USE_MOCK_DATA) {
      // 模拟添加评论
      return {
        id: `comment-${Date.now()}`,
        reportId,
        ...commentData,
        createdAt: new Date().toISOString(),
      };
    } else {
      // 使用真实API
      try {
        const response = await apiService.addComment(reportId, commentData, token || '');
        return response.data;
      } catch (error) {
        console.error(`添加报告评论失败 (ID: ${reportId}):`, error);
        throw error;
      }
    }
  },
  
  /**
   * 获取报告评论列表
   * @param reportId 报告ID
   * @param token 认证令牌
   * @returns Promise<any[]>
   */
  getComments: async (reportId: string, token?: string): Promise<any[]> => {
    if (USE_MOCK_DATA) {
      // 模拟评论数据
      return [
        {
          id: 'comment-1',
          reportId,
          userId: 'user-1',
          userName: '张三',
          content: '这个报告非常详细，帮助我们发现了几个关键问题。',
          createdAt: '2025-03-20T08:30:00Z',
        },
        {
          id: 'comment-2',
          reportId,
          userId: 'user-2',
          userName: '李四',
          content: '我们已经修复了报告中提到的SQL注入漏洞，感谢分析！',
          createdAt: '2025-03-21T10:15:00Z',
        },
      ];
    } else {
      // 使用真实API
      try {
        const response = await apiService.getComments(reportId, token || '');
        return response.data;
      } catch (error) {
        console.error(`获取报告评论列表失败 (ID: ${reportId}):`, error);
        throw error;
      }
    }
  },
  
  /**
   * 添加报告协作者
   * @param reportId 报告ID
   * @param collaboratorData 协作者数据
   * @param token 认证令牌
   * @returns Promise<any>
   */
  addCollaborator: async (reportId: string, collaboratorData: any, token?: string): Promise<any> => {
    if (USE_MOCK_DATA) {
      // 模拟添加协作者
      return {
        id: `collaborator-${Date.now()}`,
        reportId,
        ...collaboratorData,
        addedAt: new Date().toISOString(),
      };
    } else {
      // 使用真实API
      try {
        const response = await apiService.addCollaborator(reportId, collaboratorData, token || '');
        return response.data;
      } catch (error) {
        console.error(`添加报告协作者失败 (ID: ${reportId}):`, error);
        throw error;
      }
    }
  },
  
  /**
   * 移除报告协作者
   * @param reportId 报告ID
   * @param collaboratorId 协作者ID
   * @param token 认证令牌
   * @returns Promise<void>
   */
  removeCollaborator: async (reportId: string, collaboratorId: string, token?: string): Promise<void> => {
    if (!USE_MOCK_DATA) {
      // 使用真实API
      try {
        await apiService.removeCollaborator(reportId, collaboratorId, token || '');
      } catch (error) {
        console.error(`移除报告协作者失败 (报告ID: ${reportId}, 协作者ID: ${collaboratorId}):`, error);
        throw error;
      }
    }
    // 模拟模式下不需要实际操作
  },
  
  /**
   * 获取报告协作者列表
   * @param reportId 报告ID
   * @param token 认证令牌
   * @returns Promise<any[]>
   */
  getCollaborators: async (reportId: string, token?: string): Promise<any[]> => {
    if (USE_MOCK_DATA) {
      // 模拟协作者数据
      return [
        {
          id: 'collaborator-1',
          reportId,
          userId: 'user-3',
          userName: '王五',
          email: 'wangwu@example.com',
          role: 'viewer',
          addedAt: '2025-03-19T14:20:00Z',
        },
        {
          id: 'collaborator-2',
          reportId,
          userId: 'user-4',
          userName: '赵六',
          email: 'zhaoliu@example.com',
          role: 'editor',
          addedAt: '2025-03-20T09:45:00Z',
        },
      ];
    } else {
      // 使用真实API
      try {
        const response = await apiService.getCollaborators(reportId, token || '');
        return response.data;
      } catch (error) {
        console.error(`获取报告协作者列表失败 (ID: ${reportId}):`, error);
        throw error;
      }
    }
  },
  
  /**
   * 导出报告
   * @param reportId 报告ID
   * @param format 导出格式
   * @param token 认证令牌
   * @returns Promise<any>
   */
  exportReport: async (reportId: string, format: 'pdf' | 'html' = 'pdf', token?: string): Promise<any> => {
    if (USE_MOCK_DATA) {
      // 模拟导出报告
      return {
        success: true,
        url: `#mock-export-${reportId}-${format}`,
        filename: `report-${reportId}.${format}`,
      };
    } else {
      // 使用真实API
      try {
        const response = await apiService.exportReport(reportId, format, token || '');
        return response.data;
      } catch (error) {
        console.error(`导出报告失败 (ID: ${reportId}, 格式: ${format}):`, error);
        throw error;
      }
    }
  },
};

export default reportService;
