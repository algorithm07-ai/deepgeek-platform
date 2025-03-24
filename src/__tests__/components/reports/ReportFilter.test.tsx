import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReportFilter from '@/components/reports/ReportFilter';

describe('ReportFilter Component', () => {
  const mockOnFilterChange = jest.fn();
  const defaultProps = {
    onFilterChange: mockOnFilterChange,
    severityFilter: [],
    fileFilter: '',
    searchTerm: '',
  };

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  test('renders correctly with default props', () => {
    render(<ReportFilter {...defaultProps} />);
    
    // 检查标题是否存在
    expect(screen.getByText('过滤选项')).toBeInTheDocument();
    
    // 检查严重性选择框是否存在
    expect(screen.getByText('严重性')).toBeInTheDocument();
    
    // 检查文件过滤器是否存在
    expect(screen.getByText('文件')).toBeInTheDocument();
    
    // 检查搜索框是否存在
    expect(screen.getByPlaceholderText('搜索问题...')).toBeInTheDocument();
  });

  test('calls onFilterChange when severity filter changes', () => {
    render(<ReportFilter {...defaultProps} />);
    
    // 点击严重性复选框
    fireEvent.click(screen.getByLabelText('严重'));
    
    // 验证回调函数是否被调用
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      severityFilter: ['critical'],
      fileFilter: '',
      searchTerm: '',
    });
  });

  test('calls onFilterChange when file filter changes', () => {
    render(<ReportFilter {...defaultProps} />);
    
    // 输入文件名
    const fileInput = screen.getByPlaceholderText('输入文件名...');
    fireEvent.change(fileInput, { target: { value: 'test.js' } });
    
    // 验证回调函数是否被调用
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      severityFilter: [],
      fileFilter: 'test.js',
      searchTerm: '',
    });
  });

  test('calls onFilterChange when search term changes', () => {
    render(<ReportFilter {...defaultProps} />);
    
    // 输入搜索词
    const searchInput = screen.getByPlaceholderText('搜索问题...');
    fireEvent.change(searchInput, { target: { value: 'memory leak' } });
    
    // 验证回调函数是否被调用
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      severityFilter: [],
      fileFilter: '',
      searchTerm: 'memory leak',
    });
  });
});
