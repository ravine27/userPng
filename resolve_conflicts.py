import re
import os

files_to_fix = [
    r'src\declarations.d.ts',
    r'src\screens\loginscreen.tsx',
    r'package-lock.json'
]

base_dir = r'd:\react-native cli\userPng'

def resolve_file(filepath):
    full_path = os.path.join(base_dir, filepath)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        return

    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find merge conflict blocks
    # Captures:
    # 1. Content between HEAD and ======= (Current Change)
    # 2. Content between ======= and >>>>>>> (Incoming Change)
    # We want to keep group 2.
    
    # Pattern explanation:
    # <<<<<<< HEAD\n   or <<<<<<< [^\n]+\n
    # (.*?)            Content A (lazy)
    # =======\n
    # (.*?)            Content B (lazy)
    # >>>>>>> [^\n]+\n
    
    pattern = re.compile(r'<<<<<<< [^\n]+\n(.*?)=======\n(.*?)>>>>>>> [^\n]+\n', re.DOTALL)
    
    # Function to replace with incoming content
    def replace_with_incoming(match):
        return match.group(2)

    new_content, count = pattern.subn(replace_with_incoming, content)
    
    if count > 0:
        print(f"Resolved {count} conflicts in {filepath}")
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    else:
        print(f"No conflicts found in {filepath}")

for file in files_to_fix:
    resolve_file(file)
