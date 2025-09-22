# Como usar as fontes Knockout originais

## Opção 1: Adobe Creative Cloud (Recomendado)
**Custo:** ~$55/mês (plano completo) ou $20/mês (plano único)

### Passos:
1. **Crie conta Adobe CC**: https://www.adobe.com/creativecloud
2. **Acesse Adobe Fonts**: https://fonts.adobe.com
3. **Procure "Knockout"** na busca
4. **Ative para Web** clicando no toggle
5. **Crie um Web Project** e adicione as variantes:
   - Knockout 31 Junior Middleweight (para títulos)
   - Knockout 48 Featherweight (para textos)
6. **Copie o código** fornecido (será algo como):
   ```html
   <link rel="stylesheet" href="https://use.typekit.net/abc123x.css">
   ```
7. **Substitua no index.html** onde está comentado

### No CSS, use:
```css
:root {
    --font-display: 'knockout-31', sans-serif;
    --font-sans: 'knockout-48', sans-serif;
}
```

## Opção 2: Licença Direta Hoefler & Co.
**Custo:** ~$399 (licença perpétua para web)

1. **Visite**: https://www.typography.com/fonts/knockout
2. **Compre licença web** para as variantes necessárias
3. **Baixe os arquivos** WOFF/WOFF2
4. **Hospede as fontes** no seu servidor
5. **Use @font-face** no CSS

## Opção 3: Font Squirrel / MyFonts
**Custo:** Varia ($30-200 por fonte)

- **Font Squirrel**: https://www.fontsquirrel.com
- **MyFonts**: https://www.myfonts.com

## Comparação de Custos:
| Método | Custo Inicial | Custo Anual | Vantagens |
|--------|--------------|-------------|-----------|
| Adobe CC | $20-55/mês | $240-660 | Inclui milhares de fontes |
| Licença Direta | $399 único | $0 | Licença perpétua |
| Alternativas Grátis | $0 | $0 | Sem custos, mas não idêntico |

## Configuração Atual (Grátis):
Já está configurado com:
- **Oswald** → Similar ao Knockout (títulos)
- **Barlow Condensed** → Similar ao Knockout Light (textos)

Para trocar pelas originais quando tiver Adobe CC:
1. Descomente a linha do Adobe Fonts no index.html
2. Comente/remova as Google Fonts
3. Atualize o CSS com os nomes corretos das fontes