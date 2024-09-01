const lBotaoCarregarImagem = document.getElementById("upload-btn");
const lEntradaArquivoImagem = document.getElementById("image-upload");

lBotaoCarregarImagem.addEventListener("click", function(){
    lEntradaArquivoImagem.click();
});

function lerConteudoDoArquivo(pArquivo){
    return new Promise(function(pResolucao, pRejeicao) {
        const lLeitorDeArquivo = new FileReader();
        lLeitorDeArquivo.onload = function () {
            pResolucao({url: lLeitorDeArquivo.result, nome: pArquivo.name})
        };

        lLeitorDeArquivo.onerror = function () {
            pRejeicao(`Erro na leitura do arquivo ${pArquivo.name}`)
        };

        lLeitorDeArquivo.readAsDataURL(pArquivo);
    });
}

const lImagemPrincipal = document.querySelector(".main-imagem"); 
const lNomeDaImagemPrincipal = document.querySelector(".container-imagem-nome p"); 

lEntradaArquivoImagem.addEventListener("change", async function(pEvento){
    const lArquivoDeImagem = pEvento.target.files[0];
    
    if (lArquivoDeImagem){
        try {
            const lConteudoDoArquivoDeImagem = await lerConteudoDoArquivo(lArquivoDeImagem);
            lImagemPrincipal.src = lConteudoDoArquivoDeImagem.url;
            lNomeDaImagemPrincipal.textContent = lConteudoDoArquivoDeImagem.nome;
        } catch (lErro) {
            console.error("Erro na leitura do arquivo");
        }
    }
});

const lEntradaDeCategoria = document.getElementById("categoria");
const lListaDeCategorias = document.getElementById("lista-tags");

lListaDeCategorias.addEventListener("click", function(pEvento){
    if (pEvento.target.classList.contains("remove-tag")){
        const lItemCategoria = pEvento.target.parentElement;
        lListaDeCategorias.removeChild(lItemCategoria);
    }
});

const lCategoriasDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "Javascript"];

async function verificarCategoriaDisponivel(pCategoria) {
    return new Promise(function(pResolucao){
        setTimeout(function(){
            pResolucao(lCategoriasDisponiveis.includes(pCategoria));
        }, 1000);
    });
}

lEntradaDeCategoria.addEventListener("keypress", async function(pEvento){
    if (pEvento.key === "Enter"){
        pEvento.preventDefault();
        const lCategoria = lEntradaDeCategoria.value.trim();
        if (lCategoria !== ""){
            try {
                const lCategoriaEstaDisponivel = await verificarCategoriaDisponivel(lCategoria);
                if (lCategoriaEstaDisponivel){
                    const lNovoItemCategoria = document.createElement("li");
                    lNovoItemCategoria.innerHTML = `<p>${lCategoria}</p><img src="img/close-black.svg" class="remove-tag">`;
                    lListaDeCategorias.appendChild(lNovoItemCategoria);
                    lEntradaDeCategoria.value = "";
                } else {
                    alert("Categoria indisponível!");
                }
            } catch (lErro) {
                console.error("Erro ao verificar existencia da tag!")   
                alert("Erro ao verificar existencia da tag! Verifique o console!") 
            }
        }
    }
});

const lBotaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(pNome, pDescricao, pCategorias) {
    return new Promise(function(pResolucao, pRejeicao){
        setTimeout(function(){
            const lDeuCerto = Math.random() > 0.5;

            if (lDeuCerto){
                pResolucao("Projeto publicado com sucesso!");
            } else {
                pRejeicao("Erro ao publicar o projeto!")
            }
        }, 2000)
    });
}

lBotaoPublicar.addEventListener("click", async function(pEvento){
    pEvento.preventDefault();
    const lNomeDoProjeto = document.getElementById("nome").value;
    const lDescricaoDoProjeto = document.getElementById("descricao").value;
    const lCategoriasDoProjeto = Array.from(lListaDeCategorias.querySelectorAll("p")).map(function(lCategoria){
        return lCategoria.textContent;
    });

    try {
        const lResultado = await publicarProjeto(lNomeDoProjeto, lDescricaoDoProjeto, lCategoriasDoProjeto);
        console.log(lResultado);
        alert(lResultado);    
    } catch (lErro) {
        console.error(lErro);
        alert(lErro);    
    }
});

const lBotaoDescartar = document.querySelector(".botao-descartar");

lBotaoDescartar.addEventListener("click", function(pEvento){
    pEvento.preventDefault();

    const lFormulario = document.querySelector("form");
    lFormulario.reset();

    lImagemPrincipal.src = "./img/imagem1.png";
    lNomeDaImagemPrincipal.textContent = "image_projeto.png";
    lListaDeCategorias.innerHTML = "";
});
