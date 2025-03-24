'use client';

import Link from 'next/link';
import { useRef } from 'react';
import ReportExporter from '@/components/reports/ReportExporter';

export default function FreeReport() {
  const reportContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary-600">DeepGeek</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  仪表盘
                </Link>
                <Link href="/dashboard/reports" className="border-primary-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  我的报告
                </Link>
                <Link href="/dashboard/settings" className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  设置
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div>
                  <button type="button" className="bg-white dark:bg-gray-800 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">打开用户菜单</span>
                    <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700">
                      <span>用户</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  电商网站后端代码分析
                </h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                    Python
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    3天前
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    4天后过期
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      免费版
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <ReportExporter
                  reportId="1"
                  reportTitle="电商网站后端代码分析"
                  targetRef={reportContainerRef}
                  includeComments={false}
                  includeCollaborators={false}
                />
                <button type="button" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  升级到专业版
                </button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div ref={reportContainerRef} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* 报告摘要 */}
            <div className="px-4 py-5 sm:px-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg mt-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                报告摘要
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                此报告分析了电商网站后端代码，发现了12个问题，包括3个严重问题、5个中等问题和4个轻微问题。
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">25%</span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                代码质量评分：需要改进
              </p>
            </div>

            {/* 问题列表 */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  发现的问题
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                  按严重程度排序
                </p>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* 严重问题 */}
                <li className="px-4 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">SQL注入漏洞</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        在用户输入处理中发现潜在的SQL注入漏洞，可能导致未授权数据访问。
                      </p>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        <p>文件: <code>app/models/user.py</code> 行: 127</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="px-4 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">未加密的密码存储</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        用户密码以明文形式存储，存在严重安全风险。
                      </p>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        <p>文件: <code>app/auth/utils.py</code> 行: 45</p>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 中等问题 */}
                <li className="px-4 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">未优化的数据库查询</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        发现多个未优化的数据库查询，可能导致性能问题。
                      </p>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        <p>文件: <code>app/services/product.py</code> 行: 78-92</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* 升级提示 */}
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-yellow-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">
                    免费版报告将在4天后过期。<Link href="/pricing" className="font-medium text-yellow-700 dark:text-yellow-100 underline hover:text-yellow-600">升级到专业版</Link>永久保存您的报告。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
