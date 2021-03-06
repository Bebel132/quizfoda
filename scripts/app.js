const questoes = [
    {
        questao: "quantos paises tem a angola?",
        respostas: [
            22,
            26,
            36,
            12
        ],
        respostaCorreta: 36
    },
    {
        questao: "como que tanka o Bostil?",
        respostas: [
            "tankando",
            "simplesmente intankavel o Bostil",
            "deixe o Bostil",
            "Essas horas eu me pergunto o por quê de Deus ter me feito brasileiro. Nunca maltratei criança, chutei velho, passei a rasteira em grávida e afins pra merecer tamanho sofrimento."
        ],
        respostaCorreta: "simplesmente intankavel o Bostil"
    },
    {
        questao: "o que estou fazendo agora",
        respostas: [
            "أفكر في امرأة جميلة",
            "estou atrás de você",
            "bo muçá",
            "eu te amo mãe"
        ],
        respostaCorreta: "أفكر في امرأة جميلة"
    },
    {
        questao: "Bem, você é gay?",
        respostas: [
            "yes",
            "hohoho",
            "no",
            "desliga o telefone*"
        ],
        respostaCorreta: "no"
    },
]

$('#final').hide();

let radio = $('.radio')
let erro = true;
let questao = 0;
let acertos = 0;
let qAcertadas = [];

$(".enviar").click(() => {
    let massa = []
    let c = 0
    for(let i = 0; i < 4; i++){
        massa.push(radio[i].checked)
        if(radio[i].checked){
            for(let a = 0; a < 4; a++){
                if(radio[i].value == questoes[a].respostaCorreta){
                    erro = false
                }
            }
        }
        if(massa[i] == false){
            c++
        } 
    }
    if(c == 4){
        alertify.warning("marque alguma das opçoes!")
    } else {
        if(erro){
            alertify.error("respota incorreta!")
            questao++
            qAcertadas.push(false)
            gerarQuestao(questao, questoes)
        } else if(erro == false){
            alertify.success("resposta correta!")
            questao++
            acertos++
            qAcertadas.push(true)
            gerarQuestao(questao, questoes)
        }
    }
    erro = true
});

function gerarQuestao(questao, arr){
    if(questao != 4){
        for(key = 0; key<=questao; key++){
            $('.nQuestao').text(`${key+1} de ${questoes.length}`)
            $('.pergunta').text(arr[key].questao);
            
            for(let i=0; i<4; i++){
                $('.questao-p')[i].textContent = (arr[key].respostas[i])
                radio[i].value = (arr[key].respostas[i])
            }
        }
    } else {
        $('#quiz').fadeOut();
        $('#final').fadeIn(1000);
        let qErradas = 0;
        for(let i=0; i<questoes.length; i++){
            if(qAcertadas[i]){
                $('#resultado').append(`<li>${(i+1)}. ${questoes[i].questao}:<br>
                  -  ${questoes[i].respostaCorreta}. ✔️</li>`)
            } else {
                qErradas++
            }
        }
        if(qErradas==questoes.length){
            $('#resultado').append(`<li>nenhuma, burro</li>
            <img src="https://i.pinimg.com/474x/19/ea/6e/19ea6ecec0d29aa48bd78a79b87e53d2.jpg" width="100" height="100">`)
        } else if(qErradas == 0){
            $('#resultado').append(`<img src="https://c.tenor.com/P3kaHDtg9cQAAAAd/xue-hua-piao-piao-perro-llama-rana.gif" width="100" height="100">`)
        } else if(qErradas > 0 && qErradas < questoes.length){
            $('#resultado').append(`<img src="https://c.tenor.com/s45HmDEGbUsAAAAC/3d-monkey-monkey-eating.gif" width="100" height="100">`)
        }
    }
}

gerarQuestao(questao, questoes)
