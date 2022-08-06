import fs from 'fs';
import crypto from 'crypto';

function generateSecret() {
    const bytes = crypto.randomBytes(64);
    const secret = bytes.toString('hex');

    return secret;
}

function createJwtSecrets() {
    const filePath = '.env';
    let content = fs.readFileSync(filePath, { encoding: 'utf-8' });

    const lines = content.split('\n');
    const secretKeys = ['JWT_ACCESS_SECRET=', 'JWT_REFRESH_SECRET='];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const prefix = secretKeys.find((value) => line.startsWith(value));

        if (!prefix) {
            continue;
        }

        const secret = generateSecret();
        lines[i] = prefix + secret;
    }

    content = lines.join('\n');
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
    console.log(content);
}

createJwtSecrets();