# DeepGeek Application Downgrade and Fix Script
Write-Host "Starting DeepGeek application downgrade and fix..." -ForegroundColor Green

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

# Backup package.json
Copy-Item -Path "package.json" -Destination "package.json.backup"
Write-Host "Backed up package.json to package.json.backup" -ForegroundColor Green

# Update package.json with compatible versions
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json

# Update dependencies to more compatible versions
$packageJson.dependencies.next = "^14.0.4"
$packageJson.dependencies.react = "^18.2.0"
$packageJson.dependencies."react-dom" = "^18.2.0"

# Update devDependencies
$packageJson.devDependencies."eslint-config-next" = "^14.0.4"
$packageJson.devDependencies."@next/bundle-analyzer" = "^14.0.4"

# Convert back to JSON and save
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
Write-Host "Updated package.json with compatible versions" -ForegroundColor Green

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

# Build project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (Test-Path ".next") {
    # Start application
    Write-Host "Build successful! Starting application..." -ForegroundColor Green
    Write-Host "Application will be available at: http://localhost:3000" -ForegroundColor Cyan
    npm run start
} else {
    # Try development mode
    Write-Host "Build failed, trying development mode..." -ForegroundColor Yellow
    Write-Host "Application will be available at: http://localhost:3000" -ForegroundColor Cyan
    npm run dev
}
