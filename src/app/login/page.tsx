'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 处理邮箱登录
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('请输入邮箱和密码');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError('邮箱或密码错误');
        return;
      }
      
      if (result?.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('登录失败，请稍后重试');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理微信登录
  const handleWechatLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      await signIn('wechat', { callbackUrl: '/dashboard' });
    } catch (error) {
      setError('微信登录失败，请稍后重试');
      console.error('WeChat login error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录 DeepGeek 平台
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            或{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              注册新账号
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                邮箱地址
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                记住我
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                忘记密码?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? '登录中...' : '邮箱登录'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">或使用</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleWechatLogin}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.69,11.52c-0.59,0-1.08-0.49-1.08-1.08s0.49-1.08,1.08-1.08c0.59,0,1.08,0.49,1.08,1.08S9.29,11.52,8.69,11.52z M15.31,11.52c-0.59,0-1.08-0.49-1.08-1.08s0.49-1.08,1.08-1.08c0.59,0,1.08,0.49,1.08,1.08S15.9,11.52,15.31,11.52z M19.5,12.81c0-3.77-3.77-6.85-8.42-6.85S2.66,9.04,2.66,12.81c0,3.26,2.81,5.99,6.6,6.67c0.26,0.05,0.61,0.17,0.7,0.37c0.08,0.17,0.05,0.44,0.03,0.61c0,0-0.08,0.47-0.08,0.47c-0.03,0.17-0.14,0.67,0.58,0.37c0.73-0.31,3.94-2.32,5.38-3.97h0c0.99-1.08,1.63-2.55,1.63-4.17V12.81z M24,17.71c0-3.03-3.03-5.49-6.75-5.49c-3.73,0-6.75,2.46-6.75,5.49s3.03,5.49,6.75,5.49c0.79,0,1.54-0.12,2.24-0.32c0.59,0.32,1.58,1.05,1.72,1.13c0.58,0.24,0.49-0.16,0.46-0.3c0,0-0.06-0.38-0.06-0.38c-0.03-0.14-0.05-0.34,0.02-0.49c0.07-0.16,0.35-0.26,0.56-0.3C23.03,21.54,24,19.77,24,17.71L24,17.71z M13.64,16.92c-0.47,0-0.86-0.39-0.86-0.86c0-0.47,0.39-0.86,0.86-0.86s0.86,0.39,0.86,0.86C14.5,16.53,14.11,16.92,13.64,16.92z M18.86,16.92c-0.47,0-0.86-0.39-0.86-0.86c0-0.47,0.39-0.86,0.86-0.86s0.86,0.39,0.86,0.86C19.72,16.53,19.33,16.92,18.86,16.92z"/>
              </svg>
              微信登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
