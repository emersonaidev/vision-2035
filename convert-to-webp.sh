#!/bin/bash

echo "🎨 Iniciando conversão para WebP..."

# Criar diretório para WebP
mkdir -p Resourcers/Images/webp

# Função para converter uma imagem
convert_to_webp() {
    input="$1"
    filename=$(basename "$input")
    name="${filename%.*}"
    ext="${filename##*.}"

    # Output path
    output="Resourcers/Images/webp/${name}.webp"

    # Determinar qualidade baseada no uso
    if [[ "$filename" == *"background"* ]] || [[ "$filename" == *"necker.island"* ]]; then
        quality=85  # Maior qualidade para backgrounds
    else
        quality=75  # Qualidade padrão
    fi

    echo "Convertendo: $filename → ${name}.webp"

    # Converter usando cwebp
    if [[ "$ext" == "png" ]] || [[ "$ext" == "PNG" ]]; then
        cwebp -q $quality -alpha_q 100 "$input" -o "$output" 2>/dev/null
    else
        cwebp -q $quality "$input" -o "$output" 2>/dev/null
    fi

    # Mostrar economia
    if [ -f "$output" ]; then
        original_size=$(du -k "$input" | cut -f1)
        webp_size=$(du -k "$output" | cut -f1)
        saved=$((original_size - webp_size))
        percent=$((saved * 100 / original_size))
        echo "  ✓ Economia: ${percent}% (${original_size}KB → ${webp_size}KB)"
    fi
}

# Processar imagens otimizadas
echo ""
echo "📦 Processando imagens otimizadas..."
find Resourcers/Images/optimized -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read img; do
    convert_to_webp "$img"
done

# Processar logos (manter qualidade máxima)
echo ""
echo "🏷️ Processando logos..."
cwebp -q 95 -alpha_q 100 "Resourcers/Logo/Logo_Stroke.png" -o "Resourcers/Logo/Logo_Stroke.webp" 2>/dev/null
cwebp -q 95 -alpha_q 100 "Resourcers/Logo/Logo_White.png" -o "Resourcers/Logo/Logo_White.webp" 2>/dev/null

echo ""
echo "📊 Comparação final:"
echo "JPG/PNG otimizados: $(du -sh Resourcers/Images/optimized 2>/dev/null | cut -f1)"
echo "WebP: $(du -sh Resourcers/Images/webp 2>/dev/null | cut -f1)"

# Calcular economia total
original_total=$(find Resourcers/Images/optimized -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec du -k {} \; | awk '{sum+=$1} END {print sum}')
webp_total=$(find Resourcers/Images/webp -name "*.webp" -exec du -k {} \; | awk '{sum+=$1} END {print sum}')
total_saved=$((original_total - webp_total))
total_percent=$((total_saved * 100 / original_total))

echo ""
echo "✨ Conversão concluída!"
echo "🎉 Economia total: ${total_percent}% (${original_total}KB → ${webp_total}KB)"
echo "💾 Espaço economizado: ${total_saved}KB"