import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

// 模拟用户数据库 - 实际项目中应连接到真实数据库
const users = [
  {
    id: '1',
    name: '测试用户',
    email: 'test@example.com',
    password: 'password123', // 实际项目中应使用加密密码
    role: 'free',
  },
  {
    id: '2',
    name: '专业用户',
    email: 'pro@example.com',
    password: 'password123',
    role: 'pro',
    subscriptionExpiry: new Date('2026-01-01'),
  },
];

// NextAuth配置
export const authOptions: NextAuthOptions = {
  providers: [
    // 邮箱登录
    CredentialsProvider({
      id: 'credentials',
      name: '邮箱登录',
      credentials: {
        email: { label: '邮箱', type: 'email' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 在实际应用中，这里应该查询数据库
        const user = users.find(user => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          // 返回不包含密码的用户信息
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),
    
    // 微信登录 - 需要在微信开放平台注册应用并获取appid和secret
    {
      id: 'wechat',
      name: '微信登录',
      type: 'oauth',
      wellKnown: 'https://open.weixin.qq.com/connect/qrconnect',
      authorization: {
        url: 'https://open.weixin.qq.com/connect/qrconnect',
        params: {
          appid: process.env.WECHAT_CLIENT_ID || '',
          redirect_uri: process.env.WECHAT_REDIRECT_URI || '',
          response_type: 'code',
          scope: 'snsapi_login',
        },
      },
      token: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      userinfo: 'https://api.weixin.qq.com/sns/userinfo',
      clientId: process.env.WECHAT_CLIENT_ID,
      clientSecret: process.env.WECHAT_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.unionid || profile.openid,
          name: profile.nickname,
          email: `${profile.openid}@wechat.user`, // 微信没有提供邮箱，创建一个虚拟邮箱
          image: profile.headimgurl,
          wechatId: profile.openid,
          role: 'free', // 默认为免费用户，可以在用户首次登录后更新
        };
      },
    },
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // 首次登录时，将用户信息添加到token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.subscriptionExpiry = user.subscriptionExpiry;
        token.wechatId = user.wechatId;
      }
      return token;
    },
    async session({ session, token }) {
      // 将token中的信息添加到session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'free' | 'pro' | 'enterprise';
        session.user.subscriptionExpiry = token.subscriptionExpiry as Date;
        session.user.wechatId = token.wechatId as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  debug: process.env.NODE_ENV === 'development',
};

// 创建NextAuth处理程序
const handler = NextAuth(authOptions);

// 导出处理程序
export { handler as GET, handler as POST };
