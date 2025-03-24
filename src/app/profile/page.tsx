'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserProfile from '@/components/auth/UserProfile';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // 如果用户未登录，重定向到登录页
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profile');
    }
  }, [status, router]);
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">个人资料</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <UserProfile />
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">账号安全</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">密码</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-900">上次更新: 从未</p>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      修改密码
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">双因素认证</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-900">状态: 未启用</p>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      启用
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">关联账号</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">微信</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-900">状态: 未关联</p>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      关联微信
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">GitHub</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-900">状态: 未关联</p>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      关联GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">账号管理</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">数据导出</h3>
                <div className="mt-1">
                  <p className="text-sm text-gray-500 mb-2">
                    您可以导出您的所有数据，包括个人信息和使用记录。
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    导出数据
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-red-500">删除账号</h3>
                <div className="mt-1">
                  <p className="text-sm text-gray-500 mb-2">
                    删除账号将永久移除您的所有数据，此操作不可逆。
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    删除账号
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
