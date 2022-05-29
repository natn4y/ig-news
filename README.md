<p class="has-line-data" data-line-start="0" data-line-end="1"><a href="https://travis-ci.org/joemccann/dillinger"><img src="https://travis-ci.org/joemccann/dillinger.svg?branch=master" alt="Build Status"></a></p>
<h2 class="code-line" data-line-start=1 data-line-end=2 ><a id="IgNews_BLOG_Assinatura_Mensal_1"></a>IgNews: BLOG (Assinatura Mensal)</h2>
<p class="has-line-data" data-line-start="3" data-line-end="4">Esse projeto se trata de um Blog onde será necessário possuir uma assinatura ativa no valor de 9.90 para ler as postagens completas, para isso é necessário fazer Login com sua conta do Github e assinar o plano mensal de R$ 9.90. Os visitantes poderão ver apenas uma amostra da postagem, essa amostra é renderizada pelo lado do servidor, isso impede que um usuário tente acessar a postagem de forma ilegal.</p>
<p class="has-line-data" data-line-start="5" data-line-end="6">Demonstração: <a href="https://ig-news-natn4y.vercel.app">https://ig-news-natn4y.vercel.app</a></p>
<h3 class="code-line" data-line-start=7 data-line-end=8 ><a id="Tecnologias_usadas_7"></a><strong>Tecnologias usadas:</strong></h3>
<p class="has-line-data" data-line-start="9" data-line-end="12"><strong>Front-End</strong><br>
React / NextJS<br>
CSS3 / Sass</p>
<p class="has-line-data" data-line-start="13" data-line-end="16"><strong>Login</strong><br>
Next-auth<br>
Github OAuth</p>
<p class="has-line-data" data-line-start="17" data-line-end="19"><strong>CMS</strong><br>
Prismic CMS</p>
<p class="has-line-data" data-line-start="20" data-line-end="22"><strong>API de pagamentos</strong><br>
stripe</p>
<p class="has-line-data" data-line-start="23" data-line-end="25"><strong>Banco de dados</strong><br>
faunadb</p>
<p class="has-line-data" data-line-start="26" data-line-end="28"><strong>Testes</strong><br>
Jest</p>
<h2 class="code-line" data-line-start=29 data-line-end=30 ><a id="Installation_29"></a>Installation</h2>
<p class="has-line-data" data-line-start="31" data-line-end="32">Requer <a href="https://nodejs.org/">Node.js</a> v16+ para rodar.</p>
<p class="has-line-data" data-line-start="33" data-line-end="34">1 - Instale as dependências:</p>
<pre><code class="has-line-data" data-line-start="36" data-line-end="39" class="language-sh"><span class="hljs-built_in">cd</span> igNews
yarn install
</code></pre>
<p class="has-line-data" data-line-start="39" data-line-end="40">2 - Configure as variáveis de ambiente criando e editando o arquivo .env</p>
<p class="has-line-data" data-line-start="41" data-line-end="42">3 - Rode o stripe listen:</p>
<pre><code class="has-line-data" data-line-start="44" data-line-end="46" class="language-sh">stripe listen --forward-to localhost:<span class="hljs-number">3000</span>/api/webhooks
</code></pre>
<p class="has-line-data" data-line-start="47" data-line-end="48">4 - Teste o projeto:</p>
<pre><code class="has-line-data" data-line-start="50" data-line-end="52" class="language-sh">yarn dev
</code></pre>
<h2 class="code-line" data-line-start=53 data-line-end=54 ><a id="License_53"></a>License</h2>
<p class="has-line-data" data-line-start="55" data-line-end="56">MIT</p>
<p class="has-line-data" data-line-start="57" data-line-end="58"><strong>Free Software, Yeah!</strong></p>
