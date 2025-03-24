# DeepGeek平台Docker部署脚本
Write-Host "开始DeepGeek平台Docker部署..." -ForegroundColor Green

# 检查Docker是否安装
try {
    $dockerVersion = docker --version
    Write-Host "Docker已安装: $dockerVersion" -ForegroundColor Cyan
} catch {
    Write-Host "错误: Docker未安装或无法访问。请安装Docker后再继续。" -ForegroundColor Red
    exit 1
}

# 检查docker-compose是否安装
try {
    $composeVersion = docker-compose --version
    Write-Host "Docker Compose已安装: $composeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "错误: Docker Compose未安装或无法访问。请安装Docker Compose后再继续。" -ForegroundColor Red
    exit 1
}

# 构建Docker镜像
Write-Host "构建Docker镜像..." -ForegroundColor Yellow
docker-compose build

# 如果构建成功，启动容器
if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker镜像构建成功，正在启动容器..." -ForegroundColor Green
    docker-compose up -d
    
    # 检查容器是否成功启动
    Start-Sleep -Seconds 5
    $containerStatus = docker-compose ps
    Write-Host "容器状态:" -ForegroundColor Cyan
    Write-Host $containerStatus
    
    Write-Host "DeepGeek平台已成功部署!" -ForegroundColor Green
    Write-Host "您可以通过访问 http://localhost:3000 来查看应用。" -ForegroundColor Green
} else {
    Write-Host "Docker镜像构建失败，请检查错误信息。" -ForegroundColor Red
}
