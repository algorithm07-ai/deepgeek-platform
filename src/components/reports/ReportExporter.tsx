import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReportExporterProps {
  reportId: string;
  reportTitle: string;
  targetRef: React.RefObject<HTMLElement>;
  includeComments?: boolean;
  includeCollaborators?: boolean;
  customFileName?: string;
}

const ReportExporter: React.FC<ReportExporterProps> = ({
  reportId,
  reportTitle,
  targetRef,
  includeComments = false,
  includeCollaborators = false,
  customFileName
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportError, setExportError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeComments,
    includeCollaborators,
    fileName: customFileName || `${reportTitle.replace(/\s+/g, '_')}_report`,
    paperSize: 'A4',
    orientation: 'portrait',
    quality: 2 // 导出质量，值越高质量越好但文件越大
  });

  const optionsRef = useRef<HTMLDivElement>(null);

  // 处理点击外部关闭选项面板
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const exportToPdf = async () => {
    if (!targetRef.current) {
      setExportError('导出目标不存在');
      return;
    }

    try {
      setIsExporting(true);
      setExportProgress(10);
      setExportError(null);

      // 获取目标元素
      const element = targetRef.current;
      
      // 创建一个临时容器来处理导出内容
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      document.body.appendChild(tempContainer);
      
      // 克隆目标元素到临时容器
      const clone = element.cloneNode(true) as HTMLElement;
      tempContainer.appendChild(clone);
      
      // 如果不包含评论，移除评论部分
      if (!exportOptions.includeComments) {
        const commentSections = clone.querySelectorAll('.comment-section');
        commentSections.forEach(section => section.remove());
      }
      
      // 如果不包含协作者，移除协作者部分
      if (!exportOptions.includeCollaborators) {
        const collaboratorSections = clone.querySelectorAll('.collaborator-section');
        collaboratorSections.forEach(section => section.remove());
      }
      
      setExportProgress(30);
      
      // 设置PDF文档尺寸和方向
      const orientation = exportOptions.orientation === 'landscape' ? 'l' : 'p';
      const unit = 'mm';
      const format = exportOptions.paperSize;
      
      // 创建PDF文档
      const pdf = new jsPDF(orientation, unit, format);
      
      // 设置PDF文档属性
      pdf.setProperties({
        title: reportTitle,
        subject: `DeepGeek Report: ${reportTitle}`,
        author: 'DeepGeek Platform',
        keywords: 'DeepGeek, Report, AI, Code Analysis',
        creator: 'DeepGeek Report Exporter'
      });
      
      setExportProgress(50);
      
      // 使用html2canvas将内容转换为图像
      const canvas = await html2canvas(clone, {
        scale: exportOptions.quality,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      setExportProgress(80);
      
      // 获取画布尺寸
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // 添加图像到PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      
      // 如果内容超过一页，添加更多页面
      let heightLeft = imgHeight;
      let position = 0;
      
      while (heightLeft > 0) {
        position = heightLeft - pdf.internal.pageSize.getHeight();
        if (position < 0) {
          break;
        }
        
        pdf.addPage();
        pdf.addImage(
          imgData, 
          'JPEG', 
          0, 
          -position, 
          imgWidth, 
          imgHeight
        );
        
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      setExportProgress(95);
      
      // 保存PDF文件
      pdf.save(`${exportOptions.fileName}.pdf`);
      
      // 清理临时容器
      document.body.removeChild(tempContainer);
      
      setExportProgress(100);
      
      // 显示成功消息
      alert('报告已成功导出为PDF文件！');
    } catch (error) {
      console.error('PDF导出失败:', error);
      setExportError('PDF导出失败，请重试');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportProgress(0), 1000);
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setExportOptions({
      ...exportOptions,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          disabled={isExporting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          导出报告
        </button>
        
        {isExporting && (
          <div className="flex items-center">
            <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700 mr-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${exportProgress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {exportProgress}%
            </span>
          </div>
        )}
      </div>
      
      {exportError && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-500">
          {exportError}
        </div>
      )}
      
      {showOptions && (
        <div 
          ref={optionsRef}
          className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 p-4 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">导出选项</h3>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="fileName" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                文件名
              </label>
              <input
                type="text"
                id="fileName"
                name="fileName"
                value={exportOptions.fileName}
                onChange={handleOptionChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="paperSize" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                纸张大小
              </label>
              <select
                id="paperSize"
                name="paperSize"
                value={exportOptions.paperSize}
                onChange={handleOptionChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="letter">信纸 (Letter)</option>
                <option value="legal">法律 (Legal)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="orientation" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                方向
              </label>
              <select
                id="orientation"
                name="orientation"
                value={exportOptions.orientation}
                onChange={handleOptionChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
              >
                <option value="portrait">纵向</option>
                <option value="landscape">横向</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="quality" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                质量
              </label>
              <select
                id="quality"
                name="quality"
                value={exportOptions.quality}
                onChange={handleOptionChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
              >
                <option value="1">普通</option>
                <option value="2">高</option>
                <option value="3">超高 (较大文件)</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="includeComments"
                name="includeComments"
                type="checkbox"
                checked={exportOptions.includeComments}
                onChange={handleOptionChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-700 rounded"
              />
              <label htmlFor="includeComments" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
                包含评论
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="includeCollaborators"
                name="includeCollaborators"
                type="checkbox"
                checked={exportOptions.includeCollaborators}
                onChange={handleOptionChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-700 rounded"
              />
              <label htmlFor="includeCollaborators" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
                包含协作者信息
              </label>
            </div>
            
            <div className="pt-2">
              <button
                onClick={exportToPdf}
                disabled={isExporting}
                className="w-full inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    导出中...
                  </>
                ) : '确认导出'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportExporter;
