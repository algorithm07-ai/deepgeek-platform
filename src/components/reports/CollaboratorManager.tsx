import React, { useState, useEffect } from 'react';
import { User } from '@/types/index.d';

interface CollaboratorManagerProps {
  reportId: string;
  initialCollaborators: string[] | User[];
  onAddCollaborator: (email: string) => void;
  onRemoveCollaborator: (userId: string) => void;
}

const CollaboratorManager: React.FC<CollaboratorManagerProps> = ({
  reportId,
  initialCollaborators,
  onAddCollaborator,
  onRemoveCollaborator
}) => {
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  // 处理初始协作者数据，将字符串数组转换为User数组
  useEffect(() => {
    if (initialCollaborators.length > 0) {
      // 检查是否为字符串数组
      if (typeof initialCollaborators[0] === 'string') {
        // 将字符串数组转换为User数组
        const userCollaborators = (initialCollaborators as string[]).map(email => ({
          id: `user-${email.replace(/[^a-zA-Z0-9]/g, '')}`,
          name: email.split('@')[0],
          email: email,
          image: '',
          subscription: 'enterprise' as const
        }));
        setCollaborators(userCollaborators);
      } else {
        // 已经是User数组
        setCollaborators(initialCollaborators as User[]);
      }
    }
  }, [initialCollaborators]);

  // 模拟搜索用户
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const mockUsers: User[] = [
        {
          id: 'user-zhang',
          name: '张工程师',
          email: 'zhang@example.com',
          image: '',
          subscription: 'enterprise'
        },
        {
          id: 'user-li',
          name: '李开发',
          email: 'li@example.com',
          image: '',
          subscription: 'enterprise'
        },
        {
          id: 'user-wang',
          name: '王项目经理',
          email: 'wang@example.com',
          image: '',
          subscription: 'enterprise'
        },
        {
          id: 'user-zhao',
          name: '赵测试',
          email: 'zhao@example.com',
          image: '',
          subscription: 'enterprise'
        }
      ];
      
      const filtered = mockUsers.filter(user => 
        user.name.includes(searchTerm) || 
        user.email.includes(searchTerm)
      );
      
      setSuggestedUsers(filtered);
    } else {
      setSuggestedUsers([]);
    }
  }, [searchTerm]);

  const handleAddCollaborator = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('请输入有效的电子邮件地址');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 检查是否已经是协作者
      const isExistingCollaborator = collaborators.some(user => user.email === email);
      if (isExistingCollaborator) {
        setError('此用户已经是协作者');
        return;
      }
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 模拟添加新协作者
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        image: '',
        subscription: 'enterprise'
      };
      
      setCollaborators([...collaborators, newUser]);
      setEmail('');
      setIsModalOpen(false);
      
      // 调用父组件的回调
      onAddCollaborator(email);
      
      // 在实际应用中，这里会发送请求到服务器添加协作者
      console.log('添加协作者:', email);
    } catch (err) {
      setError('添加协作者失败，请重试');
      console.error('添加协作者失败:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCollaborator = async (userId: string) => {
    if (!window.confirm('确定要移除此协作者吗？')) return;
    
    setIsLoading(true);
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 从本地状态中移除协作者
      const updatedCollaborators = collaborators.filter(user => user.id !== userId);
      setCollaborators(updatedCollaborators);
      
      // 调用父组件的回调
      onRemoveCollaborator(userId);
      
      // 在实际应用中，这里会发送请求到服务器移除协作者
      console.log('移除协作者:', userId);
    } catch (err) {
      console.error('移除协作者失败:', err);
      alert('移除协作者失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestedUser = (user: User) => {
    setEmail(user.email);
    setSuggestedUsers([]);
    setSearchTerm('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">协作者</h3>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          添加协作者
        </button>
      </div>
      
      {/* 协作者列表 */}
      <div className="space-y-3">
        {collaborators.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">暂无协作者</p>
        ) : (
          collaborators.map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {user.image ? (
                    <img className="h-8 w-8 rounded-full" src={user.image} alt={user.name} />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                      <span>{user.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCollaborator(user.id)}
                disabled={isLoading}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* 添加协作者模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      添加协作者
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        输入电子邮件地址邀请协作者加入此报告。
                      </p>
                      <div className="mt-4 relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setSearchTerm(e.target.value);
                            setError(null);
                          }}
                          className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : ''}`}
                          placeholder="example@company.com"
                        />
                        {error && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
                        )}
                        
                        {/* 用户搜索建议 */}
                        {suggestedUsers.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {suggestedUsers.map(user => (
                              <div
                                key={user.id}
                                onClick={() => handleSelectSuggestedUser(user)}
                                className="cursor-pointer select-none relative py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    {user.image ? (
                                      <img className="h-6 w-6 rounded-full" src={user.image} alt={user.name} />
                                    ) : (
                                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                                        <span>{user.name.charAt(0)}</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddCollaborator}
                  disabled={isLoading || !email.trim()}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '添加中...' : '添加'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorManager;
