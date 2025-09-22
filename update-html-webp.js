const fs = require('fs');

// Ler o HTML atual
let html = fs.readFileSync('index.html', 'utf8');

// Função para criar picture element
function createPictureElement(originalSrc, alt, className = '', loading = 'lazy') {
    // Extrair nome do arquivo
    const match = originalSrc.match(/([^/]+)\.(jpg|jpeg|png)/i);
    if (!match) return `<img src="${originalSrc}" alt="${alt}" class="${className}" loading="${loading}">`;

    const filename = match[1];
    const webpSrc = originalSrc.replace('/optimized/', '/webp/').replace(/\.(jpg|jpeg|png)/i, '.webp');

    return `<picture>
                <source srcset="${webpSrc}" type="image/webp">
                <source srcset="${originalSrc}" type="image/jpeg">
                <img src="${originalSrc}" alt="${alt}" class="${className}" loading="${loading}">
            </picture>`;
}

// Substituir imagens de fundo com picture elements
// Para simplificar, vamos adicionar data-webp attributes primeiro
html = html.replace(/<img\s+src="([^"]+\.(jpg|jpeg|png))"\s+alt="([^"]*)"\s+(?:class="([^"]*)")?\s*(?:loading="([^"]*)")?>/gi,
    (match, src, ext, alt, className = '', loading = 'lazy') => {
        // Pular logos por enquanto
        if (src.includes('/Logo/')) {
            return match;
        }

        // Criar WebP path
        const webpSrc = src
            .replace('/optimized/', '/webp/')
            .replace(/\.(jpg|jpeg|png)/i, '.webp');

        // Adicionar data-webp attribute
        return `<img src="${src}" data-webp="${webpSrc}" alt="${alt}"${className ? ` class="${className}"` : ''} loading="${loading}">`;
    });

// Salvar HTML atualizado
fs.writeFileSync('index.html', html);

console.log('✅ HTML atualizado com suporte a WebP');
console.log('📝 Imagens agora têm data-webp attributes para fallback automático');