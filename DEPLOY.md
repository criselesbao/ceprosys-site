# CEPROSYS — site novo (ceprosys.com.br)

Site estático (HTML/CSS/JS puro, sem build). Todo o conteúdo desta pasta vai para a raiz do hosting (`public_html`).

## O que subir

```
index.html
servicos.html
projetos.html
sobre.html
contato.html
robots.txt
sitemap.xml
assets/  (css, js, img)
```

⚠️ NÃO subir: `DEPLOY.md` (este arquivo).

## Como subir (Hostinger)

O site atual em ceprosys.com.br é um deploy do **Hostinger Horizons** (builder de IA).
Substituir por este site:

### Opção A — hPanel File Manager (mais simples)
1. hPanel → Websites → ceprosys.com.br → **File Manager**
2. Em `public_html`: **fazer backup** (baixar zip do conteúdo atual) — rollback garantido
3. Apagar o conteúdo antigo de `public_html` (index.html, assets/ do Horizons, vite.svg)
4. Upload de todos os arquivos desta pasta para `public_html`
5. Se o Horizons continuar "publicando" por cima, desativar/desvincular o projeto Horizons
   (hPanel → Websites → gerenciar → Horizons) para ele não sobrescrever o site.

### Opção B — FTP (permite deploy automatizado pelo Claude)
1. hPanel → Files → **FTP Accounts** → criar/ver credencial
2. Com host/usuário/senha em mãos, o deploy sai por script (curl/lftp), incluindo backup prévio.

### Opção C — API Hostinger
A API oficial (developers.hostinger.com) cobre VPS/DNS/domínios, mas **não** upload de
arquivos do hosting compartilhado — para arquivos, usar A ou B.

## Smoke test (obrigatório após subir)

```bash
curl -s https://ceprosys.com.br/ | grep -c "CEPROSYS"          # > 0
curl -s https://ceprosys.com.br/ | grep "Hostinger Horizons"   # deve retornar VAZIO
curl -so /dev/null -w "%{http_code}\n" https://ceprosys.com.br/assets/css/site.css  # 200
curl -so /dev/null -w "%{http_code}\n" https://ceprosys.com.br/projetos.html        # 200
```

## Preview local

Servidor de preview configurado no launch.json da sessão Claude (`ceprosys-site`, porta 8241),
ou manualmente:

```bash
python -m http.server 8241 --directory "C:/Users/ceps1/OneDrive/Área de Trabalho/ceprosys-site"
```

## Notas

- Domínio correto: **ceprosys.com.br** (1 "P"). Registrado 11/mai/2026, registrador HSTDOMAINS (Hostinger).
- Formulário de contato abre o WhatsApp (11) 97211-0884 com a mensagem montada — sem backend, nada a configurar.
- Tema: dark padrão + toggle claro (persistência em localStorage `ceprosys_theme`).
- Fontes: Google Fonts (Syne, DM Sans, DM Mono) — precisa de internet no cliente.
- Editar navegação/rodapé = editar nos 5 HTML (site estático sem template).
