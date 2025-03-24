'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import reportService from '@/services/reportService';
import { ReportData } from '@/types/index.d';

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const data = await reportService.getReports();
        setReports(data);
      } catch (err) {
        setError('获取报告列表失败，请稍后再试');
        console.error('Error fetching reports:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, []);

  // 获取报告类型对应的标签样式
  const getReportTypeStyle = (type: string) => {
    switch (type) {
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

  // 获取报告类型对应的中文名称
  const getReportTypeName = (type: string) => {
    switch (type) {
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

  // 获取报告状态对应的标签样式
  const getReportStatusStyle = (status: string) => {
    switch (status) {
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

  // 获取报告状态对应的中文名称
  const getReportStatusName = (status: string) => {
    switch (status) {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">错误：</strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="mt-4">
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            返回仪表盘
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">报告列表</h1>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          返回仪表盘
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">暂无报告数据</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getReportTypeStyle(report.type)}`}>
                      {getReportTypeName(report.type)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getReportStatusStyle(report.status)}`}>
                      {getReportStatusName(report.status)}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {report.language}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {report.date}
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    <div>
                      <span className="text-red-500 font-semibold">{report.issueCount.critical}</span>
                      <span className="text-gray-500 ml-1">严重问题</span>
                    </div>
                    <div>
                      <span className="text-yellow-500 font-semibold">{report.issueCount.medium}</span>
                      <span className="text-gray-500 ml-1">中等问题</span>
                    </div>
                    <div>
                      <span className="text-blue-500 font-semibold">{report.issueCount.low}</span>
                      <span className="text-gray-500 ml-1">低危问题</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {report.score > 0 && (
                    <div className="mb-2">
                      <span className={`text-2xl font-bold ${
                        report.score >= 80 ? 'text-green-500' : 
                        report.score >= 60 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {report.score}
                      </span>
                      <span className="text-gray-500 ml-1">分</span>
                    </div>
                  )}
                  
                  <Link 
                    href={`/dashboard/reports/${report.type}-report/${report.id}`}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
