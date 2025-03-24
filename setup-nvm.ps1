# 使用nvm安装和配置Node.js 18.x
Write-Host "Setting up Node.js 18.x using NVM for Windows..." -ForegroundColor Green

# 检查是否已安装nvm
$nvmPath = "$env:APPDATA\nvm\nvm.exe"
$isNvmInstalled = Test-Path $nvmPath

if (-not $isNvmInstalled) {
    Write-Host "NVM for Windows is not installed. Please install it first:" -ForegroundColor Yellow
    Write-Host "1. Download NVM for Windows from: https://github.com/coreybutler/nvm-windows/releases" -ForegroundColor Cyan
    Write-Host "2. Run the installer and follow the instructions" -ForegroundColor Cyan
    Write-Host "3. Restart your terminal and run this script again" -ForegroundColor Cyan
    exit
}

# 使用nvm安装Node.js 18.17.0 (LTS版本)
Write-Host "Installing Node.js 18.17.0 using NVM..." -ForegroundColor Yellow
& $nvmPath install 18.17.0

# 切换到Node.js 18.17.0
Write-Host "Switching to Node.js 18.17.0..." -ForegroundColor Yellow
& $nvmPath use 18.17.0

# 验证Node.js版本
Write-Host "Verifying Node.js version..." -ForegroundColor Yellow
$nodeVersion = node -v
Write-Host "Current Node.js version: $nodeVersion" -ForegroundColor Green

# 清理项目
Write-Host "Cleaning project..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "Removed node_modules directory" -ForegroundColor Green
}
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Removed .next directory" -ForegroundColor Green
}

# 安装依赖
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# 构建项目
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

# 启动项目
Write-Host "Project setup complete!" -ForegroundColor Green
Write-Host "To start the application, run: npm start" -ForegroundColor Cyan
Write-Host "The application will be available at: http://localhost:3000" -ForegroundColor Cyan
