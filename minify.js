const fs = require('fs');
const path = require('path');

// Função para minificar CSS
function minifyCSS(content) {
    return content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comentários
        .replace(/\s+/g, ' ') // Remove espaços extras
        .replace(/:\s+/g, ':') // Remove espaços após :
        .replace(/;\s+/g, ';') // Remove espaços após ;
        .replace(/\{\s+/g, '{') // Remove espaços após {
        .replace(/\}\s+/g, '}') // Remove espaços após }
        .replace(/\s+\{/g, '{') // Remove espaços antes de {
        .replace(/\s+\}/g, '}') // Remove espaços antes de }
        .trim();
}

// Função para minificar JavaScript
function minifyJS(content) {
    // Preservar strings
    const strings = [];
    let minified = content.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
        strings.push(match);
        return `__STRING_${strings.length - 1}__`;
    });

    // Minificar
    minified = minified
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comentários de bloco
        .replace(/\/\/.*$/gm, '') // Remove comentários de linha
        .replace(/\s+/g, ' ') // Remove espaços extras
        .replace(/\s*([{}()\[\],;:=<>+\-*\/!&|?])\s*/g, '$1') // Remove espaços ao redor de operadores
        .trim();

    // Restaurar strings
    strings.forEach((str, i) => {
        minified = minified.replace(`__STRING_${i}__`, str);
    });

    return minified;
}

// Minificar CSS
const cssContent = fs.readFileSync('styles.css', 'utf8');
const minifiedCSS = minifyCSS(cssContent);
fs.writeFileSync('styles.min.css', minifiedCSS);
console.log('✅ CSS minificado: styles.css → styles.min.css');
console.log(`   Tamanho original: ${(cssContent.length / 1024).toFixed(2)} KB`);
console.log(`   Tamanho minificado: ${(minifiedCSS.length / 1024).toFixed(2)} KB`);
console.log(`   Redução: ${(100 - (minifiedCSS.length / cssContent.length * 100)).toFixed(1)}%`);

// Minificar JavaScript
const jsContent = fs.readFileSync('script.js', 'utf8');
const minifiedJS = minifyJS(jsContent);
fs.writeFileSync('script.min.js', minifiedJS);
console.log('\n✅ JavaScript minificado: script.js → script.min.js');
console.log(`   Tamanho original: ${(jsContent.length / 1024).toFixed(2)} KB`);
console.log(`   Tamanho minificado: ${(minifiedJS.length / 1024).toFixed(2)} KB`);
console.log(`   Redução: ${(100 - (minifiedJS.length / jsContent.length * 100)).toFixed(1)}%`);