# Docker配置脚本 - 解决镜像源问题
Write-Host "Configuring Docker registry settings..." -ForegroundColor Green

# 检查Docker是否已安装
try {
    $dockerVersion = docker --version
    Write-Host "Docker is installed: $dockerVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Docker is not installed or not accessible." -ForegroundColor Red
    exit 1
}

# 创建或更新Docker配置目录
$dockerConfigDir = "$env:USERPROFILE\.docker"
if (-not (Test-Path $dockerConfigDir)) {
    New-Item -ItemType Directory -Path $dockerConfigDir | Out-Null
    Write-Host "Created Docker config directory: $dockerConfigDir" -ForegroundColor Green
}

# 创建或更新Docker配置文件，使用官方镜像源
$configJson = @{
    "experimental" = "enabled"
    "registry-mirrors" = @(
        "https://registry-1.docker.io",
        "https://registry.hub.docker.com"
    )
} | ConvertTo-Json -Depth 10

$configPath = "$dockerConfigDir\config.json"
$configJson | Out-File -FilePath $configPath -Encoding utf8
Write-Host "Updated Docker config at: $configPath" -ForegroundColor Green
Write-Host "Docker now configured to use official Docker Hub registry" -ForegroundColor Green

# 重启Docker服务
Write-Host "Restarting Docker service..." -ForegroundColor Yellow
try {
    Restart-Service -Name "com.docker.service" -ErrorAction SilentlyContinue
    Write-Host "Docker service restarted successfully" -ForegroundColor Green
} catch {
    Write-Host "Could not restart Docker service automatically. Please restart Docker Desktop manually." -ForegroundColor Yellow
}

Write-Host "Configuration complete. Please restart Docker Desktop if it's still having issues." -ForegroundColor Green
Write-Host "After Docker restarts, run the deployment script again: .\deploy-en.ps1" -ForegroundColor Green
