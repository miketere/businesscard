# Open Ngrok Web Interface
Write-Host "Opening ngrok web interface..." -ForegroundColor Cyan
Start-Process "http://localhost:4040"
Write-Host ""
Write-Host "The ngrok web interface should open in your browser." -ForegroundColor Green
Write-Host "Look for the HTTPS URL in the 'Forwarding' section." -ForegroundColor Yellow

