'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { DeepGeekUser } from '@/types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'free' | 'pro' | 'enterprise';
}

/**
 * 受保护路由组件
 * 确保只有已登录用户才能访问某些页面
 * 可以指定需要的角色级别
 */
export default function ProtectedRoute({ 
  children, 
  requiredRole = 'free' 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // 如果用户未登录，重定向到登录页
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    
    // 如果用户已登录但没有所需角色，重定向到升级页面
    if (status === 'authenticated' && requiredRole !== 'free') {
      const user = session?.user as DeepGeekUser | undefined;
      const userRole = user?.role || 'free';
      
      // 企业版用户可以访问所有功能
      if (userRole === 'enterprise') return;
      
      // 专业版用户可以访问专业版和免费版功能
      if (userRole === 'pro' && requiredRole !== 'enterprise') return;
      
      // 其他情况重定向到升级页面
      router.push('/pricing?upgrade=true');
    }
  }, [status, session, router, pathname, requiredRole]);
  
  // 如果正在加载或未认证，显示加载状态
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // 如果已认证但没有所需角色，显示加载状态（等待重定向）
  if (status === 'authenticated' && requiredRole !== 'free') {
    const user = session?.user as DeepGeekUser | undefined;
    const userRole = user?.role || 'free';
    
    if (
      (requiredRole === 'enterprise' && userRole !== 'enterprise') ||
      (requiredRole === 'pro' && userRole !== 'pro' && userRole !== 'enterprise')
    ) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  }
  
  // 如果已认证且有所需角色，显示子组件
  return <>{children}</>;
}
