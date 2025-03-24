# DeepGeek GitHub与Vercel部署完整指南

本文档提供了从创建GitHub仓库到部署DeepGeek平台到Vercel的完整步骤。

## 1. 创建GitHub仓库

1. 访问[GitHub](https://github.com)并登录您的账户
2. 点击右上角的"+"图标，然后选择"New repository"
3. 填写仓库信息：
   - 仓库名称：`deepgeek-platform`（或您喜欢的名称）
   - 描述：`DeepGeek平台 - 代码分析和报告平台`
   - 可见性：根据需要选择"Public"或"Private"
   - **重要**：不要初始化仓库（不要添加README、.gitignore或许可证）
4. 点击"Create repository"

## 2. 推送本地代码到GitHub

您可以使用我们提供的`setup-github-repo.bat`脚本来初始化本地仓库，或者手动执行以下步骤：

### 使用脚本（推荐）

1. 运行`setup-github-repo.bat`脚本
2. 按照脚本提示操作
3. 创建GitHub仓库后，执行脚本最后提示的`git push -u origin main`命令

### 手动设置

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "初始提交: DeepGeek平台"

# 添加GitHub远程仓库
git remote add origin https://github.com/您的用户名/deepgeek-platform.git

# 推送到GitHub
git push -u origin main
```

## 3. 设置GitHub Secrets

为了使GitHub Actions工作流能够部署到Vercel，您需要在GitHub仓库中添加以下密钥：

1. 在GitHub仓库页面，点击"Settings"
2. 在左侧菜单中，点击"Secrets and variables" > "Actions"
3. 点击"New repository secret"
4. 添加以下密钥：

| 名称 | 描述 | 如何获取 |
|------|------|----------|
| `VERCEL_TOKEN` | Vercel API令牌 | Vercel账户设置 > Tokens > 创建新令牌 |
| `VERCEL_ORG_ID` | Vercel组织ID | Vercel项目设置 > General > "org_id" |
| `VERCEL_PROJECT_ID` | Vercel项目ID | Vercel项目设置 > General > "project_id" |
| `NEXTAUTH_SECRET` | NextAuth密钥 | 生成随机字符串，例如`openssl rand -base64 32` |
| `WECHAT_CLIENT_ID` | 微信开发者ID | 微信开发者平台 |
| `WECHAT_CLIENT_SECRET` | 微信开发者密钥 | 微信开发者平台 |

## 4. 在Vercel上创建项目

1. 访问[Vercel](https://vercel.com)并登录
2. 点击"Add New..." > "Project"
3. 导入您刚刚创建的GitHub仓库
4. 配置项目：
   - 框架预设：选择"Next.js"
   - 根目录：保持默认（如果您的Next.js应用在根目录）
   - 构建命令：`npm run build`（已在vercel.json中配置）
   - 输出目录：`.next`（已在vercel.json中配置）
5. 环境变量：添加与GitHub Secrets相同的环境变量
6. 点击"Deploy"

## 5. 获取Vercel项目信息

部署后，您需要获取Vercel项目信息以配置GitHub Actions：

1. 在Vercel仪表板中，进入您的项目
2. 点击"Settings" > "General"
3. 记录以下信息：
   - `org_id`（用于`VERCEL_ORG_ID`）
   - `project_id`（用于`VERCEL_PROJECT_ID`）

## 6. 验证GitHub Actions工作流

1. 在GitHub仓库页面，点击"Actions"选项卡
2. 您应该能看到"Deploy to Vercel"工作流
3. 如果工作流尚未运行，您可以：
   - 对仓库进行小的更改并推送
   - 手动触发工作流

## 7. 自定义域名设置（可选）

如果您想使用自定义域名而不是Vercel提供的默认域名：

1. 在Vercel项目设置中，导航到"Domains"
2. 添加您的自定义域名
3. 按照Vercel提供的说明配置DNS记录
4. 更新环境变量中的URL（如`NEXTAUTH_URL`）

## 8. 持续集成/持续部署

设置完成后，您的工作流程将是：

1. 开发新功能或修复bug
2. 提交并推送到GitHub
3. GitHub Actions自动构建并部署到Vercel
4. 对于Pull Request，会创建预览部署

## 9. 监控与维护

1. 使用Vercel仪表板监控应用性能
2. 查看GitHub Actions工作流运行日志
3. 定期更新依赖项以保持安全性

## 故障排除

### GitHub Actions失败

1. 检查GitHub Actions日志以查找错误
2. 验证所有Secrets是否正确设置
3. 确保工作流YAML文件语法正确

### Vercel部署失败

1. 检查Vercel部署日志
2. 验证环境变量是否正确设置
3. 确保项目能在本地正确构建

## 注意事项

- 保持敏感信息（如API密钥）安全，只通过Secrets和环境变量传递
- 定期备份重要数据
- 遵循Git最佳实践，使用有意义的提交消息
- 保持前端页面设计不变，特别是主页右侧中部的8种语言按钮设计
