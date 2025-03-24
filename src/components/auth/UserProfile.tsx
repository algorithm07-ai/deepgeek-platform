'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { DeepGeekUser } from '@/types/auth';
import Image from 'next/image';

/**
 * 用户个人资料组件
 * 显示用户信息和订阅状态
 */
export default function UserProfile() {
  const { data: session, update } = useSession();
  const user = session?.user as DeepGeekUser | undefined;
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // 获取用户订阅级别显示文本
  const getUserRoleText = () => {
    if (!user?.role) return '免费版';
    
    switch (user.role) {
      case 'pro':
        return '专业版';
      case 'enterprise':
        return '企业版';
      default:
        return '免费版';
    }
  };
  
  // 获取订阅到期日期显示文本
  const getSubscriptionExpiryText = () => {
    if (!user?.subscriptionExpiry) return '永久有效';
    
    const expiryDate = new Date(user.subscriptionExpiry);
    return expiryDate.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // 处理保存个人资料
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      // 在实际应用中，这里应该调用API更新用户信息
      // 目前仅模拟更新成功
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 更新session中的用户信息
      await update({
        ...session,
        user: {
          ...user,
          name,
        },
      });
      
      setMessage('个人资料已更新');
      setIsEditing(false);
      
      // 3秒后清除消息
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Update profile error:', error);
      setMessage('更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="text-gray-500">未登录</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-20 w-20 relative">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || '用户头像'}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-bold">
                {user.name?.charAt(0) || '?'}
              </div>
            )}
          </div>
          
          <div className="ml-6 flex-1">
            {isEditing ? (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled={loading}
                />
              </div>
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            )}
            
            <p className="text-gray-500">{user.email}</p>
            
            {message && (
              <div className={`mt-2 text-sm ${message.includes('失败') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </div>
            )}
          </div>
          
          <div>
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? '保存中...' : '保存'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setName(user.name || '');
                  }}
                  disabled={loading}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  取消
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                编辑资料
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">当前订阅</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{getUserRoleText()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">订阅到期日期</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{getSubscriptionExpiryText()}</p>
            </div>
            
            {user.role === 'free' && (
              <div className="sm:col-span-2">
                <a
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  升级订阅
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
