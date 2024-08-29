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

lEntradaDeCategoria.addEventListener("keypress", function(pEvento){
    if (pEvento.key === "Enter"){
        pEvento.preventDefault();
        const lCategoria = lEntradaDeCategoria.value.trim();
        if (lCategoria !== ""){
            const lNovoItemCategoria = document.createElement("li");
            lNovoItemCategoria.innerHTML = `<p>${lCategoria}</p><img src="img/close-black.svg" class="remove-tag">`;
            lListaDeCategorias.appendChild(lNovoItemCategoria);
            lEntradaDeCategoria.value = "";
        }
    }
});

lListaDeCategorias.addEventListener("click", function(pEvento){
    if (pEvento.target.classList.contains("remove-tag")){
        const lItemCategoria = pEvento.target.parentElement;
        lListaDeCategorias.removeChild(lItemCategoria);
    }
});