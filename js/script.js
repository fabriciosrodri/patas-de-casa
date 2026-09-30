/* =========================================================
   PATAS DE CASA — Script principal
   1. Configuração e dados dos cães
   2. Navegação entre páginas (pelo # da URL)
   3. Galeria com filtros
   4. Perfil de cada cão
   5. Formulário "Divulgue um cão"
   6. Menu do celular e detalhes finais
   ========================================================= */

/* ---------- 1. Configuração ---------- */

// Número do administrador no formato internacional: 55 (Brasil) + DDD + número
const WHATSAPP = "5514996895439";
const WHATSAPP_EXIBICAO = "(14) 99689-5439";

// Monta um link do WhatsApp com a mensagem já escrita
function linkWhats(mensagem) {
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem);
}

// Dados dos cães (fictícios). Idade em anos; 0.5 = 6 meses.
const CAES = [
  {
    id: "caramelo", nome: "Caramelo", sexo: "Macho", idade: 2, porte: "Médio", peso: 14,
    raca: "Sem raça definida", cidade: "Sorocaba, SP",
    tracos: ["Brincalhão", "Leal"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Caramelo apareceu numa praça do centro, sempre no mesmo banco, esperando alguém que nunca voltou. Hoje ele recebe todo mundo abanando o rabo, adora buscar gravetos e dorme melhor quando tem alguém por perto. É o típico vira-lata brasileiro: esperto, resistente e cheio de amor para dar."
  },
  {
    id: "pipoca", nome: "Pipoca", sexo: "Fêmea", idade: 1, porte: "Médio", peso: 16,
    raca: "SRD, mistura de border collie", cidade: "Votorantim, SP",
    tracos: ["Energética", "Inteligente"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: false },
    historia: "Pipoca aprende um comando novo em poucos minutos e já sabe sentar, deitar e dar a pata. Por ter muita energia, combina com uma família que goste de caminhadas longas ou tenha um quintal para correr. Com atividade, é a companheira mais atenta que você vai conhecer."
  },
  {
    id: "luna", nome: "Luna", sexo: "Fêmea", idade: 5, porte: "Grande", peso: 28,
    raca: "Sem raça definida", cidade: "Sorocaba, SP",
    tracos: ["Calma", "Companheira"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Luna viveu anos presa numa corrente curta até ser resgatada por uma voluntária. Mesmo assim, não guardou mágoa: é tranquila, anda bem na guia e gosta de ficar deitada perto dos pés de quem ama. Ideal para quem procura uma cadela serena e fiel."
  },
  {
    id: "nina", nome: "Nina", sexo: "Fêmea", idade: 3, porte: "Médio", peso: 18,
    raca: "Sem raça definida", cidade: "Votorantim, SP",
    tracos: ["Carinhosa", "Tranquila"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Cães de pelagem preta costumam esperar mais tempo por uma família, e Nina é prova de como isso é injusto. Ela encosta a cabeça no colo pedindo carinho, convive bem com outros cães e não faz barulho. Está no abrigo há mais de um ano esperando uma chance."
  },
  {
    id: "algodao", nome: "Algodão", sexo: "Macho", idade: 0.7, porte: "Médio", peso: 12,
    raca: "SRD, pelagem encaracolada", cidade: "Jaú, SP",
    tracos: ["Curioso", "Dócil"],
    saude: { vacinado: true, castrado: false, vermifugado: true, microchip: false },
    historia: "Algodão foi encontrado com os irmãos numa caixa de papelão na beira da estrada. Todos já foram adotados, menos ele. Curioso, investiga cada canto da casa e ama brinquedos de pelúcia. A castração já está agendada e vai junto com ele para a família nova."
  },
  {
    id: "bolota", nome: "Bolota", sexo: "Macho", idade: 0.5, porte: "Médio", peso: 9,
    raca: "SRD, mistura de beagle", cidade: "Votorantim, SP",
    tracos: ["Farejador", "Alegre"],
    saude: { vacinado: true, castrado: false, vermifugado: true, microchip: false },
    historia: "Bolota vive com o focinho no chão, seguindo qualquer cheiro interessante. É um filhote alegre, que já aprendeu a fazer as necessidades no tapete higiênico. Vai precisar de paciência nos primeiros meses e retribuir com muita festa na porta."
  },
  {
    id: "biscoito", nome: "Biscoito", sexo: "Macho", idade: 4, porte: "Pequeno", peso: 11,
    raca: "SRD, mistura de corgi", cidade: "Marília, SP",
    tracos: ["Sociável", "Adora água"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Biscoito foi devolvido quando a antiga família se mudou para um apartamento que não aceitava animais. Ele não entendeu nada, mas continua sorrindo. Ama piscina, mangueira e qualquer poça d'água, e se dá bem com crianças e gatos."
  },
  {
    id: "thor", nome: "Thor", sexo: "Macho", idade: 6, porte: "Grande", peso: 32,
    raca: "Pastor alemão", cidade: "Sorocaba, SP",
    tracos: ["Protetor", "Obediente"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Thor trabalhou anos como cão de guarda numa empresa que fechou as portas. Por baixo da pose séria existe um cachorro obediente, que conhece vários comandos e adora uma bola. Precisa de espaço e de um tutor com experiência em cães grandes."
  },
  {
    id: "zeus", nome: "Zeus", sexo: "Macho", idade: 3, porte: "Grande", peso: 25,
    raca: "SRD, mistura de husky", cidade: "Sorocaba, SP",
    tracos: ["Aventureiro", "Falante"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Zeus \"conversa\" com uivos curtos sempre que fica feliz. Ele adora correr e passear em trilhas, então combina com gente ativa. Foi resgatado vagando numa rodovia e se recuperou totalmente. Precisa de muro alto: é um ótimo escapista."
  },
  {
    id: "mel", nome: "Mel", sexo: "Fêmea", idade: 0.3, porte: "Grande", peso: 10,
    raca: "SRD, mistura de golden retriever", cidade: "Votorantim, SP",
    tracos: ["Doce", "Brincalhona"],
    saude: { vacinado: false, castrado: false, vermifugado: true, microchip: false },
    historia: "Mel tem 4 meses e ainda está completando o ciclo de vacinas, que continua com a família adotante. Vai ficar grande, por volta de 25 kg, e tem todo o jeitinho dócil dos goldens. Adora morder cadarço e dormir de barriga para cima."
  },
  {
    id: "bento", nome: "Bento", sexo: "Macho", idade: 7, porte: "Pequeno", peso: 8,
    raca: "Pug", cidade: "Marília, SP",
    tracos: ["Sossegado", "Afetuoso"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Bento prefere sofá a passeio longo e ronca alto quando está feliz. Como todo pug, precisa evitar calor forte e exercício pesado. É perfeito para apartamento e para quem trabalha em casa e quer uma companhia tranquila o dia inteiro."
  },
  {
    id: "chico", nome: "Chico", sexo: "Macho", idade: 9, porte: "Médio", peso: 13,
    raca: "Cocker spaniel", cidade: "Sorocaba, SP",
    tracos: ["Sereno", "Ama bolinhas"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Chico ficou sozinho quando o tutor, um senhor de 80 anos, foi morar com a filha. Cães idosos raramente são escolhidos, mas são os mais gratos. Chico ainda brinca de bolinha todos os dias, já sabe as regras da casa e só quer um canto macio para envelhecer."
  },
  {
    id: "canela", nome: "Canela", sexo: "Fêmea", idade: 10, porte: "Grande", peso: 24,
    raca: "SRD, mistura de vizsla", cidade: "Jaú, SP",
    tracos: ["Gentil", "Paciente"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Canela é a veterana do abrigo e ajuda a acalmar os filhotes que chegam assustados. Tem o focinho grisalho, anda devagar e adora sol da manhã. Faz check-up a cada seis meses e está com a saúde em dia. Merece passar os próximos anos numa casa de verdade."
  },
  {
    id: "frida", nome: "Frida", sexo: "Fêmea", idade: 2, porte: "Pequeno", peso: 7,
    raca: "Dachshund (salsicha)", cidade: "Sorocaba, SP",
    tracos: ["Independente", "Esperta"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: true },
    historia: "Frida tem personalidade forte e sabe exatamente o que quer, principalmente na hora do petisco. Por causa da coluna longa, não deve subir e descer escadas o tempo todo. Em troca, é uma ótima vigia e se aconchega embaixo das cobertas no inverno."
  },
  {
    id: "faisca", nome: "Faísca", sexo: "Macho", idade: 1, porte: "Pequeno", peso: 6,
    raca: "Jack Russell terrier", cidade: "Sorocaba, SP",
    tracos: ["Agitado", "Divertido"],
    saude: { vacinado: true, castrado: true, vermifugado: true, microchip: false },
    historia: "Faísca é pequeno no tamanho e enorme na energia. Pula, corre, busca a bolinha cem vezes seguidas e ainda pede mais. Foi devolvido por \"dar trabalho\", mas com passeios diários vira outro cão. Ideal para quem pratica corrida ou tem crianças maiores."
  },
  {
    id: "nuvem", nome: "Nuvem", sexo: "Fêmea", idade: 0.4, porte: "Médio", peso: 8,
    raca: "SRD, mistura de samoieda", cidade: "Votorantim, SP",
    tracos: ["Fofa", "Sociável"],
    saude: { vacinado: true, castrado: false, vermifugado: true, microchip: false },
    historia: "Nuvem é uma bola de pelo branco que adora roubar chinelos. Nasceu num lar temporário e já convive com gatos, crianças e outros cães. A pelagem densa pede escovação duas vezes por semana, um momento que ela transforma em sessão de carinho."
  }
];

/* Funções de apoio para exibir idade e faixa etária */
function textoIdade(anos) {
  if (anos < 1) {
    const meses = Math.round(anos * 12);
    return meses + (meses === 1 ? " mês" : " meses");
  }
  return anos + (anos === 1 ? " ano" : " anos");
}
function faixaEtaria(anos) {
  if (anos < 1) return "Filhote";
  if (anos >= 8) return "Idoso";
  return "Adulto";
}
function mensagemAdocao(cao) {
  const artigo = cao.sexo === "Fêmea" ? "a" : "o";
  const pronome = cao.sexo === "Fêmea" ? "adotá-la" : "adotá-lo";
  return "Olá! Vi " + artigo + " " + cao.nome + " no site Patas de Casa e tenho interesse em " + pronome + ". Podemos conversar?";
}

/* Ícone do WhatsApp em SVG (reaproveitado nos botões) */
const ICONE_WHATS = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>';

/* ---------- 2. Navegação entre páginas ---------- */

// Cada página é uma <section data-page="nome">. O # da URL diz qual mostrar.
function mostrarPagina() {
  const hash = location.hash.replace("#", "") || "inicio";
  let pagina = hash;

  // Endereços do tipo #cao-thor abrem o perfil do cão
  if (hash.indexOf("cao-") === 0) {
    const cao = CAES.find(function (c) { return "cao-" + c.id === hash; });
    if (cao) { renderPerfil(cao); pagina = "cao"; } else { pagina = "caes"; }
  }
  if (!document.querySelector('[data-page="' + pagina + '"]')) pagina = "inicio";

  document.querySelectorAll("[data-page]").forEach(function (sec) {
    sec.hidden = sec.dataset.page !== pagina;
  });

  // Marca o link ativo no menu
  document.querySelectorAll(".menu a[data-link]").forEach(function (a) {
    const ativo = a.dataset.link === pagina || (pagina === "cao" && a.dataset.link === "caes");
    if (ativo) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });

  fecharMenu();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", mostrarPagina);

/* ---------- 3. Cards e galeria ---------- */

function cardCao(cao) {
  return (
    '<a class="dog-card" href="#cao-' + cao.id + '" aria-label="Ver perfil de ' + cao.nome + '">' +
      '<div class="photo">' +
        '<img src="img/' + cao.id + '.jpg" alt="' + cao.nome + ', cão ' + cao.porte.toLowerCase() + ' disponível para adoção" loading="lazy">' +
        '<span class="sex-tag">' + (cao.sexo === "Fêmea" ? "♀ Fêmea" : "♂ Macho") + "</span>" +
      "</div>" +
      '<div class="body">' +
        "<h3>" + cao.nome + " <small>" + textoIdade(cao.idade) + "</small></h3>" +
        '<p class="meta">Porte ' + cao.porte.toLowerCase() + " · " + cao.peso + " kg · " + cao.cidade + "</p>" +
        '<div class="chips">' + cao.tracos.map(function (t) { return '<span class="chip">' + t + "</span>"; }).join("") + "</div>" +
      "</div>" +
    "</a>"
  );
}

// Destaques da página inicial (os que esperam há mais tempo)
function renderDestaques() {
  const ids = ["nina", "chico", "caramelo", "biscoito"];
  document.getElementById("destaques").innerHTML = ids
    .map(function (id) { return cardCao(CAES.find(function (c) { return c.id === id; })); })
    .join("");
}

// Estado atual dos filtros
const filtros = { porte: "Todos", idade: "Todas", sexo: "Todos" };

function renderGaleria() {
  const lista = CAES.filter(function (c) {
    return (filtros.porte === "Todos" || c.porte === filtros.porte) &&
           (filtros.idade === "Todas" || faixaEtaria(c.idade) === filtros.idade) &&
           (filtros.sexo === "Todos" || c.sexo === filtros.sexo);
  });

  const grade = document.getElementById("galeria");
  const vazio = document.getElementById("galeria-vazia");
  grade.innerHTML = lista.map(cardCao).join("");
  vazio.hidden = lista.length > 0;
  document.getElementById("contagem").textContent =
    lista.length + (lista.length === 1 ? " cão encontrado" : " cães encontrados");
}

// Botões de filtro: cada grupo tem data-filtro="porte|idade|sexo"
document.querySelectorAll("[data-filtro]").forEach(function (grupo) {
  grupo.addEventListener("click", function (e) {
    const botao = e.target.closest("button");
    if (!botao) return;
    filtros[grupo.dataset.filtro] = botao.dataset.valor;
    grupo.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", b === botao ? "true" : "false");
    });
    renderGaleria();
  });
});

function limparFiltros() {
  filtros.porte = "Todos"; filtros.idade = "Todas"; filtros.sexo = "Todos";
  document.querySelectorAll("[data-filtro] button").forEach(function (b) {
    b.setAttribute("aria-pressed", b.dataset.valor === "Todos" || b.dataset.valor === "Todas" ? "true" : "false");
  });
  renderGaleria();
}
document.getElementById("limpar-filtros").addEventListener("click", limparFiltros);

/* ---------- 4. Perfil do cão ---------- */

function renderPerfil(cao) {
  const s = cao.saude;
  const itemSaude = function (ok, sim, nao) {
    return "<li" + (ok ? "" : ' class="pending"') + ">" + (ok ? sim : nao) + "</li>";
  };
  document.title = cao.nome + " · Patas de Casa";
  document.getElementById("perfil").innerHTML =
    '<div class="profile-photo"><img src="img/' + cao.id + '.jpg" alt="Foto de ' + cao.nome + '"></div>' +
    '<div class="profile-info">' +
      '<div><p class="eyebrow">' + faixaEtaria(cao.idade) + " · " + cao.cidade + "</p>" +
      "<h1>" + cao.nome + "</h1></div>" +
      '<div class="chips">' + cao.tracos.map(function (t) { return '<span class="chip">' + t + "</span>"; }).join("") + "</div>" +
      '<p class="lead">' + cao.historia + "</p>" +
      '<dl class="facts">' +
        "<div><dt>Idade</dt><dd>" + textoIdade(cao.idade) + "</dd></div>" +
        "<div><dt>Sexo</dt><dd>" + cao.sexo + "</dd></div>" +
        "<div><dt>Porte</dt><dd>" + cao.porte + " · " + cao.peso + " kg</dd></div>" +
        "<div><dt>Raça</dt><dd>" + cao.raca + "</dd></div>" +
      "</dl>" +
      '<div class="health"><h2>Carteirinha de saúde</h2><ul>' +
        itemSaude(s.vacinado, "Vacinas em dia (V10 e antirrábica)", "Vacinação em andamento") +
        itemSaude(s.vermifugado, "Vermifugado", "Vermifugação pendente") +
        itemSaude(s.castrado, "Castrado(a)", "Castração agendada") +
        itemSaude(s.microchip, "Microchipado(a)", "Microchip na adoção") +
      "</ul></div>" +
      '<div class="adopt-box">' +
        '<a class="btn btn-whats" href="' + linkWhats(mensagemAdocao(cao)) + '" target="_blank" rel="noopener">' +
          ICONE_WHATS + "Quero adotar " + (cao.sexo === "Fêmea" ? "a " : "o ") + cao.nome + "</a>" +
        "<p>Você fala direto com a nossa equipe pelo WhatsApp " + WHATSAPP_EXIBICAO + ". A mensagem já vai pronta com o nome " + (cao.sexo === "Fêmea" ? "da " : "do ") + cao.nome + ".</p>" +
      "</div>" +
    "</div>";
}

// Restaura o título original quando sair do perfil
const TITULO_ORIGINAL = document.title;
window.addEventListener("hashchange", function () {
  if (location.hash.indexOf("#cao-") !== 0) document.title = TITULO_ORIGINAL;
});

/* ---------- 5. Formulário "Divulgue um cão" ---------- */

const form = document.getElementById("form-divulgue");
const regras = {
  "d-nome":     { msg: "Informe o nome do cão." },
  "d-idade":    { msg: "Informe a idade aproximada." },
  "d-porte":    { msg: "Escolha o porte." },
  "d-sexo":     { msg: "Escolha o sexo." },
  "d-cidade":   { msg: "Informe a cidade." },
  "d-descricao":{ msg: "Conte um pouco sobre o cão (mínimo de 20 caracteres).", min: 20 },
  "d-contato":  { msg: "Informe seu nome." },
  "d-telefone": { msg: "Informe um telefone com DDD, só números (ex.: 14999998888).", telefone: true }
};

function validarCampo(id) {
  const campo = document.getElementById(id);
  const regra = regras[id];
  const valor = campo.value.trim();
  let valido = valor.length > 0;
  if (valido && regra.min) valido = valor.length >= regra.min;
  if (valido && regra.telefone) valido = /^\d{10,11}$/.test(valor.replace(/\D/g, ""));
  const caixa = campo.closest(".field");
  caixa.classList.toggle("invalid", !valido);
  caixa.querySelector(".error").textContent = valido ? "" : regra.msg;
  campo.setAttribute("aria-invalid", valido ? "false" : "true");
  return valido;
}

// Valida enquanto a pessoa corrige o campo
Object.keys(regras).forEach(function (id) {
  document.getElementById(id).addEventListener("blur", function () { validarCampo(id); });
});

form.addEventListener("submit", function (e) {
  e.preventDefault(); // o site não envia dados para servidor
  const invalidos = Object.keys(regras).filter(function (id) { return !validarCampo(id); });
  if (invalidos.length) { document.getElementById(invalidos[0]).focus(); return; }

  const v = function (id) { return document.getElementById(id).value.trim(); };
  const mensagem =
    "*Novo cão para divulgação — Patas de Casa*\n\n" +
    "Nome do cão: " + v("d-nome") + "\n" +
    "Idade: " + v("d-idade") + "\n" +
    "Porte: " + v("d-porte") + "\n" +
    "Sexo: " + v("d-sexo") + "\n" +
    "Cidade: " + v("d-cidade") + "\n" +
    "Sobre o cão: " + v("d-descricao") + "\n\n" +
    "Quem divulga: " + v("d-contato") + "\n" +
    "Telefone: " + v("d-telefone") + "\n\n" +
    "Vou enviar as fotos do cão nesta conversa.";

  document.getElementById("msg-preview").textContent = mensagem;
  document.getElementById("enviar-whats").href = linkWhats(mensagem);
  form.hidden = true;
  const sucesso = document.getElementById("divulgue-sucesso");
  sucesso.hidden = false;
  sucesso.querySelector("h3").focus();
});

// Copiar a mensagem (alternativa caso o WhatsApp não abra)
document.getElementById("copiar-msg").addEventListener("click", function () {
  const texto = document.getElementById("msg-preview").textContent;
  const botao = this;
  function confirmou() { botao.textContent = "Mensagem copiada"; }
  function selecionar() {
    const r = document.createRange();
    r.selectNodeContents(document.getElementById("msg-preview"));
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    botao.textContent = "Texto selecionado, use Ctrl+C";
  }
  if (navigator.clipboard) navigator.clipboard.writeText(texto).then(confirmou, selecionar);
  else selecionar();
});

document.getElementById("novo-anuncio").addEventListener("click", function () {
  form.reset();
  form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("invalid"); f.querySelector(".error").textContent = ""; });
  document.getElementById("divulgue-sucesso").hidden = true;
  form.hidden = false;
  document.getElementById("d-nome").focus();
});

/* ---------- 6. Menu do celular e detalhes ---------- */

const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
function fecharMenu() {
  menu.classList.remove("open");
  botaoMenu.setAttribute("aria-expanded", "false");
}
botaoMenu.addEventListener("click", function () {
  const aberto = menu.classList.toggle("open");
  botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
});
document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharMenu(); });

// Links do WhatsApp gerais (botão flutuante e contato)
document.querySelectorAll("[data-whats-geral]").forEach(function (a) {
  a.href = linkWhats("Olá! Vim pelo site Patas de Casa e gostaria de mais informações sobre adoção.");
});

// Copiar o número de contato
document.getElementById("copiar-numero").addEventListener("click", function () {
  const botao = this;
  const done = function () { botao.textContent = "Número copiado"; };
  if (navigator.clipboard) navigator.clipboard.writeText(WHATSAPP_EXIBICAO).then(done, function () {});
});

// Quantidade de cães esperando, usada em vários lugares
document.querySelectorAll("[data-total-caes]").forEach(function (el) { el.textContent = CAES.length; });
document.getElementById("ano").textContent = new Date().getFullYear();

// Inicialização
renderDestaques();
renderGaleria();
mostrarPagina();
