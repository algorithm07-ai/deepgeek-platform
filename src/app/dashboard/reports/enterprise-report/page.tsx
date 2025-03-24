'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EnterpriseReportIndex() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到ID为3的企业报告
    router.push('/dashboard/reports/enterprise-report/3');
  }, [router]);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4">正在加载企业报告...</p>
    </div>
  );
}
