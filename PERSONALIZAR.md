# Personalizar — Site Essencial

Este template foi preparado para o fluxo **duplicar → trocar identidade → trocar conteúdo → trocar imagens → publicar**.

## 1. Trocar empresa, textos e contatos

Abra `js/config.js`. É o principal arquivo de personalização.

Altere:

- `company.name` — nome da empresa;
- `company.slogan` — slogan;
- `hero` — textos principais do topo;
- `about` — apresentação;
- `servicesSection` — introdução dos serviços;
- `services` — até 6 cards de serviço;
- `differentials` — diferenciais;
- `testimonials` — depoimentos;
- `cta` — chamada comercial;
- `contact` — WhatsApp, telefone, e-mail, Instagram, LinkedIn, endereço e horário;
- `footer.description` — texto curto do rodapé;
- `seo` — título e descrição usados pelo navegador e mecanismos de busca.

## 2. Trocar o WhatsApp

No `js/config.js`, edite:

```js
whatsapp: "5561999999999",
whatsappDisplay: "(61) 99999-9999",
whatsappMessage: "Olá! Gostaria de mais informações."
```

O número deve ficar somente com país + DDD + número, sem espaços, parênteses ou hífens.

## 3. Trocar as cores

Abra `css/styles.css` e altere apenas as variáveis no começo do arquivo:

```css
:root {
  --primary: #2f5bea;
  --primary-dark: #2146bd;
  --secondary: #0f172a;
  --accent: #8b5cf6;
  --background: #ffffff;
  --surface: #f7f9fc;
  --surface-strong: #eef3ff;
  --text: #111827;
  --muted: #64748b;
  --border: #e5eaf2;
}
```

Para cada novo cliente, normalmente basta trocar `primary`, `primary-dark`, `secondary` e `accent`.

## 4. Trocar logo e favicon

- O logo atual é textual e usa a inicial dentro de `.brand-mark` no `index.html`.
- Para usar uma imagem, substitua o conteúdo do link `.brand` por uma tag `<img>`.
- Troque `assets/icons/favicon.svg` pelo favicon do cliente e mantenha o mesmo nome para não precisar alterar o HTML.

## 5. Trocar imagens

As imagens ficam em `assets/images/`.

Arquivos principais:

- `hero-business.svg` — imagem do Hero;
- `about-business.svg` — imagem da seção Sobre;
- `og-cover.svg` — imagem de compartilhamento;
- `gallery-1.svg`, `gallery-2.svg`, `gallery-3.svg` — galeria opcional.

Você pode substituir SVG por JPG, PNG ou WebP. Se mudar o nome/extensão, atualize o caminho correspondente no `index.html`.

Recomendação: usar WebP otimizado e manter proporções próximas às imagens demonstrativas.

## 6. Editar serviços

No array `services` do `js/config.js`, altere `title` e `description`.

Ícones disponíveis:

- `spark`
- `shield`
- `chart`
- `layers`
- `clock`
- `hand`

Mantenha no máximo 6 itens no pacote Essencial.

## 7. Editar depoimentos

No array `testimonials`, altere:

```js
{
  quote: "Texto do depoimento",
  name: "Nome do cliente",
  role: "Empresa ou contexto"
}
```

Use somente depoimentos reais quando o site for publicado para um cliente.

## 8. Ativar ou desativar seções

No início do `js/config.js`:

```js
sections: {
  testimonials: true,
  location: true,
  gallery: false,
  social: true
}
```

Use `true` para mostrar e `false` para ocultar. O JavaScript remove visualmente a seção e seus links, sem deixar espaços vazios.

## 9. SEO

Além de `seo.title` e `seo.description` no `config.js`, revise no `index.html`:

- `og:image`;
- `og:locale`;
- favicon;
- textos `alt` das imagens após substituir as imagens demonstrativas.

## 10. Publicar

### GitHub Pages

1. Crie um novo repositório.
2. Envie todos os arquivos mantendo a estrutura de pastas.
3. Em **Settings → Pages**, selecione a branch principal e a pasta raiz.
4. Salve e aguarde a URL pública ser disponibilizada.

### Hospedagem estática

O projeto também funciona em qualquer serviço que publique arquivos HTML/CSS/JS estáticos. Não há build, backend ou banco de dados.

## Checklist rápido por cliente

1. Duplicar o projeto.
2. Editar `js/config.js`.
3. Trocar as variáveis de cor em `css/styles.css`.
4. Trocar logo/favicon.
5. Trocar imagens.
6. Revisar links e WhatsApp.
7. Revisar depoimentos e textos.
8. Testar desktop e celular.
9. Publicar.
