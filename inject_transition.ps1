$headSnippet = @"
    <link rel="stylesheet" href="transition.css">
</head>
"@

$bodyStartSnippet = @"
    <!-- Page Transition Overlay -->
    <div id="page-transition-overlay" class="is-active">
        <div class="transition-stripe s1 is-covering"></div>
        <div class="transition-stripe s2 is-covering"></div>
        <div class="transition-stripe s3 is-covering"></div>
        <div class="transition-stripe s4 is-covering"></div>
        <div class="transition-stripe s5 is-covering"></div>
        <div class="transition-stripe s6 is-covering"></div>
    </div>
    <!-- Rough Edge SVG Filter -->
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true">
        <filter id="rough-edge">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
"@

$bodyEndSnippet = @"
    <script src="transition.js"></script>
</body>
"@

$htmlFiles = Get-ChildItem -Filter *.html | Where-Object Name -NE "original_index.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    if ($content -match "transition.css") {
        Write-Host "Skipping $($file.Name), already modified."
        continue
    }

    # Replace </head>
    $content = $content -replace "(?i)</head>", $headSnippet

    # Replace <body ...>
    # Use regex to match the body tag with its attributes
    $content = $content -replace '(?i)(<body[^>]*>)', "`$1$bodyStartSnippet"

    # Replace </body>
    $content = $content -replace "(?i)</body>", $bodyEndSnippet

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}
