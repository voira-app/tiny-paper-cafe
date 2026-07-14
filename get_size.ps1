Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Users\vinus\tiny-paper-cafe\hero-bg.png')
Write-Host "Width=$($img.Width), Height=$($img.Height)"
$img.Dispose()
