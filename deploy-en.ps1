# DeepGeek Platform Docker Deployment Script
Write-Host "Starting DeepGeek Platform Docker Deployment..." -ForegroundColor Green

# Check if Docker is installed
try {
    $dockerVersion = docker --version
    Write-Host "Docker is installed: $dockerVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Docker is not installed or not accessible. Please install Docker before continuing." -ForegroundColor Red
    exit 1
}

# Check if docker-compose is installed
try {
    $composeVersion = docker-compose --version
    Write-Host "Docker Compose is installed: $composeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Docker Compose is not installed or not accessible. Please install Docker Compose before continuing." -ForegroundColor Red
    exit 1
}

# Build Docker image
Write-Host "Building Docker image..." -ForegroundColor Yellow
docker-compose build

# If build is successful, start container
if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker image built successfully, starting container..." -ForegroundColor Green
    docker-compose up -d
    
    # Check if container started successfully
    Start-Sleep -Seconds 5
    $containerStatus = docker-compose ps
    Write-Host "Container status:" -ForegroundColor Cyan
    Write-Host $containerStatus
    
    Write-Host "DeepGeek Platform has been successfully deployed!" -ForegroundColor Green
    Write-Host "You can access the application at http://localhost:3000" -ForegroundColor Green
} else {
    Write-Host "Docker image build failed, please check error messages." -ForegroundColor Red
}
