import React, { useState, useEffect } from 'react';
import { ReportData, ReportIssue } from '@/types/index.d';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  type: 'type' | 'status' | 'language' | 'date' | 'severity';
}

interface ReportFilterProps {
  onFilterChange: (filters: any) => void;
  languages?: string[];
  reports?: ReportData[];
  onSearchChange?: (searchTerm: string) => void;
  showIssueFilters?: boolean;
  compact?: boolean;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ 
  onFilterChange, 
  languages = [], 
  reports = [], 
  onSearchChange,
  showIssueFilters = false,
  compact = false
}) => {
  const [activeType, setActiveType] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('');
  const [activeSeverity, setActiveSeverity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDateRange, setActiveDateRange] = useState<{start: Date | null, end: Date | null}>({
    start: null,
    end: null
  });
  const [isExpanded, setIsExpanded] = useState(!compact);
  
  // 从报告数据或传入的languages中提取可用的语言选项
  const availableLanguages = languages.length > 0 
    ? languages 
    : Array.from(new Set(reports.map(report => report.language)));
  
  // 当筛选条件变化时通知父组件
  useEffect(() => {
    onFilterChange({
      type: activeType,
      status: activeStatus,
      language: activeLanguage,
      severity: activeSeverity,
      dateRange: activeDateRange
    });
  }, [activeType, activeStatus, activeLanguage, activeSeverity, activeDateRange, onFilterChange]);

  // 当搜索词变化时通知父组件
  useEffect(() => {
    if (onSearchChange) {
      const delayDebounceFn = setTimeout(() => {
        onSearchChange(searchTerm);
      }, 300);
      
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, onSearchChange]);

  const handleClearFilters = () => {
    setActiveType('');
    setActiveStatus('');
    setActiveLanguage('');
    setActiveSeverity('');
    setActiveDateRange({ start: null, end: null });
    setSearchTerm('');
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (!value) {
      setActiveDateRange({
        ...activeDateRange,
        [type]: null
      });
      return;
    }
    
    const date = new Date(value);
    setActiveDateRange({
      ...activeDateRange,
      [type]: date
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">筛选报告</h3>
        {compact && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {/* 搜索框 */}
      <div className="mb-4">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="搜索报告标题、描述或问题..."
          />
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
            {/* 报告类型筛选 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">报告类型</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="type-all"
                    name="type"
                    type="radio"
                    checked={activeType === ''}
                    onChange={() => setActiveType('')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="type-all" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    全部
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="type-free"
                    name="type"
                    type="radio"
                    checked={activeType === 'free'}
                    onChange={() => setActiveType('free')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="type-free" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    免费版
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="type-pro"
                    name="type"
                    type="radio"
                    checked={activeType === 'pro'}
                    onChange={() => setActiveType('pro')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="type-pro" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    专业版
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="type-enterprise"
                    name="type"
                    type="radio"
                    checked={activeType === 'enterprise'}
                    onChange={() => setActiveType('enterprise')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="type-enterprise" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    企业版
                  </label>
                </div>
              </div>
            </div>
            
            {/* 报告状态筛选 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">报告状态</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="status-all"
                    name="status"
                    type="radio"
                    checked={activeStatus === ''}
                    onChange={() => setActiveStatus('')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="status-all" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    全部
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="status-completed"
                    name="status"
                    type="radio"
                    checked={activeStatus === 'completed'}
                    onChange={() => setActiveStatus('completed')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="status-completed" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    已完成
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="status-processing"
                    name="status"
                    type="radio"
                    checked={activeStatus === 'processing'}
                    onChange={() => setActiveStatus('processing')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="status-processing" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    处理中
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="status-failed"
                    name="status"
                    type="radio"
                    checked={activeStatus === 'failed'}
                    onChange={() => setActiveStatus('failed')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="status-failed" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    失败
                  </label>
                </div>
              </div>
            </div>
            
            {/* 编程语言筛选 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">编程语言</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="language-all"
                    name="language"
                    type="radio"
                    checked={activeLanguage === ''}
                    onChange={() => setActiveLanguage('')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="language-all" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    全部
                  </label>
                </div>
                {availableLanguages.map((lang) => (
                  <div key={lang} className="flex items-center">
                    <input
                      id={`language-${lang.toLowerCase()}`}
                      name="language"
                      type="radio"
                      checked={activeLanguage === lang}
                      onChange={() => setActiveLanguage(lang)}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor={`language-${lang.toLowerCase()}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 日期筛选 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">日期范围</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date-start" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  开始日期
                </label>
                <input
                  type="date"
                  id="date-start"
                  value={activeDateRange.start ? activeDateRange.start.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="date-end" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  结束日期
                </label>
                <input
                  type="date"
                  id="date-end"
                  value={activeDateRange.end ? activeDateRange.end.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          {/* 问题严重程度筛选，仅在showIssueFilters为true时显示 */}
          {showIssueFilters && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">问题严重程度</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="severity-all"
                    name="severity"
                    type="radio"
                    checked={activeSeverity === ''}
                    onChange={() => setActiveSeverity('')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="severity-all" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    全部
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="severity-critical"
                    name="severity"
                    type="radio"
                    checked={activeSeverity === 'critical'}
                    onChange={() => setActiveSeverity('critical')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="severity-critical" className="ml-2 flex items-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 mr-2">
                      严重
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">严重问题</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="severity-medium"
                    name="severity"
                    type="radio"
                    checked={activeSeverity === 'medium'}
                    onChange={() => setActiveSeverity('medium')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="severity-medium" className="ml-2 flex items-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 mr-2">
                      中等
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">中等问题</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="severity-low"
                    name="severity"
                    type="radio"
                    checked={activeSeverity === 'low'}
                    onChange={() => setActiveSeverity('low')}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="severity-low" className="ml-2 flex items-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-2">
                      轻微
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">轻微问题</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* 清除筛选按钮 */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              清除筛选条件
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilter;
