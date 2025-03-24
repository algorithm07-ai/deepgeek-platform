/**
 * API服务层
 * 处理与DeepSeek API的通信
 */

// API基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.deepgeek.com';

// API请求超时时间（毫秒）
const API_TIMEOUT = 30000;

/**
 * 创建API请求
 * @param endpoint API端点
 * @param method HTTP方法
 * @param data 请求数据
 * @param token 认证令牌
 * @returns Promise<T>
 */
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  token?: string
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 请求超时控制
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // 添加认证令牌（如果提供）
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const options: RequestInit = {
      method,
      headers,
      signal: controller.signal,
    };
    
    // 添加请求体（如果提供）
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    
    // 清除超时定时器
    clearTimeout(timeoutId);
    
    // 检查响应状态
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `API请求失败: ${response.statusText}`,
        errorData
      );
    }
    
    // 解析响应数据
    return await response.json();
  } catch (error) {
    // 清除超时定时器
    clearTimeout(timeoutId);
    
    // 处理请求错误
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(408, '请求超时', { timeout: API_TIMEOUT });
    } else {
      throw new ApiError(500, `请求错误: ${(error as Error).message}`, { originalError: error });
    }
  }
}

/**
 * API错误类
 */
export class ApiError extends Error {
  status: number;
  data: any;
  
  constructor(status: number, message: string, data: any = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * API服务
 */
export const apiService = {
  /**
   * 获取用户信息
   * @param token 认证令牌
   * @returns Promise<UserProfile>
   */
  getUserProfile: (token: string) => 
    apiRequest<any>('/user/profile', 'GET', undefined, token),
  
  /**
   * 上传代码进行分析
   * @param data 上传数据
   * @param token 认证令牌
   * @returns Promise<UploadResponse>
   */
  uploadCode: (data: any, token: string) => 
    apiRequest<any>('/code/upload', 'POST', data, token),
  
  /**
   * 获取报告列表
   * @param params 查询参数
   * @param token 认证令牌
   * @returns Promise<ReportListResponse>
   */
  getReports: (params: any, token: string) => 
    apiRequest<any>('/reports', 'GET', params, token),
  
  /**
   * 获取报告详情
   * @param reportId 报告ID
   * @param token 认证令牌
   * @returns Promise<ReportDetailResponse>
   */
  getReportById: (reportId: string, token: string) => 
    apiRequest<any>(`/reports/${reportId}`, 'GET', undefined, token),
  
  /**
   * 获取报告统计数据
   * @param reportId 报告ID
   * @param token 认证令牌
   * @returns Promise<ReportStatsResponse>
   */
  getReportStats: (reportId: string, token: string) => 
    apiRequest<any>(`/reports/${reportId}/stats`, 'GET', undefined, token),
  
  /**
   * 获取报告问题列表
   * @param reportId 报告ID
   * @param params 查询参数
   * @param token 认证令牌
   * @returns Promise<ReportIssuesResponse>
   */
  getReportIssues: (reportId: string, params: any, token: string) => 
    apiRequest<any>(`/reports/${reportId}/issues`, 'GET', params, token),
  
  /**
   * 添加报告评论
   * @param reportId 报告ID
   * @param data 评论数据
   * @param token 认证令牌
   * @returns Promise<CommentResponse>
   */
  addComment: (reportId: string, data: any, token: string) => 
    apiRequest<any>(`/reports/${reportId}/comments`, 'POST', data, token),
  
  /**
   * 获取报告评论列表
   * @param reportId 报告ID
   * @param token 认证令牌
   * @returns Promise<CommentsListResponse>
   */
  getComments: (reportId: string, token: string) => 
    apiRequest<any>(`/reports/${reportId}/comments`, 'GET', undefined, token),
  
  /**
   * 添加报告协作者
   * @param reportId 报告ID
   * @param data 协作者数据
   * @param token 认证令牌
   * @returns Promise<CollaboratorResponse>
   */
  addCollaborator: (reportId: string, data: any, token: string) => 
    apiRequest<any>(`/reports/${reportId}/collaborators`, 'POST', data, token),
  
  /**
   * 移除报告协作者
   * @param reportId 报告ID
   * @param collaboratorId 协作者ID
   * @param token 认证令牌
   * @returns Promise<void>
   */
  removeCollaborator: (reportId: string, collaboratorId: string, token: string) => 
    apiRequest<void>(`/reports/${reportId}/collaborators/${collaboratorId}`, 'DELETE', undefined, token),
  
  /**
   * 获取报告协作者列表
   * @param reportId 报告ID
   * @param token 认证令牌
   * @returns Promise<CollaboratorsListResponse>
   */
  getCollaborators: (reportId: string, token: string) => 
    apiRequest<any>(`/reports/${reportId}/collaborators`, 'GET', undefined, token),
  
  /**
   * 导出报告
   * @param reportId 报告ID
   * @param format 导出格式
   * @param token 认证令牌
   * @returns Promise<ExportResponse>
   */
  exportReport: (reportId: string, format: 'pdf' | 'html', token: string) => 
    apiRequest<any>(`/reports/${reportId}/export`, 'POST', { format }, token),
};

export default apiService;
