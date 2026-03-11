<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Prova Técnica Nasajon – Enriquecimento de Municípios</title>
</head>
<body>

<h1>Prova Técnica Nasajon – Enriquecimento de Municípios</h1>

<h2>Visão Geral</h2>
<p>Este projeto lê um arquivo <code>input.csv</code> com municípios e populações, faz o <strong>enriquecimento com dados oficiais do IBGE</strong>, gera um <code>resultado.csv</code>, calcula estatísticas e envia automaticamente essas estatísticas para a <strong>API de correção da Nasajon</strong> usando o <code>ACCESS_TOKEN</code> obtido via login no Supabase.</p>

<h2>Pré-requisitos</h2>
<ul>
  <li>Node.js ≥ 18</li>
  <li>NPM</li>
  <li>Conta no Supabase para obter <code>ACCESS_TOKEN</code></li>
</ul>

<h2>Configuração do Ambiente</h2>
<ol>
  <li>Crie um arquivo <code>.env</code> na raiz com as variáveis disponíveis no .env.example:
    <pre>
IBGE_API_URL=""
SUBMIT_URL=""
ACCESS_TOKEN=""
    </pre>

  </li>
  <li>Instale as dependências:
    <pre>npm install</pre>
  </li>
</ol>

<h2>Como Rodar</h2>
<pre>npm start</pre>
<p>Isso fará:</p>
<ol>
  <li>Ler <code>input.csv</code></li>
  <li>Fazer o <strong>matching com IBGE</strong></li>
  <li>Gerar <code>resultado.csv</code></li>
  <li>Calcular estatísticas (<code>total_municipios</code>, <code>total_ok</code>, <code>total_nao_encontrado</code>, <code>total_erro_api</code>, <code>pop_total_ok</code>, <code>medias_por_regiao</code>)</li>
  <li>Enviar JSON de estatísticas para a API de correção</li>
</ol>

<p>Status possíveis: <code>OK</code>, <code>NAO_ENCONTRADO</code>, <code>ERRO_API</code></p>

<h2>Estatísticas Calculadas</h2>
<ul>
  <li><code>pop_total_ok</code> – soma total da população</li>
  <li><code>medias_por_regiao</code> – média de população por região, considerando cada município apenas uma vez</li>
</ul>

<pre>
{
  "stats": {
    "total_municipios": 10,
    "total_ok": 10,
    "total_nao_encontrado": 0,
    "total_erro_api": 0,
    "pop_total_ok": 30251494,
    "medias_por_regiao": {
      "Sudeste": 3525274.14,
      "Sul": 1240125,
      "Centro-Oeste": 3094325
    }
  }
}
</pre>

<h2>Decisões Técnicas</h2>
<ul>
  <li>Matching simples de municípios:
    <ul>
      <li>Normalização (remoção de acentos, caixa baixa)</li>
      <li>Tratamento de duplicação de letras (ex.: <code>Santoo Andre</code> → <code>Santo André</code>)</li>
      <li>Fuzzy match básico para erros de digitação</li>
    </ul>
  </li>
  <li>Estatísticas:
    <ul>
      <li>Soma total baseada em todas as linhas OK</li>
      <li>Média por região baseada em municípios únicos</li>
    </ul>
  </li>
  <li>Envio para API: POST JSON usando <code>ACCESS_TOKEN</code> no header <code>Authorization: Bearer &lt;ACCESS_TOKEN&gt;</code></li>
  <li>Tratamento de erros de API ou municípios não encontrados</li>
</ul>

<h2>Artefatos Entregues</h2>
<ul>
  <li><code>input.csv</code></li>
  <li><code>resultado.csv</code></li>
  <li>Código-fonte completo (<code>src/</code>)</li>
  <li>Notas explicativas sobre decisões técnicas</li>
  <li>Este README</li>
</ul>

</ul>

</body>
</html>
