
let btn = document.getElementById("btn-cep")
let localidade = document.getElementById("localidade")
let bairro = document.getElementById("bairro")
let logradouro = document.getElementById("logradouro")
let uf = document.getElementById("uf")

let err = document.getElementById("error")


btn.addEventListener("click", () => {
    let cep = document.getElementById("input-cep").value

    verifyLength(cep)

    let api = `https://viacep.com.br/ws/${cep}/json/`


    fetch(api)
        .then(res => {
            if (!res.ok) {
                throw Error(res.statusText)
            }

            return res.json()
        })
        .then(data => {
            alterarDados(localidade, bairro, uf, logradouro, data)
        })


})

function verifyLength(cep) {
    if (cep.length !== 8) {
        localidade.innerHTML = ""
        uf.innerHTML = "" 
        bairro.innerHTML = ""
        logradouro.innerHTML = ""
        err.style.display = "block"
        return
    }
    err.style.display = "none"

}


function alterarDados(localidade, uf, bairro, logradouro, data) {
    if (data.logradouro == null || data.uf == null || data.bairro == null || data.localidade == null) {
        localidade.innerHTML = ""
        uf.innerHTML = "" 
        bairro.innerHTML = ""
        logradouro.innerHTML = ""
        return
    }
    localidade.innerHTML = "localidade: " + data.localidade
    uf.innerHTML = "uf: " + data.uf
    bairro.innerHTML = "bairro: " + data.bairro
    logradouro.innerHTML = "logradouro: " + data.logradouro
}