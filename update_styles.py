import os

file_path = "style.css"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Change DM Mono to Inter
content = content.replace("'DM Mono', monospace", "'Inter', sans-serif")

# 2. Fix Overlap and add shadow to Postcard
content = content.replace("padding: 8rem 2rem;", "padding: 8rem 2rem 12rem 2rem;")
content = content.replace("border-radius: 4px;\n            box-shadow: 0 20px 50px rgba(0,0,0,0.08);", "border-radius: 16px;\n            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);")

# 3. Enhance Primary Button
old_btn = """        .btn-primary {
            background-color: var(--bg-color);
            color: var(--primary-color);
            padding: 1rem 2.5rem;
            text-decoration: none;
            font-family: 'Inter', sans-serif;
            font-size: 1.15rem;
            border-radius: 2px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: inline-block;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }"""
new_btn = """        .btn-primary {
            background-color: var(--bg-color);
            color: var(--primary-color);
            padding: 1rem 2.5rem;
            text-decoration: none;
            font-family: 'Inter', sans-serif;
            font-size: 1.15rem;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: inline-block;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .btn-primary:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.15);
        }"""
content = content.replace(old_btn, new_btn)

# 4. Enhance Form Inputs
old_inputs = """        .form-group input, .form-group textarea {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(154, 154, 138, 0.4);
            padding: 0.6rem 0;
            font-family: 'Inter', sans-serif;
            font-size: 1.05rem;
            color: var(--text-color);
            outline: none;
            transition: border-bottom-color 0.3s;
        }
        
        .form-group input::placeholder, .form-group textarea::placeholder {
            color: var(--muted-color);
            opacity: 0.7;
        }

        .form-group input:focus, .form-group textarea:focus {
            border-bottom-color: var(--primary-color);
        }"""
new_inputs = """        .form-group input, .form-group textarea {
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid rgba(154, 154, 138, 0.2);
            border-radius: 8px;
            padding: 1rem 1.2rem;
            font-family: 'Inter', sans-serif;
            font-size: 1.05rem;
            color: var(--text-color);
            outline: none;
            transition: all 0.3s;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .form-group input::placeholder, .form-group textarea::placeholder {
            color: var(--muted-color);
            opacity: 0.7;
        }

        .form-group input:focus, .form-group textarea:focus {
            border-color: var(--primary-color);
            background: var(--white);
            box-shadow: 0 0 0 3px rgba(107, 122, 53, 0.1);
        }"""
content = content.replace(old_inputs, new_inputs)

# 5. Enhance Date Input
old_date = """        .date-input {
            width: 100%;
            max-width: 350px;
            padding: 1.2rem;
            border: 1px solid rgba(154, 154, 138, 0.4);
            background: transparent;
            font-family: 'Inter', sans-serif;
            font-size: 1.3rem;
            color: var(--text-color);
            outline: none;
            transition: border-color 0.3s;
            cursor: pointer;
            text-align: center;
            border-radius: 4px;
        }
        .date-input:focus {
            border-color: var(--primary-color);
        }"""
new_date = """        .date-input {
            width: 100%;
            max-width: 350px;
            padding: 1.2rem;
            border: 1px solid rgba(154, 154, 138, 0.3);
            background: rgba(255,255,255,0.8);
            font-family: 'Inter', sans-serif;
            font-size: 1.3rem;
            color: var(--text-color);
            outline: none;
            transition: all 0.3s;
            cursor: pointer;
            text-align: center;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }
        .date-input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 4px rgba(107, 122, 53, 0.15);
        }"""
content = content.replace(old_date, new_date)

# 6. Enhance Guest Buttons
old_guest = """        .guest-btn {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 1px solid rgba(154, 154, 138, 0.4);
            background: transparent;
            font-size: 1.8rem;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Inter', sans-serif;
            color: var(--text-color);
        }
        .guest-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            transform: scale(1.05);
        }
        .guest-btn.selected {
            border-color: var(--primary-color);
            background-color: var(--primary-color);
            color: var(--white);
            transform: scale(1.1);
        }"""
new_guest = """        .guest-btn {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 1px solid rgba(154, 154, 138, 0.3);
            background: rgba(255,255,255,0.8);
            font-size: 1.8rem;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-family: 'Inter', sans-serif;
            color: var(--text-color);
            box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }
        .guest-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            transform: scale(1.1) translateY(-5px);
            box-shadow: 0 10px 20px rgba(107, 122, 53, 0.15);
        }
        .guest-btn.selected {
            border-color: var(--primary-color);
            background-color: var(--primary-color);
            color: var(--white);
            transform: scale(1.15);
            box-shadow: 0 10px 25px rgba(107, 122, 53, 0.3);
        }"""
content = content.replace(old_guest, new_guest)

# 7. Menu Hover
old_menu = """        .menu-item {
            display: flex;
            align-items: baseline;
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
            font-family: 'Inter', sans-serif;
        }"""
new_menu = """        .menu-item {
            display: flex;
            align-items: baseline;
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
            font-family: 'Inter', sans-serif;
            transition: all 0.2s ease;
        }
        .menu-item:hover {
            transform: translateX(5px);
            color: var(--primary-color);
        }"""
content = content.replace(old_menu, new_menu)

# 8. Type Option
old_type = """        .type-option {
            border: 1px solid rgba(154, 154, 138, 0.4);
            padding: 1.5rem;
            margin-bottom: 1.2rem;
            cursor: pointer;
            transition: all 0.3s;
            background: rgba(255,255,255,0.8);
        }
        .type-option:hover {
            border-color: var(--primary-color);
            background-color: rgba(107, 122, 53, 0.03);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }"""
new_type = """        .type-option {
            border: 1px solid rgba(154, 154, 138, 0.3);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.2rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: rgba(255,255,255,0.8);
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .type-option:hover {
            border-color: var(--primary-color);
            background-color: var(--white);
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(107, 122, 53, 0.1);
        }"""
content = content.replace(old_type, new_type)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Modifications done.")
