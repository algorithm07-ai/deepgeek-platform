// 认证相关类型定义
import { User } from 'next-auth';

// 扩展NextAuth的默认用户类型
export interface DeepGeekUser extends User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: 'free' | 'pro' | 'enterprise';
  subscriptionExpiry?: Date;
  wechatId?: string;
}

// 登录凭证类型
export interface LoginCredentials {
  email: string;
  password: string;
}

// 微信登录响应类型
export interface WechatLoginResponse {
  openid: string;
  nickname: string;
  headimgurl: string;
  unionid?: string;
}

// 认证状态类型
export interface AuthState {
  isAuthenticated: boolean;
  user: DeepGeekUser | null;
  loading: boolean;
  error: string | null;
}
