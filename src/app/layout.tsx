import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: 'DeepGeek 平台',
  description: '代码分析和报告平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
