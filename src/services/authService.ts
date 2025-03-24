// 认证服务
import { signIn, signOut, getSession } from 'next-auth/react';
import { LoginCredentials, DeepGeekUser } from '../types/auth';

/**
 * 邮箱登录
 * @param credentials 登录凭证
 * @returns 登录结果
 */
export const emailLogin = async (credentials: LoginCredentials): Promise<boolean> => {
  try {
    const response = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });
    
    return response?.ok || false;
  } catch (error) {
    console.error('Email login error:', error);
    return false;
  }
};

/**
 * 微信登录
 * @returns 登录结果
 */
export const wechatLogin = async (): Promise<boolean> => {
  try {
    const response = await signIn('wechat', {
      redirect: false,
    });
    
    return response?.ok || false;
  } catch (error) {
    console.error('WeChat login error:', error);
    return false;
  }
};

/**
 * 退出登录
 */
export const logout = async (): Promise<void> => {
  await signOut({ redirect: false });
};

/**
 * 获取当前用户
 * @returns 当前用户信息
 */
export const getCurrentUser = async (): Promise<DeepGeekUser | null> => {
  try {
    const session = await getSession();
    return session?.user as DeepGeekUser || null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * 检查用户是否已登录
 * @returns 是否已登录
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};

/**
 * 检查用户是否有权限访问特定订阅级别的功能
 * @param requiredRole 需要的角色级别
 * @returns 是否有权限
 */
export const hasPermission = async (requiredRole: 'free' | 'pro' | 'enterprise'): Promise<boolean> => {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // 免费用户可以访问免费功能
  if (requiredRole === 'free') return true;
  
  // 检查用户角色
  const userRole = user.role || 'free';
  
  // 企业版用户可以访问所有功能
  if (userRole === 'enterprise') return true;
  
  // 专业版用户可以访问专业版和免费版功能
  if (userRole === 'pro' && requiredRole !== 'enterprise') return true;
  
  return false;
};
