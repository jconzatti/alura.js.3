const lBotaoCarregarImagem = document.getElementById("botao-carregar-imagem");
const lEntradaArquivoImagem = document.getElementById("arquivo-imagem");

lBotaoCarregarImagem.addEventListener("click", function(){
    lEntradaArquivoImagem.click();
});

const lImagem = document.getElementById("imagem");
const lNomeDaImagem = document.getElementById("nome-imagem");

lEntradaArquivoImagem.addEventListener("change", async function(pEvento){
    const lArquivo = pEvento.target.files[0];
    if (lArquivo){
        try {
            const lDadosDoArquivo = await lerConteudoDoArquivo(lArquivo);
            lImagem.src = lDadosDoArquivo.conteudoBase64;
            lNomeDaImagem.textContent = lDadosDoArquivo.nome;
        } catch (lErro) {
            console.error("Erro ao ler arquivo de imagem!")  
        }
    }
});

function lerConteudoDoArquivo(pArquivo) {
    return new Promise((pResolucao, pRejeicao) => {
        const lLeitorDeArquivo = new FileReader();
        
        lLeitorDeArquivo.onload = () => {
            pResolucao({
                conteudoBase64: lLeitorDeArquivo.result,
                nome: pArquivo.name
            });
        };

        lLeitorDeArquivo.onerror = () => {
            pRejeicao(`Erro na leitura do arquivo: ${pArquivo.name}`);
        };

        lLeitorDeArquivo.readAsDataURL(pArquivo);
    });
}