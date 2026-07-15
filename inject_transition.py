import os
import glob

# HTML snippets to inject
head_snippet = '\n    <link rel="stylesheet" href="transition.css">\n</head>'

body_start_snippet = '''
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
'''

body_end_snippet = '\n    <script src="transition.js"></script>\n</body>'

# Process all html files
html_files = [f for f in glob.glob("*.html") if f != "original_index.html"]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already injected
    if 'transition.css' in content:
        print(f"Skipping {file}, already modified.")
        continue
        
    # Replace </head>
    content = content.replace('</head>', head_snippet)
    
    # Replace <body> or <body ...>
    import re
    # Find the body tag and insert right after it
    # <body ...> can have attributes
    body_pattern = re.compile(r'(<body[^>]*>)', re.IGNORECASE)
    content = body_pattern.sub(r'\1' + body_start_snippet, content)
    
    # Replace </body>
    content = content.replace('</body>', body_end_snippet)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file}")
