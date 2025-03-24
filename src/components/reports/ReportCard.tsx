import React from 'react';
import Link from 'next/link';
import { ReportData } from '@/types/index.d';

// 使用我们在types中定义的类型
type ReportCardProps = Pick<ReportData, 'title' | 'description' | 'language' | 'date' | 'status' | 'type' | 'issueCount' | 'score' | 'id'>;

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description,
  language,
  date,
  status,
  type,
  issueCount,
  score,
  id
}) => {
  // 根据报告类型确定链接路径
  const getReportLink = () => {
    switch(type) {
      case 'free':
        return `/dashboard/reports/free-report?id=${id}`;
      case 'pro':
        return `/dashboard/reports/pro-report?id=${id}`;
      case 'enterprise':
        return `/dashboard/reports/enterprise-report?id=${id}`;
      default:
        return `/dashboard/reports`;
    }
  };

  // 根据报告类型确定标签颜色
  const getTypeColor = () => {
    switch(type) {
      case 'free':
        return 'bg-gray-100 text-gray-800';
      case 'pro':
        return 'bg-blue-100 text-blue-800';
      case 'enterprise':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 根据状态确定标签颜色
  const getStatusColor = () => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 根据分数确定进度条颜色
  const getScoreColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // 根据状态确定显示文本
  const getStatusText = () => {
    switch(status) {
      case 'completed':
        return '已完成';
      case 'processing':
        return '处理中';
      case 'failed':
        return '失败';
      default:
        return '未知';
    }
  };

  // 根据类型确定显示文本
  const getTypeText = () => {
    switch(type) {
      case 'free':
        return '免费版';
      case 'pro':
        return '专业版';
      case 'enterprise':
        return '企业版';
      default:
        return '未知';
    }
  };

  const totalIssues = issueCount.critical + issueCount.medium + issueCount.low;

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
              {description}
            </p>
          </div>
          <div className="flex space-x-2">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor()}`}>
              {getTypeText()}
            </span>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">语言</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              {language}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">分析日期</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {date}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">发现问题</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.75 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {totalIssues} 个问题 ({issueCount.critical} 严重, {issueCount.medium} 中等, {issueCount.low} 轻微)
            </dd>
          </div>
          <div className="sm:col-span-3">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">代码质量评分</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className={`${getScoreColor()} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">{score}%</span>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6">
        <Link 
          href={getReportLink()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          查看详情
        </Link>
      </div>
    </div>
  );
};

export default ReportCard;
