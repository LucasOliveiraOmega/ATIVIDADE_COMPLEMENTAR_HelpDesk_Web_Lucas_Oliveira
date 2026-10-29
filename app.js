// ======================================================================
// AULA 02 - SPA COM JAVASCRIPT PURO
// ======================================================================

// Array com dados temporários.
// Eles existem apenas enquanto a página está aberta.
const prioridades = ["Baixa", "Média", "Alta"];

const chamados = [
    {
        // Identificador único deste exemplo.
        id: 1,

        // Título curto.
        titulo: "Computador não liga",

        // Descrição detalhada.
        descricao: "O computador não apresenta sinal de energia.",

        // Prioridade do atendimento.
        prioridade: "Alta",

        // Situação atual.
        status: "Aberto"
    },
    {
        id: 2,
        titulo: "Senha bloqueada",
        descricao: "Usuário não consegue acessar o sistema.",
        prioridade: "Média",
        status: "Em atendimento"
    },
    {
        // Identificador único deste exemplo.
        id: 3,

        // Título curto.
        titulo: "notebook não liga",

        // Descrição detalhada.
        descricao: "O computador não apresenta sinal de energia.",

        // Prioridade do atendimento.
        prioridade: "Alta",

        // Situação atual.
        status: "Encerrado"
    }
];

// Procura o elemento <div id="app">.
// Guardaremos a referência para alterar a tela.
const app = document.getElementById("app");

function obterBadgePrioridade(prioridade) {
    if (prioridade === "Alta" || prioridade === "Urgente") {
        return `<span class="badge badge-prioridade-alta badge-piscar">${prioridade}</span>`;
    }
    if (prioridade === "Média") {
        return `<span class="badge badge-prioridade-media">Média</span>`;
    }
    if (prioridade === "Baixa") {
        return `<span class="badge badge-prioridade-baixa">Baixa</span>`;
    }
   
    return `<span class="badge bg-secondary">${prioridade}</span>`;
}

function obterBadgeStatus(status) {
    if (status === "Aberto") {
        return `<span class="badge badge-status-aberto">Aberto</span>`;
    }
    if (status === "Em atendimento") {
        return `<span class="badge badge-status-atendimento">Em atendimento</span>`;
    }
    if (status === "Encerrado") {
        return `<span class="badge badge-status-encerrado">Encerrado</span>`;
    }
    return `<span class="badge bg-secondary">${status}</span>`;
}

