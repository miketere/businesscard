# Get Ngrok URL Script
Write-Host "Getting ngrok URL..." -ForegroundColor Cyan
Write-Host ""

Start-Sleep -Seconds 2

try {
    $response = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get -ErrorAction Stop
    $httpsUrl = $response.tunnels | Where-Object { $_.proto -eq "https" } | Select-Object -First 1 -ExpandProperty public_url
    
    if ($httpsUrl) {
        Write-Host "✓ Ngrok is running!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your ngrok HTTPS URL:" -ForegroundColor Yellow
        Write-Host $httpsUrl -ForegroundColor White -BackgroundColor DarkGreen
        Write-Host ""
        Write-Host "Webhook Endpoint URL for PayMongo:" -ForegroundColor Yellow
        $webhookUrl = "$httpsUrl/api/subscriptions/webhook"
        Write-Host $webhookUrl -ForegroundColor White -BackgroundColor DarkGreen
        Write-Host ""
        Write-Host "Copy the webhook endpoint URL above and use it in PayMongo Dashboard" -ForegroundColor Cyan
    } else {
        Write-Host "✗ No HTTPS tunnel found" -ForegroundColor Red
        Write-Host "Please check http://localhost:4040 for your ngrok status" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Cannot connect to ngrok API" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Open http://localhost:4040 in your browser" -ForegroundColor White
    Write-Host "2. Look for the Forwarding section" -ForegroundColor White
    Write-Host "3. Copy the HTTPS URL" -ForegroundColor White
    $msg = "4. Your webhook URL format: YOUR-HTTPS-URL/api/subscriptions/webhook"
    Write-Host $msg -ForegroundColor White
}
