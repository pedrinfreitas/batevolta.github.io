<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>

  <style>
    @import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900);

    :root {
      --body-bg: #123a5e;
      --main-bg: #121629;
      --txt-color: #20aad9;
      --contraste: #f1d660;
      --verde: #a6e22e;
      --laranja: #fd971f;
      --rosa: #f92672;
      --branco: #ffffff;
    }

    * {
      padding: 0;
      margin: 0;
      border: 0;
      color: ye;
    }

    body {
      font-size: 16px;
      font-family: "Roboto", sans-serif;
      color: var(--txt-color);
      background: var(--body-bg);
    }

    main {
      background-color: var(--main-bg);
      max-width: 600px;
      height: 100%;
      padding: 0.5rem 0;
      margin: 4rem auto;
      border-radius: 4px;
    }

    input {
      min-width: 55%;
      border: 1px solid rgb(121 109 95 / 24%);
      border-radius: 2px;
      height: 1.5rem;
      background: #156b9d;
      margin: 0.25rem 0;
      font-size: 1rem;
      padding-left: 0.5rem;
    }

    input:focus {
      background-color: var(--contraste);
      color: #121629;
    }

    button {
      width: 6rem;
      height: 2rem;
      border-radius: 4px;
      background: var(--contraste);
    }

    .title {
      text-align: center;
      font-size: 2rem;
      margin: 1rem;
      color: var(--contraste);
    }

    .destaque {
      color: var(--contraste);
    }

    .result {
      color: var(--contraste);
      text-align: center;
      font-size: 1rem;
      margin: 1rem;
    }

    .card {
      display: flex;
      flex-direction: column;
      margin: 1rem;
    }

    .card__item {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .card__title {
      margin-right: 0.5rem;
      font-size: 1rem;
    }

    .card__buttons {
      display: flex;
      justify-content: space-around;
      padding-top: 2rem;
      margin: 1rem;
    }

    /* span.redirect_uri,
    p.redirect_uri {
      color: var(--branco);
    }

    .redirect_uri:focus {
      background-color: var(--branco);
      color: #121629;
    }

    span.state,
    p.state {
      color: var(--laranja);
    }

    .state:focus {
      background-color: var(--laranja);
      color: #121629;
    }

    span.code,
    p.code {
      color: var(--rosa);
    }

    .code:focus {
      background-color: var(--rosa);
      color: #121629;
    }

    span.id_token,
    p.id_token {
      color: var(--verde);
    }

    .id_token:focus {
      background-color: var(--verde);
      color: #121629;
    } */

    @media (max-width: 440px) {
      .card__title {
        margin-right: 0.2rem;
        font-size: 0.85rem;
      }
    }
  </style>
</head>

<body>
  <main>
    <h1 class="title">Parâmetros recebidos</h1>

    <div id="itensRecebidos" class="card"></div>

    <h2 class="title">Parâmetros que serão enviados</h2>

    <div id="itensEnviados" class="card"></div>

    <div class="card__buttons">
      <button type="button" onclick="enviar()">Enviar</button>
      <button type="button" onclick="calc()">abrir calc</button>
    </div>

    <p id="resultado" class="result"></p>
  </main>

  <script>
    let queryDict = {};
    let urlEnvio = '';

    location.search
      .substr(1)
      .split("&")
      .forEach((e) => (queryDict[e.split("=")[0]] = e.split("=")[1]));

    // 1º passar sempre a url de callback
    const params = [
      { nome: "redirect_uri", cor: "#ffffff", util: "recebido" },//url de callback
      { nome: "state", cor: "#fd971f", util: "recebido" },
      { nome: "code", cor: "#f92672", util: "enviar" },
      { nome: "id_token", cor: "#a6e22e", util: "enviar" },
    ];

    const style = (prop, value) => `style="${prop}: ${value}"`;

    const addValues = () =>
      params.map(
        (e) => (e.valor = document.getElementById(`id_${e.nome}`).value)
      );

    if (location.search.length) {
      const itensRecebidos = Object.keys(queryDict).map((e) => {
        const achou = params.find((el) => el.nome == e);
        const pStyle = style("color", achou?.cor) || "";
        const inputStyle = style("background-color", achou?.cor) || "";
        return `
            <div class="card__item">
              <p class="card__title" ${achou ? pStyle : ""}> ${e} </p>
              <input id="id_${e}" 
                type="text" ${ !achou ? "readonly" : ""} 
                value="${decodeURI(queryDict[e])}" 
                ${inputStyle} oninput="onInput(event)"/>
            </div>
        `;
      });
      document.getElementById("itensRecebidos")
        .insertAdjacentHTML("beforeend", itensRecebidos.join(""));
    } else {
      const itensRecebidos = `
          <div style="text-align: center;"> 
            <p class="card__title">ops... tem parâmetros na Url??? </p> 
          </div>
        `;
      document.getElementById("itensRecebidos")
        .insertAdjacentHTML("beforeend", itensRecebidos);
    }

    if (params.find((e) => e.util == "enviar")) {
      const itensEnviados = params.filter((e) => e.util == "enviar")
        .map( (e) => `
          <div class="card__item">
            <p class="card__title" ${style("color", e?.cor)}>${e.nome}</p>
            <input 
              id="id_${e.nome}" 
              type="text" 
              value="" 
              ${style( "background-color", e?.cor)} 
              oninput="onInput(event)" />
          </div>
      `);
      document.getElementById("itensEnviados")
        .insertAdjacentHTML("beforeend", itensEnviados.join(""));
    } else {
      const itensEnviados = `
          <div style="text-align: center;"> 
            <p class="card__title">ops... sem parâmetros para enviar </p> 
          </div>
      `;
      document.getElementById("itensEnviados")
        .insertAdjacentHTML("beforeend", itensEnviados);
    }

    

    onInput = (event) => {
      addValues();
      urlEnvio = params.map((e, i) => i === 0 ? `${e.valor}?` : (i === 1 ) ? `${e.nome}=${e.valor}` : `&${e.nome}=${e.valor}`).join("");

      console.log(JSON.stringify(urlEnvio));
      

      const update = params.map((e) => {
        if (e.nome == "redirect_uri") {
          return `<span ${style("color", e?.cor)}> ${e.valor} </span>`;
        }
        return e.valor
          ? `<span ${style("color", e?.cor)}> &${e.nome}=${e.valor} </span>`
          : "";
      });

      return (document.getElementById("resultado").innerHTML = `
        <p> ${update.join("")} </p>
      `);
    };

    const myScript = (event) => console.log(event);

    const enviar = () => (window.location = `${redirect_uri.value}&code=${code}&id_token=${id_token}&state=${state}`);
    const calc = () => (window.location = "calc://");

    onInput();
  </script>
</body>

</html>
