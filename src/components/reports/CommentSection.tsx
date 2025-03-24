import React, { useState, useEffect } from 'react';
import { User } from '@/types/index.d';

interface Comment {
  id: string;
  text: string;
  user: User;
  timestamp: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  reportId: string;
  initialComments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ reportId, initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 模拟当前用户
  const currentUser: User = {
    id: 'current-user',
    name: '当前用户',
    email: 'user@example.com',
    image: '',
    subscription: 'enterprise' // 添加必需的subscription字段
  };

  // 模拟从服务器加载评论
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 如果没有初始评论，生成一些模拟评论
        if (initialComments.length === 0) {
          const mockComments: Comment[] = [
            {
              id: '1',
              text: '这个报告很详细，但我认为我们应该优先处理那些SQL注入漏洞。',
              user: {
                id: 'user-1',
                name: '张工程师',
                email: 'zhang@example.com',
                image: '',
                subscription: 'enterprise'
              },
              timestamp: '2025-03-22 14:30:00',
              replies: [
                {
                  id: '1-1',
                  text: '同意，我已经开始修复这些问题了。',
                  user: {
                    id: 'user-2',
                    name: '李开发',
                    email: 'li@example.com',
                    image: '',
                    subscription: 'enterprise'
                  },
                  timestamp: '2025-03-22 15:45:00'
                }
              ]
            },
            {
              id: '2',
              text: '我们需要为这些问题创建JIRA工单，并分配给相应的团队成员。',
              user: {
                id: 'user-3',
                name: '王项目经理',
                email: 'wang@example.com',
                image: '',
                subscription: 'enterprise'
              },
              timestamp: '2025-03-23 09:15:00'
            }
          ];
          setComments(mockComments);
        }
      } catch (error) {
        console.error('加载评论失败:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, [initialComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment,
        user: currentUser,
        timestamp: new Date().toLocaleString('zh-CN')
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      
      // 在实际应用中，这里会发送请求到服务器保存评论
      console.log('保存评论到服务器:', comment);
    } catch (error) {
      console.error('添加评论失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddReply = async (parentId: string) => {
    if (!replyText.trim()) return;
    
    setIsLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const reply: Comment = {
        id: `${parentId}-${Date.now()}`,
        text: replyText,
        user: currentUser,
        timestamp: new Date().toLocaleString('zh-CN')
      };
      
      // 更新评论树
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
      setReplyText('');
      setReplyingTo(null);
      
      // 在实际应用中，这里会发送请求到服务器保存回复
      console.log('保存回复到服务器:', reply);
    } catch (error) {
      console.error('添加回复失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('确定要删除这条评论吗？')) return;
    
    setIsLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 找到并删除评论
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      
      setComments(updatedComments);
      
      // 在实际应用中，这里会发送请求到服务器删除评论
      console.log('从服务器删除评论:', commentId);
    } catch (error) {
      console.error('删除评论失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 渲染单个评论及其回复
  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {comment.user.image ? (
            <img className="h-10 w-10 rounded-full" src={comment.user.image} alt={comment.user.name} />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
              <span>{comment.user.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {comment.user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {comment.timestamp}
            </p>
          </div>
          <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {comment.text}
          </div>
          <div className="mt-2 flex space-x-4">
            <button
              type="button"
              onClick={() => setReplyingTo(comment.id)}
              className="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              回复
            </button>
            {comment.user.id === currentUser.id && (
              <button
                type="button"
                onClick={() => handleDeleteComment(comment.id)}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                删除
              </button>
            )}
          </div>
          
          {/* 回复表单 */}
          {replyingTo === comment.id && (
            <div className="mt-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {currentUser.image ? (
                    <img className="h-8 w-8 rounded-full" src={currentUser.image} alt={currentUser.name} />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                      <span>{currentUser.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <textarea
                    rows={2}
                    name="reply"
                    id={`reply-${comment.id}`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                    placeholder="添加回复..."
                  />
                  <div className="mt-2 flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyText.trim() || isLoading}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? '提交中...' : '提交回复'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 回复列表 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
              {comment.replies.map(reply => (
                <div key={reply.id} className="py-2">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      {reply.user.image ? (
                        <img className="h-8 w-8 rounded-full" src={reply.user.image} alt={reply.user.name} />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                          <span>{reply.user.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {reply.user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {reply.timestamp}
                        </p>
                      </div>
                      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {reply.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">团队讨论</h3>
      
      {/* 评论列表 */}
      <div className="space-y-2">
        {isLoading && comments.length === 0 ? (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            正在加载评论...
          </div>
        ) : comments.length > 0 ? (
          comments.map(renderComment)
        ) : (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            暂无评论，成为第一个发表评论的人吧！
          </div>
        )}
      </div>
      
      {/* 添加新评论 */}
      <div className="mt-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {currentUser.image ? (
              <img className="h-10 w-10 rounded-full" src={currentUser.image} alt={currentUser.name} />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                <span>{currentUser.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <textarea
              rows={3}
              name="comment"
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
              placeholder="添加评论..."
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                评论将对所有有权访问此报告的团队成员可见
              </p>
              <button
                type="button"
                onClick={handleAddComment}
                disabled={!newComment.trim() || isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '提交中...' : '提交评论'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
