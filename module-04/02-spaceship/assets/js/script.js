let velocidade = 5;
let posicaoY = parseInt(Math.random() * 334);
let podeAtirar = true;
let fimdejogo = false;
let pontos = 0;
let salvos = 0;
let perdidos = 0;
let energiaAtual = 3;

function start() {
    let somDisparo = document.getElementById("somDisparo");
    let somExplosao = document.getElementById("somExplosao");
    let musica = document.getElementById("musica");
    let somGameover = document.getElementById("somGameover");
    let somPerdido = document.getElementById("somPerdido");
    let somResgate = document.getElementById("somResgate");
    //Música em loop
    musica.addEventListener(
        "ended",
        function () {
            musica.currentTime = 0;
            musica.play();
        },
        false
    );
    musica.play();

    $("#start").hide();
    $("#gameBG").append("<div id='jogador' class='anima1'></div>");
    $("#gameBG").append("<div id='inimigo1' class='anima2'></div>");
    $("#gameBG").append("<div id='inimigo2' ></div>");
    $("#gameBG").append("<div id='amigo' class='anima3'></div>");
    $("#gameBG").append("<div id='placar'></div>");
    $("#gameBG").append("<div id='energia'></div>");

    let jogo = {};
    const TECLA = {
        up: 38,
        down: 40,
        D: 68,
    };
    jogo.pressionou = [];
    //Verifica se o usuário pressionou alguma tecla

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

    //Game Loop
    jogo.timer = setInterval(loop, 30);
    function loop() {
        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
        placar();
        energia();
    } // Fim da função loop()

    function movefundo() {
        esquerda = parseInt($("#gameBG").css("background-position"));
        $("#gameBG").css("background-position", esquerda - 1);
    } // fim da função movefundo()

    function movejogador() {
        if (jogo.pressionou[TECLA.up]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            if (topo <= 0) {
                $("#jogador").css("top", topo + 10);
            }
        }

        if (jogo.pressionou[TECLA.down]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);

            if (topo >= 434) {
                $("#jogador").css("top", topo - 10);
            }
        }

        if (jogo.pressionou[TECLA.D]) {
            disparo();
        }
    } // fim da função movejogador()

    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= -20) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    } //Fim da função moveinimigo1()

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= -10) {
            $("#inimigo2").css("left", 775);
        }
    } // Fim da função moveinimigo2()

    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {
            $("#amigo").css("left", 0);
        }
    } // fim da função moveamigo()

    function disparo() {
        if (podeAtirar == true) {
            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#gameBG").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);
            somDisparo.play();

            var tempoDisparo = window.setInterval(executaDisparo, 30);
        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        } // Fecha executaDisparo()
    } // Fecha disparo()

    function colisao() {
        let colisao1 = $("#jogador").collision($("#inimigo1"));
        let colisao2 = $("#jogador").collision($("#inimigo2"));
        let colisao3 = $("#disparo").collision($("#inimigo1"));
        let colisao4 = $("#disparo").collision($("#inimigo2"));
        let colisao5 = $("#jogador").collision($("#amigo"));
        let colisao6 = $("#inimigo2").collision($("#amigo"));

        if (colisao1.length > 0) {
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
            energiaAtual--;
        }

        // jogador com o inimigo2
        if (colisao2.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();
            energiaAtual--;
            reposicionaInimigo2();
        }

        // Disparo com o inimigo1
        if (colisao3.length > 0) {
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

            pontos = pontos + 100;
            velocidade = velocidade + 0.3;
        }

        // Disparo com o inimigo2
        if (colisao4.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            reposicionaInimigo2();
            pontos = pontos + 50;
            velocidade = velocidade + 0.3;
        }

        // jogador com o amigo
        if (colisao5.length > 0) {
            reposicionaAmigo();
            $("#amigo").remove();
            salvos++;
            somResgate.play();
        }

        //Inimigo2 com o amigo
        if (colisao6.length > 0) {
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();
            perdidos++;

            reposicionaAmigo();
        }
    } //Fim da função colisao()

    //Explosão 1
    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play();
        $("#gameBG").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(assets/images/explosao.png)");
        let div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 200, opacity: 0 }, "slow");

        let tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // Fim da função explosao1()

    //Reposiciona Inimigo2
    function reposicionaInimigo2() {
        let tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (!fimdejogo) {
                $("#gameBG").append("<div id=inimigo2></div");
            }
        }
    }

    //Explosão2
    function explosao2(inimigo2X, inimigo2Y) {
        somExplosao.play();
        $("#gameBG").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(assets/images/explosao.png)");
        let div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        let tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    } // Fim da função explosao2()

    //Reposiciona Amigo
    function reposicionaAmigo() {
        let tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {
                $("#gameBG").append("<div id='amigo' class='anima3'></div>");
            }
        }
    }

    //Explosão3
    function explosao3(amigoX, amigoY) {
        somPerdido.play();
        $("#gameBG").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
        let tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;
        }
    } // Fim da função explosao3

    function placar() {
        $("#placar").html(
            "<h2> Pontos: " +
                pontos +
                " Salvos: " +
                salvos +
                " Perdidos: " +
                perdidos +
                "</h2>"
        );
    } //fim da função placar()

    //Barra de energia
    function energia() {
        if (energiaAtual == 3) {
            $("#energia").css("background-image", "url(assets/images/energia3.png)");
        }

        if (energiaAtual == 2) {
            $("#energia").css("background-image", "url(assets/images/energia2.png)");
        }

        if (energiaAtual == 1) {
            $("#energia").css("background-image", "url(assets/images/energia1.png)");
        }

        if (energiaAtual == 0) {
            $("#energia").css("background-image", "url(assets/images/energia0.png)");

            gameOver();
        }
    } // Fim da função energia()

    //Função GAME OVER
    function gameOver() {
        fimdejogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();

        $("#gameBG").append("<div id='fim'></div>");

        $("#fim").html(
            "<h1> Game Over </h1><p>Sua pontuação foi: " +
                pontos +
                "</p>" +
                "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>"
        );
    } // Fim da função gameOver();
}

//Reinicia o Jogo
function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    start();
    energiaAtual = 3;
} //Fim da função reiniciaJogo
