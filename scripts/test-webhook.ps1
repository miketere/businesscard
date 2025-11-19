# Test Webhook Endpoint Script
# This script helps verify your webhook endpoint is accessible

Write-Host "Testing Webhook Endpoint..." -ForegroundColor Cyan
Write-Host ""

# Check if server is running
$serverRunning = Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet

if (-not $serverRunning) {
    Write-Host "ERROR: Server is not running on port 3000" -ForegroundColor Red
    Write-Host "Please start your Next.js server first: npm run dev" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Server is running on port 3000" -ForegroundColor Green
Write-Host ""

# Check if ngrok is running
$ngrokRunning = Get-Process -Name ngrok -ErrorAction SilentlyContinue

if (-not $ngrokRunning) {
    Write-Host "WARNING: ngrok is not running" -ForegroundColor Yellow
    Write-Host "To expose your local server, run: ngrok http 3000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Testing local endpoint..." -ForegroundColor Cyan
    $endpoint = "http://localhost:3000/api/subscriptions/webhook"
} else {
    Write-Host "✓ ngrok is running" -ForegroundColor Green
    Write-Host ""
    Write-Host "To get your ngrok URL:" -ForegroundColor Cyan
    Write-Host "1. Open http://localhost:4040 in your browser" -ForegroundColor White
    Write-Host "2. Copy the 'Forwarding' HTTPS URL" -ForegroundColor White
    Write-Host "3. Use: https://YOUR-URL.ngrok.io/api/subscriptions/webhook" -ForegroundColor White
    Write-Host ""
    $endpoint = "http://localhost:3000/api/subscriptions/webhook"
}

# Test the endpoint
Write-Host "Testing endpoint: $endpoint" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri $endpoint -Method POST -Body '{"test":true}' -ContentType "application/json" -ErrorAction Stop
    Write-Host "✓ Endpoint is accessible" -ForegroundColor Green
    Write-Host "Response Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "✗ Endpoint test failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Start ngrok: ngrok http 3000" -ForegroundColor White
Write-Host "2. Copy your ngrok HTTPS URL" -ForegroundColor White
Write-Host "3. Create webhook in PayMongo with URL: https://YOUR-URL.ngrok.io/api/subscriptions/webhook" -ForegroundColor White
Write-Host "4. Copy the webhook secret and add to .env file" -ForegroundColor White



