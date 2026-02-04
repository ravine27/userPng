const fs = require('fs');
const path = require('path');

const files = [
    'src/declarations.d.ts',
    'src/screens/loginscreen.tsx',
    'package-lock.json'
];

const baseDir = '.';

files.forEach(file => {
    const fullPath = path.join(baseDir, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Regex: <<<<<<< .*\n([\s\S]*?)=======\n([\s\S]*?)>>>>>>> .*\n
        // Replace with group 2

        // We match explicitly the conflict markers
        const pattern = /<<<<<<< [^\n]+\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> [^\n]+(\r?\n)?/g;

        let count = 0;
        const newContent = content.replace(pattern, (match, p1, p2) => {
            count++;
            return p2;
        });

        if (count > 0) {
            fs.writeFileSync(fullPath, newContent, 'utf8');
            console.log(`Resolved ${count} conflicts in ${file}`);
        } else {
            console.log(`No conflicts found in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
