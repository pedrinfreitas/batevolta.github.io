let queryDict = {};

location.search
  .substr(1)
  .split("&")
  .forEach((e) => (queryDict[e.split("=")[0]] = e.split("=")[1]));

// const {
//   response_type,
//   client_id,
//   redirect_uri,
//   scope,
//   state,
//   nonce,
//   request,
//   ...outros
// } = { ...queryDict };

if (Object.keys(queryDict).length > 1) {
  const itens = Object.keys(queryDict).map((key, i) => `
    <div class="card__item">
      <p class="card__title">${key} </p>
      <input id="id_${key}" type="text" value="${decodeURI(queryDict[key])}"/>
    </div>
  `);
  document.getElementById('itens').insertAdjacentHTML('beforeend', itens.join(''));
} else {
  const itens = `
    <div style="text-align: center;"> 
      <p class="card__title">ops... tem parâmetros na Url??? </p> 
    </div>
  `;
  document.getElementById('itens').insertAdjacentHTML('beforeend', itens);
}

function enviar() {
  const redirect_uri = document.getElementById('id_redirect_uri').value;
  const state = document.getElementById('id_state').value;
  const code = document.getElementById('id_code').value;
  const id_token = document.getElementById('id_id_token').value;
  
  window.location = `${redirect_uri}&code=${code}&id_token=${id_token}&state=${state}`;
}

function calc() {
  window.location = "calc://";
}
