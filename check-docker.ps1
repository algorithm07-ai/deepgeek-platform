# Check Docker Status Script
Write-Host "Checking Docker status..." -ForegroundColor Cyan

# Check Docker Desktop service
$dockerService = Get-Service -Name "com.docker.service" -ErrorAction SilentlyContinue
if ($dockerService) {
    Write-Host "Docker Desktop service status: $($dockerService.Status)" -ForegroundColor Green
    
    if ($dockerService.Status -ne "Running") {
        Write-Host "Docker Desktop service is not running. Attempting to start..." -ForegroundColor Yellow
        Start-Service -Name "com.docker.service"
        Start-Sleep -Seconds 10
        $dockerService = Get-Service -Name "com.docker.service"
        Write-Host "Docker Desktop service status now: $($dockerService.Status)" -ForegroundColor Green
    }
} else {
    Write-Host "Docker Desktop service not found. Please make sure Docker Desktop is installed correctly." -ForegroundColor Red
}

# Test Docker connection
Write-Host "Testing Docker connection..." -ForegroundColor Cyan
try {
    $dockerInfo = docker info
    Write-Host "Docker connection successful!" -ForegroundColor Green
    Write-Host "You can now run the deployment script: .\deploy-en.ps1" -ForegroundColor Green
} catch {
    Write-Host "Docker connection failed. Please make sure Docker Desktop is running." -ForegroundColor Red
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Open Docker Desktop application" -ForegroundColor Yellow
    Write-Host "2. Check for any error messages in Docker Desktop" -ForegroundColor Yellow
    Write-Host "3. Restart Docker Desktop" -ForegroundColor Yellow
    Write-Host "4. Restart your computer" -ForegroundColor Yellow
}
