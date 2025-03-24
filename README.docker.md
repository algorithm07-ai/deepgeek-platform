# DeepGeek 平台 Docker 部署指南

本文档提供了使用 Docker 部署 DeepGeek 平台的详细说明，解决了 Node.js 版本兼容性问题，确保应用在任何环境中都能一致运行。

## 先决条件

- [Docker](https://www.docker.com/get-started) (版本 20.10.0 或更高)
- [Docker Compose](https://docs.docker.com/compose/install/) (版本 2.0.0 或更高)

## 部署步骤

### 1. 使用部署脚本（推荐）

我们提供了一个自动化部署脚本，可以简化整个过程：

```powershell
# 在 PowerShell 中运行
.\deploy.ps1
```

这个脚本会自动检查 Docker 环境，构建镜像并启动容器。

### 2. 手动部署

如果您想手动控制部署过程，可以按照以下步骤操作：

#### 构建 Docker 镜像

```bash
# 在项目根目录下运行
docker-compose build
```

#### 启动容器

```bash
docker-compose up -d
```

#### 查看容器状态

```bash
docker-compose ps
```

#### 查看应用日志

```bash
docker-compose logs -f
```

## 访问应用

部署成功后，您可以通过以下 URL 访问 DeepGeek 平台：

- **本地访问**: [http://localhost:3000](http://localhost:3000)

## 环境变量配置

Docker Compose 配置中已经包含了基本的环境变量设置。如果需要自定义，可以编辑 `docker-compose.yml` 文件中的 `environment` 部分：

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=http://localhost:3000/api
  - NEXT_PUBLIC_USE_MOCK_DATA=true
  # 添加其他环境变量...
```

## 故障排除

### 常见问题

1. **容器无法启动**
   - 检查 Docker 服务是否运行
   - 确保端口 3000 未被其他应用占用

2. **应用无法访问**
   - 检查容器日志: `docker-compose logs deepgeek`
   - 确认网络配置是否正确

3. **构建失败**
   - 确保 Dockerfile 和 docker-compose.yml 文件未被修改
   - 检查构建日志以获取详细错误信息

## 生产环境注意事项

在生产环境部署时，请考虑以下安全和性能优化措施：

1. 使用环境变量文件 (.env) 而不是硬编码敏感信息
2. 配置 HTTPS 以确保安全通信
3. 考虑使用 Docker Swarm 或 Kubernetes 进行容器编排
4. 实施监控和日志收集解决方案

## 更新应用

要更新应用到最新版本，请执行以下步骤：

```bash
# 拉取最新代码
git pull

# 重新构建并启动容器
docker-compose down
docker-compose build
docker-compose up -d
```