function atualizarLinkAtivo(viewName) {
    const linksNav = document.querySelectorAll(".navbar-nav [data-view]");
    linksNav.forEach(link => {
        if (link.dataset.view === viewName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Função que desenha o Dashboard.
function mostrarDashboard() {

    atualizarLinkAtivo("dashboard");

    const total = chamados.length;

    const abertos = chamados.filter(c => c.status === "Aberto").length;

    const emAtendimento = chamados.filter(c => c.status === "Em atendimento").length;

    const encerrados = chamados.filter(c => c.status === "Encerrado").length;

    const prioridadeAlta = chamados.filter(c => c.prioridade === "Alta").length;

    app.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="h2 mb-1">Dashboard</h1>
                <p class="text-muted mb-0">Visão geral e métricas em tempo real dos chamados</p>
            </div>
            <div>
                <button class="btn btn-primary" onclick="mostrarNovoChamado()">
                    + Novo Chamado
                </button>
            </div>
        </div>

        <div class="row g-3">
            <!-- Total de chamados -->
            <div class="col-sm-6 col-lg-4">
                <div class="card card-dashboard border-secondary shadow-sm h-100">
                    <div class="card-body">
                        <h2 class="h6 text-uppercase text-secondary fw-bold">Total de Chamados</h2>
                        <p class="display-5 fw-bold text-dark my-2">${total}</p>
                        <small class="text-muted">Chamados registrados no sistema</small>
                    </div>
                </div>
            </div>

            <!-- Chamados Abertos -->
            <div class="col-sm-6 col-lg-4">
                <div class="card card-dashboard border-primary shadow-sm h-100">
                    <div class="card-body">
                        <h2 class="h6 text-uppercase text-primary fw-bold">Chamados Abertos</h2>
                        <p class="display-5 fw-bold text-primary my-2">${abertos}</p>
                        <small class="text-muted">Aguardando início do atendimento</small>
                    </div>
                </div>
            </div>

            <!-- Chamados Em Atendimento -->
            <div class="col-sm-6 col-lg-4">
                <div class="card card-dashboard border-warning shadow-sm h-100">
                    <div class="card-body">
                        <h2 class="h6 text-uppercase text-warning-emphasis fw-bold">Em Atendimento</h2>
                        <p class="display-5 fw-bold text-warning-emphasis my-2">${emAtendimento}</p>
                        <small class="text-muted">Em processo de resolução</small>
                    </div>
                </div>
            </div>

            <!-- Chamados Encerrados -->
            <div class="col-sm-6 col-lg-6">
                <div class="card card-dashboard border-success shadow-sm h-100">
                    <div class="card-body">
                        <h2 class="h6 text-uppercase text-success fw-bold">Chamados Encerrados</h2>
                        <p class="display-5 fw-bold text-success my-2">${encerrados}</p>
                        <small class="text-muted">Concluídos com procedimento registrado</small>
                    </div>
                </div>
            </div>

            <!-- Chamados de Prioridade Alta -->
            <div class="col-sm-12 col-lg-6">
                <div class="card card-dashboard border-danger shadow-sm h-100">
                    <div class="card-body">
                        <h2 class="h6 text-uppercase text-danger fw-bold">Prioridade Alta</h2>
                        <p class="display-5 fw-bold text-danger my-2">${prioridadeAlta}</p>
                        <small class="text-muted">Casos críticos que exigem urgência</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função que desenha a listagem.
function mostrarChamados() {
  atualizarLinkAtivo("chamados");

    app.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="h2 mb-1">Chamados</h1>
                <p class="text-muted mb-0">Consulte, visualize detalhes e gerencie os chamados</p>
            </div>
            <button class="btn btn-success" onclick="mostrarNovoChamado()">
                + Novo Chamado
            </button>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover table-striped align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th style="width: 80px;">ID</th>
                                <th>Título</th>
                                <th style="width: 140px;">Prioridade</th>
                                <th style="width: 160px;">Status</th>
                                <th style="width: 220px;" class="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                chamados.length === 0
                                ? `
                                    <tr>
                                        <td colspan="5" class="text-center py-4 text-muted">
                                            Nenhum chamado registrado no momento.
                                        </td>
                                    </tr>
                                `
                                : chamados.map(chamado => `
                                    <tr>
                                        <td><strong>#${chamado.id}</strong></td>
                                        <td>${chamado.titulo}</td>
                                        <td>${obterBadgePrioridade(chamado.prioridade)}</td>
                                        <td>${obterBadgeStatus(chamado.status)}</td>
                                        <td class="text-center">
                                            <div class="btn-group btn-group-sm" role="group">
                                                <!-- Botão de Visualização -->
                                                <button 
                                                    class="btn btn-outline-primary" 
                                                    onclick="mostrarDetalhes(${chamado.id})"
                                                    title="Visualizar detalhes completos">
                                                    Visualizar
                                                </button>

                                                <!-- Botão de Encerramento (Desabilitado se já encerrado) -->
                                                ${
                                                    chamado.status !== "Encerrado"
                                                    ? `
                                                        <button 
                                                            class="btn btn-outline-danger" 
                                                            onclick="mostrarEncerrar(${chamado.id})"
                                                            title="Encerrar chamado">
                                                            Encerrar
                                                        </button>
                                                    `
                                                    : `
                                                        <button 
                                                            class="btn btn-outline-secondary" 
                                                            disabled 
                                                            title="Chamado já foi encerrado">
                                                            Encerrado
                                                        </button>
                                                    `
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                `).join("")
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Função que desenha o formulário.
function mostrarNovoChamado() {
     atualizarLinkAtivo("novo");

    app.innerHTML = `
        <div class="mb-4">
            <h1 class="h2 mb-1">Novo Chamado</h1>
            <p class="text-muted">Preencha os campos abaixo para abrir uma solicitação</p>
        </div>

        <div class="card shadow-sm border-0 col-lg-8">
            <div class="card-body p-4">
                <form id="formChamado">
                    <div class="mb-3">
                        <label class="form-label fw-bold" for="titulo">
                            Título <span class="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="titulo"
                            placeholder="Ex: Computador não liga"
                            required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold" for="descricao">
                            Descrição
                        </label>
                        <textarea
                            class="form-control"
                            id="descricao"
                            rows="4"
                            placeholder="Descreva o problema ocorrido..."></textarea>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold" for="prioridade">
                            Prioridade <span class="text-danger">*</span>
                        </label>
                        <!-- Select preenchido dinamicamente via JavaScript -->
                        <select class="form-select" id="prioridade" required>
                            <option value="">Selecione uma prioridade</option>
                            ${
                                prioridades.map(p => `
                                    <option value="${p}">${p}</option>
                                `).join("")
                            }
                        </select>
                        <div class="form-text">
                            Opções geradas dinamicamente a partir do array de prioridades.
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-success px-4" type="submit">
                            Cadastrar
                        </button>
                        <button class="btn btn-outline-secondary" type="button" onclick="mostrarChamados()">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Procura o formulário que acabou de ser criado.
    const formulario = document.getElementById("formChamado");

    // Escuta o envio do formulário.
    formulario.addEventListener("submit", cadastrarChamado);
}


function cadastrarChamado(evento) {
    evento.preventDefault();

    const tituloInput = document.getElementById("titulo");
    const descricaoInput = document.getElementById("descricao");
    const prioridadeSelect = document.getElementById("prioridade");

    const titulo = tituloInput.value.trim();
    const descricao = descricaoInput.value.trim();
    const prioridade = prioridadeSelect.value;

      if (!titulo || !prioridade) {
        alert("Por favor, preencha os campos obrigatórios (Título e Prioridade).");
        return;
    }

      const proximoId = chamados.length > 0 
        ? Math.max(...chamados.map(c => c.id)) + 1 
        : 1;

    chamados.push({
        id: proximoId,
        titulo: titulo,
        descricao: descricao,
        prioridade: prioridade,
        status: "Aberto",
        solucao: ""
    });

    mostrarChamados();
}

function mostrarEncerrar(id) {
    atualizarLinkAtivo(null);

    const chamado = chamados.find(c => c.id === Number(id));

    if (!chamado) {
        alert("Chamado não encontrado.");
        mostrarChamados();
        return;
    }

    if (chamado.status === "Encerrado") {
        alert("Este chamado já se encontra encerrado.");
        mostrarChamados();
        return;
    }

    app.innerHTML = `
        <div class="mb-4">
            <h1 class="h2 mb-1">Encerrar Chamado #${chamado.id}</h1>
            <p class="text-muted">Confira os dados do chamado e registre a solução realizada</p>
        </div>

        <div class="card shadow-sm border-0 col-lg-8">
            <div class="card-body p-4">
                <!-- Informações do chamado a ser encerrado -->
                <div class="info-box mb-4">
                    <h5 class="card-title text-dark mb-3">Informações do Chamado</h5>
                    <div class="row g-2">
                        <div class="col-sm-4 text-muted">Chamado:</div>
                        <div class="col-sm-8 fw-bold">#${chamado.id}</div>

                        <div class="col-sm-4 text-muted">Problema / Título:</div>
                        <div class="col-sm-8 fw-bold">${chamado.titulo}</div>

                        <div class="col-sm-4 text-muted">Descrição:</div>
                        <div class="col-sm-8">${chamado.descricao || "Sem descrição informada."}</div>

                        <div class="col-sm-4 text-muted">Prioridade:</div>
                        <div class="col-sm-8">${obterBadgePrioridade(chamado.prioridade)}</div>

                        <div class="col-sm-4 text-muted">Status atual:</div>
                        <div class="col-sm-8">${obterBadgeStatus(chamado.status)}</div>
                    </div>
                </div>

                    <form id="formEncerrar">
                    <div class="mb-3">
                        <label class="form-label fw-bold" for="solucao">
                            O que foi feito? (Solução / Procedimento realizado) <span class="text-danger">*</span>
                        </label>
                        <textarea
                            class="form-control"
                            id="solucao"
                            rows="4"
                            placeholder="Descreva detalhadamente o procedimento utilizado para resolver o problema..."
                            required></textarea>
                        <div id="msgValidacao" class="text-danger small mt-1 d-none">
                            O preenchimento do procedimento/solução é obrigatório para encerrar o chamado.
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-danger px-4" type="submit">
                            Confirmar encerramento
                        </button>
                        <button class="btn btn-outline-secondary" type="button" onclick="mostrarChamados()">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const formEncerrar = document.getElementById("formEncerrar");
    formEncerrar.addEventListener("submit", evento => {
        evento.preventDefault();

        const campoSolucao = document.getElementById("solucao");
        const msgValidacao = document.getElementById("msgValidacao");
        const solucaoDigitada = campoSolucao.value.trim();

              if (!solucaoDigitada) {
            campoSolucao.classList.add("is-invalid");
            msgValidacao.classList.remove("d-none");
            campoSolucao.focus();
            return;
        }

        chamado.solucao = solucaoDigitada;
        chamado.status = "Encerrado";

        mostrarChamados();
    });
}

function mostrarDetalhes(id) {
    atualizarLinkAtivo(null);

    const chamado = chamados.find(c => c.id === Number(id));

    if (!chamado) {
        alert("Chamado não encontrado.");
        mostrarChamados();
        return;
    }

    const estaEncerrado = chamado.status === "Encerrado";

    app.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="h2 mb-1">Detalhes do Chamado #${chamado.id}</h1>
                <p class="text-muted mb-0">Informações completas e histórico da solicitação</p>
            </div>
            <button class="btn btn-outline-secondary" onclick="mostrarChamados()">
                &larr; Voltar para Chamados
            </button>
        </div>

        <div class="card shadow-sm border-0 col-lg-8">
            <div class="card-body p-4">
                <!-- Informações principais -->
                <div class="info-box mb-4">
                    <h5 class="card-title text-dark mb-3">Dados do Chamado</h5>
                    <div class="row g-2">
                        <div class="col-sm-4 text-muted">Número:</div>
                        <div class="col-sm-8 fw-bold">#${chamado.id}</div>

                        <div class="col-sm-4 text-muted">Título:</div>
                        <div class="col-sm-8 fw-bold">${chamado.titulo}</div>

                        <div class="col-sm-4 text-muted">Descrição:</div>
                        <div class="col-sm-8">${chamado.descricao || "Sem descrição informada."}</div>

                        <div class="col-sm-4 text-muted">Prioridade:</div>
                        <div class="col-sm-8">${obterBadgePrioridade(chamado.prioridade)}</div>

                        <div class="col-sm-4 text-muted">Status:</div>
                        <div class="col-sm-8">${obterBadgeStatus(chamado.status)}</div>
                    </div>
                </div>

                <!-- Seção de Solução / Procedimento -->
                ${
                    estaEncerrado
                    ? `
                        <div class="solucao-box mb-4">
                            <h5 class="text-success fw-bold mb-2">Procedimento Realizado / Solução</h5>
                            <p class="mb-0 text-dark" style="white-space: pre-wrap;">${chamado.solucao ? chamado.solucao : "Nenhum detalhe informado."}</p>
                        </div>
                    `
                    : `
                        <div class="alert alert-info d-flex align-items-center mb-4" role="alert">
                            <div>
                                Este chamado ainda está <strong>${chamado.status}</strong>. A solução será registrada assim que o chamado for encerrado.
                            </div>
                        </div>
                    `
                }

                <div class="d-flex gap-2">
                    <button class="btn btn-secondary" onclick="mostrarChamados()">
                        Voltar para a Lista
                    </button>
                    ${
                        !estaEncerrado
                        ? `
                            <button class="btn btn-danger" onclick="mostrarEncerrar(${chamado.id})">
                                Encerrar este chamado
                            </button>
                        `
                        : ""
                    }
                </div>
            </div>
        </div>
    `;
}

// Seleciona todos os elementos que têm data-view.
const links = document.querySelectorAll("[data-view]");

// Percorre os links.
links.forEach(link => {

    // Escuta clique.
    link.addEventListener("click", evento => {

        // Impede navegação padrão.
        evento.preventDefault();

        // Lê data-view.
        const view = link.dataset.view;

        // Decide qual "tela" mostrar.
        if (view === "dashboard") {
            mostrarDashboard();
        }

        if (view === "chamados") {
            mostrarChamados();
        }

        if (view === "novo") {
            mostrarNovoChamado();
        }
    });
});

window.chamados = chamados;
window.prioridades = prioridades;
window.mostrarDashboard = mostrarDashboard;
window.mostrarChamados = mostrarChamados;
window.mostrarNovoChamado = mostrarNovoChamado;
window.mostrarEncerrar = mostrarEncerrar;
window.mostrarDetalhes = mostrarDetalhes;

// Primeira tela.
mostrarDashboard();
