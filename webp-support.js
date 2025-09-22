// Detectar suporte a WebP e aplicar fallback
(function() {
    // Função para testar suporte WebP
    function checkWebPSupport(callback) {
        const webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    // Aplicar WebP se suportado
    checkWebPSupport(function(supported) {
        if (supported) {
            // Adicionar classe ao body para indicar suporte
            document.body.classList.add('webp-support');

            // Substituir todas as imagens para WebP
            document.querySelectorAll('img[data-webp]').forEach(img => {
                const webpSrc = img.getAttribute('data-webp');
                if (webpSrc) {
                    // Guardar src original como fallback
                    img.setAttribute('data-fallback', img.src);
                    img.src = webpSrc;

                    // Se falhar ao carregar WebP, usar fallback
                    img.onerror = function() {
                        const fallback = this.getAttribute('data-fallback');
                        if (fallback && this.src !== fallback) {
                            this.src = fallback;
                        }
                    };
                }
            });

            console.log('✅ WebP suportado - usando imagens otimizadas');
        } else {
            document.body.classList.add('no-webp');
            console.log('⚠️ WebP não suportado - usando fallback');
        }
    });
})();