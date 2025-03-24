# DeepGeek Vercel 部署指南

本文档提供了将 DeepGeek 平台部署到 Vercel 的详细步骤和最佳实践。

## 前置条件

1. [Vercel 账号](https://vercel.com/signup)
2. [GitHub 账号](https://github.com/signup)（用于代码仓库托管）
3. 微信开发者账号（用于微信登录功能）

## 部署步骤

### 1. 准备代码仓库

1. 将 DeepGeek 代码推送到 GitHub 仓库
2. 确保仓库中包含以下配置文件：
   - `vercel.json`
   - `.env.production`（注意不要包含敏感信息）

### 2. 连接 Vercel 与 GitHub

1. 登录 [Vercel 控制台](https://vercel.com/)
2. 点击 "New Project"
3. 导入 GitHub 仓库
4. 选择 DeepGeek 仓库

### 3. 配置部署设置

1. 框架预设：选择 "Next.js"
2. 构建命令：`npm run build`（已在 vercel.json 中配置）
3. 输出目录：`.next`（已在 vercel.json 中配置）
4. 环境变量：点击 "Environment Variables" 添加以下变量
   - `NEXTAUTH_SECRET`：生成一个安全的随机字符串
   - `NEXTAUTH_URL`：设置为 Vercel 分配的域名，如 `https://deepgeek.vercel.app`
   - `WECHAT_CLIENT_ID`：微信开发者 ID
   - `WECHAT_CLIENT_SECRET`：微信开发者密钥
   - 其他必要的环境变量（参考 `.env.example`）

### 4. 部署选项

1. 部署区域：选择 "Hong Kong (hkg1)"（已在 vercel.json 中配置）
2. 构建缓存：启用
3. 自动部署：根据团队需求配置（建议启用）

### 5. 点击部署

点击 "Deploy" 按钮开始部署过程。部署完成后，Vercel 会提供一个预览 URL。

## 自定义域名设置

如果需要使用自定义域名（如 deepgeek.com）而不是 Vercel 提供的默认域名：

1. 在 Vercel 项目设置中，导航到 "Domains" 选项卡
2. 添加您的自定义域名
3. 按照 Vercel 提供的说明配置 DNS 记录
4. 完成后，更新以下环境变量：
   - `NEXTAUTH_URL`：更新为自定义域名
   - `WECHAT_REDIRECT_URI`：更新为使用自定义域名的回调 URL

## 环境变量更新

如果需要更新环境变量：

1. 导航到 Vercel 项目设置
2. 点击 "Environment Variables" 选项卡
3. 添加、编辑或删除环境变量
4. 重新部署应用以应用更改

## 部署预览和分支

Vercel 为每个 PR 和分支提供自动预览部署：

1. 当创建 PR 时，Vercel 会自动创建预览部署
2. 预览 URL 会在 PR 评论中提供
3. 合并到主分支后，更改会自动部署到生产环境

## 监控和日志

1. 使用 Vercel 仪表板监控应用性能
2. 查看部署日志以排查问题
3. 设置通知以接收部署状态更新

## 回滚部署

如果需要回滚到之前的版本：

1. 导航到 Vercel 项目的 "Deployments" 选项卡
2. 找到要回滚到的部署版本
3. 点击 "..." 菜单，然后选择 "Promote to Production"

## 最佳实践

1. 使用环境变量存储所有敏感信息
2. 定期更新 `NEXTAUTH_SECRET` 以提高安全性
3. 在合并到主分支前，始终在预览环境中测试更改
4. 使用 Vercel 的分析功能监控应用性能
5. 配置自动备份以防数据丢失

## 故障排除

### 部署失败

1. 检查构建日志以查找错误
2. 确保所有必要的环境变量都已正确设置
3. 验证 `vercel.json` 配置是否正确

### 认证问题

1. 确保 `NEXTAUTH_URL` 与实际部署 URL 匹配
2. 验证 `NEXTAUTH_SECRET` 是否正确设置
3. 检查微信登录配置是否正确

### 性能问题

1. 启用 Vercel 的自动图像优化
2. 配置适当的缓存策略
3. 使用 Vercel 的边缘网络提高全球访问速度
