#!/bin/bash

# Script para otimizar imagens do projeto Vision 2035
echo "🖼️ Iniciando otimização de imagens..."

# Criar diretório de saída se não existir
mkdir -p Resourcers/Images/optimized

# Função para otimizar uma imagem
optimize_image() {
    input="$1"
    filename=$(basename "$input")
    output="Resourcers/Images/optimized/$filename"

    # Obter extensão do arquivo
    ext="${filename##*.}"
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

    # Determinar dimensões máximas baseado no uso
    if [[ "$filename" == *"background"* ]] || [[ "$filename" == *"necker.island"* ]]; then
        # Imagens de fundo - manter maior qualidade mas comprimir
        max_width=1920
        quality=85
    else
        # Outras imagens
        max_width=1200
        quality=80
    fi

    echo "Processando: $filename"

    # Usar sharp-cli para otimizar
    if [[ "$ext_lower" == "png" ]]; then
        sharp -i "$input" -o "$output" resize $max_width --withoutEnlargement -- png compressionLevel=9 2>/dev/null || cp "$input" "$output"
    else
        sharp -i "$input" -o "$output" resize $max_width --withoutEnlargement -- jpeg quality=$quality progressive=true 2>/dev/null || cp "$input" "$output"
    fi

    # Mostrar economia de espaço
    if [ -f "$output" ]; then
        original_size=$(du -h "$input" | cut -f1)
        optimized_size=$(du -h "$output" | cut -f1)
        echo "  ✓ $filename: $original_size → $optimized_size"
    fi
}

# Processar todas as imagens
export -f optimize_image

# Processar JPG/JPEG
find Resourcers/Images -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read img; do
    optimize_image "$img"
done

# Processar PNG
find Resourcers/Images -maxdepth 1 -type f -iname "*.png" | while read img; do
    optimize_image "$img"
done

echo ""
echo "📊 Comparação de tamanhos:"
echo "Original: $(du -sh Resourcers/Images | cut -f1)"
echo "Otimizado: $(du -sh Resourcers/Images/optimized | cut -f1)"
echo ""
echo "✅ Otimização concluída!"