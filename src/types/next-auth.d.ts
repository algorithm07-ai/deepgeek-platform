import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * 扩展默认的Session类型
   */
  interface Session {
    user: {
      id: string;
      role?: 'free' | 'pro' | 'enterprise';
      subscriptionExpiry?: Date;
      wechatId?: string;
    } & DefaultSession['user'];
  }

  /**
   * 扩展默认的User类型
   */
  interface User {
    id: string;
    role?: 'free' | 'pro' | 'enterprise';
    subscriptionExpiry?: Date;
    wechatId?: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * 扩展默认的JWT类型
   */
  interface JWT {
    id: string;
    role?: 'free' | 'pro' | 'enterprise';
    subscriptionExpiry?: Date;
    wechatId?: string;
  }
}
