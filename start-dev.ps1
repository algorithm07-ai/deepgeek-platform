# DeepGeek Platform Start Script
Write-Host "Starting DeepGeek Platform in development mode..." -ForegroundColor Green

# Set Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"

# Start the application in development mode
Write-Host "Application will be available at: http://localhost:3000" -ForegroundColor Cyan
npm run dev
