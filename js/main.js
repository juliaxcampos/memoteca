import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);

    const inputBusca = document.getElementById("campo-busca");
    inputBusca.addEventListener("input", manipularBusca);
    
    const cancelar = document.getElementById("botao-cancelar");
    cancelar.addEventListener("click", manipularCancelamento);

});

async function manipularSubmissaoFormulario(event) {    
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value;
   
    if (!validarData(data)) {
        alert ("Não é permitido o cadastro com datas futuras. Selecione outra data.")
    } else {
        try {
            if (id) {
                await api.editarPensamento({ id, conteudo, autoria, data });
            } else {
            await api.salvarPensamentos({ conteudo, autoria, data }); 
            }
            ui.renderizarPensamentos();
        } catch (error) {
            alert("Erro ao salvar pensamento");
            throw error; 
        }
    }
}

async function manipularCancelamento() {
    ui.limparFormulario();
}

async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
    } catch (error) {
        alert ("Erro ao realizar busca");
        throw error;
    }
}
    
function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}