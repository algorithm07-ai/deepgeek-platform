'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">DeepGeek 平台</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 报告卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">报告中心</h2>
          <p className="text-gray-600 mb-4">查看和管理您的代码分析报告</p>
          <div className="flex justify-between">
            <Link href="/dashboard/reports" className="text-blue-500 hover:underline">
              查看报告
            </Link>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              3 个报告
            </span>
          </div>
        </div>
        
        {/* 设置卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">系统设置</h2>
          <p className="text-gray-600 mb-4">管理您的账户和应用设置</p>
          <div className="flex justify-between">
            <Link href="/dashboard/settings" className="text-blue-500 hover:underline">
              管理设置
            </Link>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              已配置
            </span>
          </div>
        </div>
        
        {/* 帮助卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">帮助中心</h2>
          <p className="text-gray-600 mb-4">获取使用指南和技术支持</p>
          <div className="flex justify-between">
            <Link href="/dashboard/help" className="text-blue-500 hover:underline">
              查看帮助
            </Link>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              新功能
            </span>
          </div>
        </div>
      </div>
      
      {/* 快速链接 */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">快速访问</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/reports/enterprise-report/3" className="text-blue-500 hover:underline">
              企业报告示例
            </Link>
            <Link href="/dashboard/reports/pro-report/2" className="text-blue-500 hover:underline">
              专业报告示例
            </Link>
            <Link href="/dashboard/reports/free-report/1" className="text-blue-500 hover:underline">
              免费报告示例
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
