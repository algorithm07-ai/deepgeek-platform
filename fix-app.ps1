# DeepGeek Application Fix Script
Write-Host "Starting DeepGeek application fix..." -ForegroundColor Green

# Set larger Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"
Write-Host "Set Node.js memory limit to 4GB" -ForegroundColor Cyan

# Clean project
Write-Host "Cleaning project..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Removed .next directory" -ForegroundColor Green
}
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "Removed node_modules directory" -ForegroundColor Green
}
npm cache clean --force
Write-Host "Cleaned npm cache" -ForegroundColor Green

# Check next.config.js file
$nextConfigPath = "next.config.js"
if (Test-Path $nextConfigPath) {
    Write-Host "Checking next.config.js file..." -ForegroundColor Yellow
    
    # Create simplified next.config.js
    $simpleConfig = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
'@
    
    Set-Content -Path $nextConfigPath -Value $simpleConfig
    Write-Host "Simplified next.config.js configuration" -ForegroundColor Green
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Try development mode
Write-Host "Starting application in development mode..." -ForegroundColor Yellow
Write-Host "Application will be available at: http://localhost:3000" -ForegroundColor Cyan
npm run dev
