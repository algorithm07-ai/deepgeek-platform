'use client';

import Link from 'next/link';
import { useRef } from 'react';
import ReportExporter from '@/components/reports/ReportExporter';

export default function ProReport() {
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
                  前端React组件库
                </h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                    JavaScript
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    1周前
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    永久保存
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      专业版
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <ReportExporter
                  reportId="2"
                  reportTitle="前端React组件库"
                  targetRef={reportContainerRef}
                  includeComments={true}
                  includeCollaborators={false}
                />
                <button type="button" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  升级到企业版
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
                此报告分析了前端React组件库，发现了8个问题，包括2个严重问题、4个中等问题和2个轻微问题。
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">65%</span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                代码质量评分：一般
              </p>
            </div>

            {/* 可视化图表 */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  问题分布
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4 text-center">按严重程度</h4>
                  <div className="h-64 flex items-center justify-center">
                    {/* 这里将来会放置实际的图表，现在用占位符 */}
                    <div className="flex items-end h-48 space-x-6">
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-red-500 rounded-t-md" style={{ height: '60px' }}></div>
                        <span className="mt-2 text-xs text-gray-500 dark:text-gray-300">严重</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">2</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-yellow-500 rounded-t-md" style={{ height: '120px' }}></div>
                        <span className="mt-2 text-xs text-gray-500 dark:text-gray-300">中等</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">4</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '60px' }}></div>
                        <span className="mt-2 text-xs text-gray-500 dark:text-gray-300">轻微</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4 text-center">按问题类型</h4>
                  <div className="h-64 flex items-center justify-center">
                    {/* 这里将来会放置实际的图表，现在用占位符 */}
                    <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-600 relative overflow-hidden">
                      <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}>
                        <div className="w-full h-full bg-red-500"></div>
                      </div>
                      <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0 100%, 0 50%)' }}>
                        <div className="w-full h-full bg-yellow-500"></div>
                      </div>
                      <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}>
                        <div className="w-full h-full bg-blue-500"></div>
                      </div>
                      <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0)' }}>
                        <div className="w-full h-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 问题列表 */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  发现的问题
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                  按严重程度排序，包含修复建议
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
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">内存泄漏风险</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Modal组件在useEffect中添加了事件监听器，但没有在清理函数中移除，可能导致内存泄漏。
                      </p>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        <p>文件: <code>src/components/Modal.jsx</code> 行: 42-46</p>
                      </div>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">修复建议:</h5>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                          在useEffect中添加清理函数，确保在组件卸载时移除事件监听器:
                        </p>
                        <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                          <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                            <code>
{`useEffect(() => {
  window.addEventListener('keydown', handleEscapeKey);
  return () => {
    window.removeEventListener('keydown', handleEscapeKey);
  };
}, []);`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 中等问题 */}
                <li className="px-4 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-6.75 3.75h13.5a1.5 1.5 0 001.5-1.5V8.25a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v8.25a1.5 1.5 0 001.5 1.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">不必要的重渲染</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Table组件在数据未变化时进行不必要的重渲染，可能导致性能问题。
                      </p>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        <p>文件: <code>src/components/Table.jsx</code> 行: 87-95</p>
                      </div>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">修复建议:</h5>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                          使用React.memo或useMemo来避免不必要的重渲染:
                        </p>
                        <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                          <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                            <code>
{`// 使用React.memo包装组件
export default React.memo(Table, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* 升级提示 */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    升级到企业版获取更多功能，包括团队协作、交互式报告编辑和CI/CD集成。<Link href="/pricing" className="font-medium text-blue-700 dark:text-blue-100 underline hover:text-blue-600">了解更多</Link>
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
