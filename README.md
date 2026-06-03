# Site Meteorológico

Aplicação web de previsão do tempo desenvolvida com React e Vite. O projeto consulta a localização atual do usuário quando disponível, permite pesquisar cidades manualmente e exibe dados meteorológicos em cartões, gráficos e previsões por hora e por dia.

## Funcionalidades

- Busca de clima por cidade, endereço ou coordenadas.
- Detecção de localização via geolocalização do navegador.
- Fallback automático para uma localização padrão quando a geolocalização não está disponível.
- Exibição de resumo climático com temperatura, sensação térmica, vento e condição atual.
- Painéis com umidade, pressão, visibilidade e índice UV.
- Gráficos e alertas meteorológicos.
- Previsão horária e previsão diária.

## Tecnologias

- React 19
- Vite
- Axios
- Recharts
- Lucide React
- React Loader Spinner
- Tailwind CSS 4

## Estrutura do projeto

```text
src/
	api.js
	App.jsx
	App.css
	index.css
	main.jsx
	components/
	styles/
```

## Pré-requisitos

- Node.js 18 ou superior
- npm
- Uma API de clima configurada por variáveis de ambiente

## Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:

```env
VITE_API_URL=https://sua-api-de-clima.com
VITE_API_KEY=sua_chave_de_api
```

O app faz as requisições usando `VITE_API_URL` como base e envia `VITE_API_KEY` como parâmetro `key` quando a variável estiver definida.

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

## Build de produção

Para gerar a versão otimizada para produção:

```bash
npm run build
```

Para pré-visualizar o build localmente:

```bash
npm run preview
```

## Lint

Para verificar o código com ESLint:

```bash
npm run lint
```

## Observações

- Se a geolocalização falhar ou for negada, o app utiliza uma localização padrão como fallback.
- A aplicação também resolve nomes de cidades para coordenadas antes de consultar a previsão.
