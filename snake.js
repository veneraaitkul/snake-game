//snk

//Globais
//Canvas
var canvas, ctx;
canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');

document.addEventListener('keydown', keyDown, false); //Evento keyUp
var defaultDirection = "down";          //define qual a direção inicial
var speed = 100;                        //define a velocidade do jogo, velocidade sendo um frame a cada speed milisegundos, ou seja mais pequeno mais rápido
var menuSize = 40;                      //var que define o tamahno y do menu no fundo do canvas
var canvasY = canvas.height - menuSize  //var que define o limite y do jogo
var canvasX = canvas.width              //var que define o limite x do jogo
var fundoEscolhido = new Image();       //var para saber qual o fundo que está escolhido
var badFoodEscolhida = new Image();     //var para saber qual badFood escolhido conforme o fundo
var goodFoodEscolhida = new Image();     //var para saber qual goodFood escolhido conforme o fundo
var dead = false;                       //define se a cobra está morta
var interval = "";                      //var para o intervalo
var level = 0;                          //var que define o nível em que se está
var lives = 3;                          //var para saber quantas vidas o jogador tem
var score = 0;                          //var para pontuação
var highScore = 0;                      //var para pontuação máxima
var name = ""                           //var para guardar o nome do jogador
var ranking = [];                       //array que terá o ranking de pontuações
var rankingLength = 6;                  //array que define o tamanho do ranking
var numBadFood = 1;                     //var para saber quantas comidas más existem
var keySaved = false;                   //define se já foi premida uma tecla naquele turno, em princípio será supérflua com novo sistema de mudanças de direção
var snake = new Array();                //Array que terá todos os objetos ssssssssssssssssssssnake
var food = new Array();                 //Array que terá todos os objetos food, não sei se é necessário ser Array mas vamos ver
var SNAKE_HEAD = 0;                     //Var para ser mais legivel quando aceder específicamente à cabeça da cobra, tipo snake[SNAKE_HEAD].blababla

//Variáveis que definem o tamanho das coisas
//Estas variáveis definem o tamanho de cada "secção" em que dividimos o canvas, no entanto divisões que resultem em valores não inteiros
//criam inconsitência no desenho e no cálculo de colisões, não entendo porquê.
var SNAKE_WIDTH = canvas.width / 25;               //Var para ser mais legivel o width de cada pedaço da cobra
var SNAKE_HEIGHT = canvas.width / 25;              //Var para ser mais legivel o height de cada pedaço da cobra
var FOOD_WIDTH = canvas.width / 25;                //Var para ser mais legivel o width da comida
var FOOD_HEIGHT = canvas.width / 25;               //Var para ser mais legivel o height da comida

//--------------------------------------------------------------------
//Variáveis para imagens

//imagens de comidas
var asteroidImg = new Image();
asteroidImg.src = "./css/asteroid.png";
var starImg = new Image();
starImg.src = "./css/star.png";

var mouseImg = new Image();
mouseImg.src = "./css/mouse.png";
var cactusImg = new Image();
cactusImg.src = "./css/cactus.png";

var appleImg = new Image();
appleImg.src = "./css/apple.png";
var stoneImg = new Image();
stoneImg.src = "./css/stone.png";

var fishImg = new Image();
fishImg.src = "./css/fish.png";
var coralImg = new Image();
coralImg.src = "./css/coral.png";


//imagens do corpo da cobra
var snake1 = new Image();
snake1.src = "./css/corpo (2).png";
var snake2 = new Image();
snake2.src = "./css/corpo (3).png";
var snake3 = new Image();
snake3.src = "./css/corpo (4).png";

//imagens do fundo
var fundo1 = new Image();
fundo1.src = "./css/space2.jpg";
var fundo2 = new Image();
fundo2.src = "./css/b2.jpg";
var fundo3 = new Image();
fundo3.src = "./css/b7.jpg";
var fundo4 = new Image();
fundo4.src = "./css/underwater.jpg";
var numImagesLoaded = 0;


//variáveis que definem quais as imagens a usar
fundoEscolhido = fundo1;
snakeEscolhido = snake1;
badFoodEscolhida = asteroidImg;
goodFoodEscolhida = starImg;

//desenhar o fundo por defeito logo no início
ctx.drawImage(fundoEscolhido, 0, 0, canvas.width, canvas.height);


starImg.onload = function () {
    ImageLoaded();
}
asteroidImg.onload = function () {
    ImageLoaded();
}
appleImg.onload = function () {
    ImageLoaded();
}
mouseImg.onload = function () {
    ImageLoaded();
}
cactusImg.onload = function () {
    ImageLoaded();
}
stoneImg.onload = function () {
    ImageLoaded();
}
fishImg.onload = function () {
    ImageLoaded();
}
coralImg.onload = function () {
    ImageLoaded();
}
snake1.onload = function () {
    ImageLoaded();
}
snake2.onload = function () {
    ImageLoaded();
}
snake3.onload = function () {
    ImageLoaded();
}
fundo1.onload = function () {
    ImageLoaded();
}
fundo2.onload = function () {
    ImageLoaded();
}
fundo3.onload = function () {
    ImageLoaded();
}
fundo4.onload = function () {
    ImageLoaded();
}

//Função para permitir novo jogo ao carregar todas as imagens
function ImageLoaded() {
    numImagesLoaded++;

    //apenas permitir começar o jogo quando todas as imagens tiverem carregado
    if (numImagesLoaded >= 15){ 
        document.querySelector("#jogar").removeAttribute("disabled");
        changeBackground(document.querySelector("#gameBackground").value);
    }

    //desenhar instruções antes do jogo começar
    drawInstructions();

}

//Função para fazer reset às variáveis sempre que começa um  jogo novo
function resetVariables() {
    speed = 100;
    level = 0;
    lives = 3;
    score = 0;
    highScore = 0;
    numBadFood = 1;
}

//Função para mudar o fundo de acordo com o escolhido no select do HTML
function changeBackground(e) {
    switch (e) {
        case "1":
            fundoEscolhido = fundo1;
            snakeEscolhido = snake1;
            badFoodEscolhida = asteroidImg;
            goodFoodEscolhida = starImg;
            ctx.drawImage(fundoEscolhido, 0, 0, canvas.width, canvas.height);
            drawInstructions();
            break;
        case "2":
            fundoEscolhido = fundo2;
            snakeEscolhido = snake2;
            badFoodEscolhida = stoneImg;
            goodFoodEscolhida = appleImg;
            ctx.drawImage(fundoEscolhido, 0, 0, canvas.width, canvas.height);
            drawInstructions();
            break;
        case "3":
            fundoEscolhido = fundo3;
            snakeEscolhido = snake3;
            badFoodEscolhida = cactusImg;
            goodFoodEscolhida = mouseImg;
            ctx.drawImage(fundoEscolhido, 0, 0, canvas.width, canvas.height);
            drawInstructions();
            break;
        case "4":
            fundoEscolhido = fundo4;
            snakeEscolhido = snake1;
            badFoodEscolhida = coralImg;
            goodFoodEscolhida = fishImg;
            ctx.drawImage(fundoEscolhido, 0, 0, canvas.width, canvas.height);
            drawInstructions();
            break;
    }
}

//Cada pedaço da cobra é um objeto deste tipo
function ssssssssssssssssssssnake(posX, posY, head) {
    this.posX = posX;
    this.posY = posY;
    this.head = head;                    //determina se não é cabeça para efeitos de herânça de posição
    this.direction = defaultDirection;   //apenas a cabeça vai usar desta variável

    //Para mudar a direção da cabeça, o if é apenas para ter a certeza do que está a acontecer mas em princípio é supérfluo
    this.updateDirection = function (direction) { if (this.head) this.direction = direction; }

    //Para actualizar a posição da cobra em cada frame
    //posX e posY são para na em outro lugar mandar a posição do pedaço hierarquicamente acima para o inferior,
    //assim guarantindo que há sempre integridade na "ligação" entre toda a bobra
    this.updatePosition = function (posX, posY) {

        //se não for cabeça usar os argumentos
        if (!this.head) this.posY = posY,
            this.posX = posX;

        //se for, usar a direção associada a este pedaço
        else {
            switch (this.direction) {
                case "up": this.posY -= SNAKE_HEIGHT;
                    break;
                case "left": this.posX -= SNAKE_WIDTH;
                    break;
                case "right": this.posX += SNAKE_WIDTH;
                    break;
                case "down": this.posY += SNAKE_HEIGHT;
                    break;
            }
        }
    }
}

//Objeto comida, neste estou a randomizar a sua posição na inicialização, mas pode-se fazer de maneira differente
function foodPiece(bad) {
    //Esta conta é feita para aparecer sempre em multiplos de 10, por exemplo se random der 255, 255/10 = 25.5, Math.floor(25.5) = 25, 25*10 = 250
    //está parametrizada com food width e height para guarantir que é sempre um múltiplo desses valores, ex se width for 20 posX é sempre multipo de 20
    //abs só para guarantir que nunca há nenhum valor negativo
    this.posX = Math.abs(Math.floor(((Math.random() * canvasX - FOOD_WIDTH) + FOOD_WIDTH) / FOOD_WIDTH) * FOOD_WIDTH);
    this.posY = Math.abs(Math.floor(((Math.random() * canvasY - FOOD_HEIGHT) + FOOD_HEIGHT) / FOOD_HEIGHT) * FOOD_HEIGHT);
    this.bad = bad;

    //Função para gerar nova posição
    this.newPosition = function () {
        this.posX = Math.abs(Math.floor(((Math.random() * canvasX - FOOD_WIDTH) + FOOD_WIDTH) / FOOD_WIDTH) * FOOD_WIDTH);
        this.posY = Math.abs(Math.floor(((Math.random() * canvasY - FOOD_HEIGHT) + FOOD_HEIGHT) / FOOD_HEIGHT) * FOOD_HEIGHT);
        this.safePosition();
    }

    //função que guarante que comida não aparece num lugar ocupado por outras coisas
    this.safePosition = function () {
        //verificar colisão com snake (estou a ver se snake existe mais por precaução, mas não acho que é preciso)
        if (snake.length) {
            for (var x = 0; x < snake.length; x++) {
                if (this.posX == snake[x].posX && this.posY == snake[x].posY) {
                    console.log("colisão com cobra")
                    this.newPosition()
                    break;
                };
            }
        }
        //verificar colisão com comida
        for (var x = 0, i = 0; x < food.length; x++) {
            if (this.posX == food[x].posX && this.posY == food[x].posY) {
                console.log("colisão com comida")
                this.newPosition();
                break;
            }
        }
    }

    //verificar sempre que é criada nova comida, implica redunddância mas é mais seguro assim
    this.safePosition();
}

//Função para inicializar a cobra com quantos pedaços quisermos
function initializeSnake() {
    snake = [];          //isto guarante que a vobra é eliminada antes de ser inicializada
    var n = 5;          //variável que define com quantos pedaços a cobra começa
    var posX = 0;
    var posY = 0;        //isto*n para guarantir que não começa com pedaços fora do canvas

    //dependendo de defaultDirection, começar em coordenadas e iterações por pedaço da cobra diferentes
    switch (defaultDirection) {
        case "down":
            posX = SNAKE_WIDTH;
            posY = SNAKE_HEIGHT * n;
            for (var x = 0; x < n; x++) {
                if (!x) snake.push(new ssssssssssssssssssssnake(posX, posY, true))  //para o primeiro ser sempre cabeça
                else snake.push(new ssssssssssssssssssssnake(posX, posY, false))
                posY -= SNAKE_HEIGHT;
            }
            break;

        case "right":
            posX = SNAKE_WIDTH * n;
            posY = SNAKE_HEIGHT;
            for (var x = 0; x < n; x++) {
                if (!x) snake.push(new ssssssssssssssssssssnake(posX, posY, true))  //para o primeiro ser sempre cabeça
                else snake.push(new ssssssssssssssssssssnake(posX, posY, false))
                posX -= SNAKE_WIDTH;
            }
            break;

        case "left":
            posX = canvasX - SNAKE_WIDTH * n;
            posY = SNAKE_HEIGHT;
            for (var x = 0; x < n; x++) {
                if (!x) snake.push(new ssssssssssssssssssssnake(posX, posY, true))  //para o primeiro ser sempre cabeça
                else snake.push(new ssssssssssssssssssssnake(posX, posY, false))
                posX += SNAKE_WIDTH;
            }
            break;
        case "up":
            posX = SNAKE_WIDTH;
            posY = canvasY - SNAKE_HEIGHT * n;
            for (var x = 0; x < n; x++) {
                if (!x) snake.push(new ssssssssssssssssssssnake(posX, posY, true))  //para o primeiro ser sempre cabeça
                else snake.push(new ssssssssssssssssssssnake(posX, posY, false))
                posY += SNAKE_HEIGHT;
            }
            break;
    }
}

//Função para apagar comida e criar nova comida
function resetAllFood() {
    food.length = [];
    food.push(new foodPiece(false));

    for (var x = 0; x < numBadFood; x++) {
        food.push(new foodPiece(true));
    };



}

//Função que guarante que existe sempre o número correto de comida má
function resetBadFood() {
    var cont = 0;
    var cont2 = 0;
    for (var x = 0; x < food.length; x++) if (food[x].bad) cont++;

    cont2 = numBadFood - cont;
    for (var x = 0; x < cont2; x++) food.push(new foodPiece(true))

}

//Função para desenhar o ranking;
function drawRanking() {
    ctx.fillStyle = "#06212877";
    ctx.fillRect(canvasX / 4, canvasY / 4, canvasX / 2, canvasY / 2);

    ctx.textAlign = "left"
    ctx.fillStyle = "white";
    ctx.font = "20px  comic sans ms";
    for (var x = 0; x < ranking.length; x++) {
        ctx.textAlign = "left"
        ctx.fillText(ranking[x][0], canvasX / 4 + 10, (canvasY / 4 + 30) + 30 * x);
        ctx.textAlign = "right";
        ctx.fillText(ranking[x][1], ((canvasX / 4) + (canvasX / 2) - 10), (canvasY / 4 + 30) + 30 * x);

    }
}

//Função para desenhar menu no fundo do canvas
function drawMenu() {
    ctx.fillStyle = "#06212877"
    ctx.fillRect(0, canvasY, canvasX, menuSize);
    ctx.font = " 12px codystar";
    ctx.fillStyle = "White "

    var dif = ""; //dificuldade

    switch (level) {
        case 0:
            dif = "fácil";
            break;
        case 1:
            dif = "médio";
            break;
        case 2:
            dif = "difícil";
            break;
        case 3:
            dif = "impossivel?";
            break;
    }

    ctx.fillText("Nome: " + name, 30, canvasY + 25)
    ctx.fillText("Pontuação: " + score, 160, canvasY + 25)
    ctx.fillText("Vidas: " + lives, 300, canvasY + 25)
    ctx.fillText("Nível: " + dif, 390, canvasY + 25)
}

//Função para desenhar a snake no canvas
function drawSnake() {

    for (var x = 0; x < snake.length; x++)
        ctx.drawImage(snakeEscolhido, snake[x].posX, snake[x].posY, SNAKE_WIDTH, SNAKE_HEIGHT);
}

//Função para desenha a comida no canvas
function drawFood() {
    for (var x = 0; x < food.length; x++) {
        if (food[x].bad) ctx.drawImage(badFoodEscolhida, food[x].posX, food[x].posY, FOOD_WIDTH, FOOD_HEIGHT);
        else ctx.drawImage(goodFoodEscolhida, food[x].posX, food[x].posY, FOOD_WIDTH, FOOD_HEIGHT);
    }
}

//Função para desenhar tudo, esta função agrega todas as funções de desenho
function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //apagar canvas
    ctx.drawImage(fundoEscolhido, 0, 0, canvas.width, canvas.height);
    drawFood();                                     //desenhar comida
    drawSnake();                                    //desenhar cobra
    drawMenu();
}

//Função para actualizar a cobra
function updateSnakePosition() {
    for (var x = snake.length - 1; x >= 0; x--) {
        if (!x) snake[x].updatePosition();
        else snake[x].updatePosition(snake[x - 1].posX, snake[x - 1].posY);
    }
}

//Função para actualizar pontuação
function updateScore() {
    score += 10;
    if (score > highScore) highScore = score;
}

//Função para actualizar o nível do jogo
function updateLevel() {
    if(score>=600) endGame(true);
    else if (score < 600 && score >= 450) level = 3, updateDifficulty(level);
    else if (score < 450 && score >= 300) level = 2, updateDifficulty(level);
    else if (score >= 150) level = 1, updateDifficulty(level);
}

//Função para atualizar dificuldade
function updateDifficulty(level) {
    switch (level) {
        case 1:
            speed = 80;
            numBadFood = 2;
            clearInterval(interval);
            interval = window.setInterval(gameCycle, speed);
            resetBadFood();
            break;
        case 2:
            speed = 60;
            numBadFood = 3;
            clearInterval(interval);
            interval = window.setInterval(gameCycle, speed);
            resetBadFood();
            break;
        case 3:
            speed = 40;
            numBadFood = 2;
            clearInterval(interval);
            interval = window.setInterval(gameCycle, speed);
            resetBadFood();
            break;
    }
}

//Colisão com as paredes
function wallCollision() {
    if (snake[SNAKE_HEAD].posX < 0) return true;  //verificar se fora pela esquerda
    else if (snake[SNAKE_HEAD].posY < 0) return true;  //verificar se fora por cima
    else if (snake[SNAKE_HEAD].posX >= canvasX) return true;  //verificar se fora pela direita
    else if (snake[SNAKE_HEAD].posY >= canvasY) return true;  //verificar se fora por baixo
    else return false;
}

//Colisão com comida que engorda
function goodFoodCollision() {
    for (var x = 0; x < food.length; x++) if (Math.floor(snake[SNAKE_HEAD].posX) == Math.floor(food[x].posX) && Math.floor(snake[SNAKE_HEAD].posY) == Math.floor(food[x].posY) && !food[x].bad) return true;
    return false;
}

//Colisão com comida que mata
function badFoodCollision() {
    for (var x = 0; x < food.length; x++) if (Math.floor(snake[SNAKE_HEAD].posX) == Math.floor(food[x].posX) && Math.floor(snake[SNAKE_HEAD].posY) == Math.floor(food[x].posY) && food[x].bad) return true;
    return false;
}

//Colisão consigo própria
function snakeCollision() {
    for (var x = 1; x < snake.length; x++)if (snake[SNAKE_HEAD].posX == snake[x].posX && snake[SNAKE_HEAD].posY == snake[x].posY) return true;
    return false;
}

//Função que determina o que acontece quando a comida é, uh, comida
function eatFood() {
    updateScore();
    updateLevel();
    resetAllFood();
    snake.push(new ssssssssssssssssssssnake(canvas.width * 2, canvas.height * 2, false));  //isto cria fora do canvas apenas para que este pedaço da cobra já tenha posição, que é corrigida no frame seguinte
}

//Função para responder a keyUp
function keyDown(e) {
    //códigos para teclas
    //left = 37
    //up = 38
    //right = 39
    //down = 40

    if (!keySaved) {
        switch (e.keyCode) {
            case 37:   // left
                if (snake[SNAKE_HEAD].direction != "left" && snake[SNAKE_HEAD].direction != "right") snake[SNAKE_HEAD].updateDirection("left")
                break;
            case 38:   //up
                if (snake[SNAKE_HEAD].direction != "up" && snake[SNAKE_HEAD].direction != "down") snake[SNAKE_HEAD].updateDirection("up")
                break;
            case 39:   //right
                if (snake[SNAKE_HEAD].direction != "left" && snake[SNAKE_HEAD].direction != "right") snake[SNAKE_HEAD].updateDirection("right")
                break;
            case 40:   //down
                if (snake[SNAKE_HEAD].direction != "up" && snake[SNAKE_HEAD].direction != "down") snake[SNAKE_HEAD].updateDirection("down")
                break;
        }
    }

    keySaved = true;
}

//Função para inserir pontuações no ranking
function updateRanking() {
    var inserted = false;
    var nameScore = [name, score];
    if (ranking.length > 0) {
        for (var x = 0; x <= ranking.length - 1; x++) {
            if (score > ranking[x][1] && !inserted) {

                ranking.splice(x, 0, nameScore);
                inserted = true;
                break;
            }

            else if (x == ranking.length - 1 && !inserted) {

                ranking.push(nameScore);
                break;
            }

            else {
                console.log("não foi inserido nenhum score"), console.log(x);
            }
        }
    }

    else {

        ranking.unshift(nameScore);
    }

    if (ranking.length > rankingLength) ranking.length = rankingLength;

}

//Função que tenta morrer, se ainda tiver vidas recomeça a cobra, se morrer
function tryToDie() {
    lives--;
    if (lives <= 0) die();
    else initializeSnake(), resetAllFood();
}

//Função para morrer
function die() {
    dead = true;
    updateRanking();
    endGame();

    var x = Math.floor(Math.random() * 10);
    if (x <= 2) console.log("It's dead Captain.");
    else if (x <= 4 && x > 2) console.log("It's dead Jim!");
    else if (x <= 7 && x > 4) console.log("This snake is... dead!");
    else if (x <= 8 && x > 7) console.log("It's worse than dead, its brain is gone!");
    else if (x <= 9 && x > 8) console.log("Is this a dead snake, Doctor?\nVery dead, Mr. Spock.");
}

//Função para loggar o estado do jogo
function logState() {
    //console.clear();
    console.log(ranking);
    console.log("Vidas:                    " + lives);
    console.log("Velocidade:               " + speed);
    if (snake) console.log("Direção da head:          " + snake[0].direction)
    if (snake) console.log("Tamanho da cobra:         " + snake.length);
    if (snake) console.log("Posição da head (x, y):   " + "(" + snake[0].posX + "," + snake[0].posY + ")")
    console.log("Posição da food (x, y):   " + "(" + food[0].posX + "," + food[0].posY + ")")

}

//Função que inicia o jogo, usada para inicializar coisas e tal
function newGame() {
    ctx.restore();
    ctx.save();

    name = document.querySelector("#name").value;
    if (!name) alert("Tem de inserir um nome!");
    else {
        document.querySelector("#name").disabled = true;
        document.querySelector("#gameBackground").disabled = true;
        resetVariables();
        initializeSnake();
        resetAllFood();
        clearInterval(interval);
        interval = setInterval(gameCycle, speed);
    }

}

//Função principal do jogo, agrega todas as coisas que acontecem ciclicamente
function gameCycle() {
    keySaved = false;                           //reset de keySaved
    updateSnakePosition();                      //actualizar a posição da cobra
    if (wallCollision()) { tryToDie(); return; }   //verificar colisões com paredes
    if (snakeCollision()) { tryToDie(); return; }   //verificar colisões consigo mesma
    if (badFoodCollision()) { tryToDie(); return; }   //verificar colisão com comida
    if (goodFoodCollision()) eatFood();         //verificar colisão com comida
    drawObjects();                              //desenhar objetos depois de verificar colisões para não desenhar cobra depois de ela "morrer"
    logState();                                 //log doe stado da cobra
}

//Função que determina o que acontece ao morrer 
function endGame(winner) {
    drawMenu();
    clearInterval(interval);                    //limpar intervalo
    ctx.fillStyle = "white";
    ctx.textAlign = "center"
    ctx.textBaseline = "middle";
    ctx.font = "70px codystar";
    ctx.fillText("game over", canvas.width / 2, 50)
    drawRanking();

    document.querySelector("#name").disabled = false;
    document.querySelector("#gameBackground").disabled = false;

    if (winner) celebrate();
}
//Função que mostra instruçoes 
function drawInstructions() {
    ctx.fillStyle = "#06212877";
    ctx.fillRect(canvasX / 5, canvasY / 5, 300, 300);

    ctx.textAlign = "left"
    ctx.fillStyle = "white";
    ctx.font = "20px codystar";
    ctx.textAlign = "center";

    ctx.fillText("Instruções", canvasX / 2, canvasY / 5 + 35);

    ctx.font = "14px comic sans ms";
    ctx.textAlign = "left";
    ctx.fillText(".Pressiona ⇦ ⇨ ⇧ ⇩ para controlar a", canvasX / 5 + 35, canvasY / 5 + 80);
    ctx.fillText(" direção do Snake.", canvasX / 5 + 35, canvasY / 5 + 100);
    ctx.fillText(".Ao comer comida, Snake aumenta o", canvasX / 5 + 35, canvasY / 5 + 120);
    ctx.fillText(" seu tamanho ao longo do jogo.", canvasX / 5 + 35, canvasY / 5 + 140);
    ctx.fillText(".Quando bate no obstáculo, irá", canvasX / 5 + 35, canvasY / 5 + 160);
    ctx.fillText(" perder uma vida.", canvasX / 5 + 35, canvasY / 5 + 180);
    ctx.fillText(".O jogo tem 4 níveis de dificuldade.", canvasX / 5 + 35, canvasY / 5 + 200);
    ctx.fillText(".Não podes bater nas paredes! E...", canvasX / 5 + 35, canvasY / 5 + 220);
    
    ctx.fillText("              ...BOA SORTE!       ", canvasX / 5 + 35, canvasY / 5 + 260);
}

function celebrate() {
    
    var circulos = new Array();

    function circle() {
        this.raio = Math.random() * 13 + 2;
        this.y = Math.random() * canvasX;
        this.x = Math.random() * canvasY;

        var A = Math.floor(Math.random() * 255);
        var B = Math.floor(Math.random() * 255);
        var C = Math.floor(Math.random() * 255);
        this.color = 'rgba(' + A + ',' + B + ',' + C + ',0.6)'; //cor aleatoria

        this.vY = Math.random() * 2 - 2;
        this.vX = Math.random() * 4 - 2;
        this.gravity = 0.05;


        this.update = function () {
            //aplicar velocidades
            this.y += this.vY;
            this.x += this.vX

            //aplicar gravidade
            this.vY += this.gravity;
        }

        this.collision = function () {
            if (this.x >= canvas.width || this.x <= 0) return true; //só para fazer que isto encrave menos, não esperar por Y se já desapareceu em X
            if (this.y >= canvas.height + this.raio) return true;
        }

        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
            ctx.fill();
        }


    }


   
    function drawCircles() {
        //apagar
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fundoEscolhido,0,0);

        ctx.textAlign = "center"
        ctx.textBaseline = "middle";
        ctx.font = "60px codystar";
        ctx.fillStyle = "white";
        ctx.fillText("Parabéns!!!", canvas.width / 2, canvas.height / 2)


        //adicionar circulo ao array
        circulos.push(new circle());

        //verificar colisão, se não colisão update e draw
        for (var x = 0; x < circulos.length; x++) {
            if (circulos[x].collision()) circulos.splice(x, 1);
            else {
                circulos[x].update();
                circulos[x].draw();
            }
        }
        window.requestAnimationFrame(drawCircles);
    }
    window.requestAnimationFrame(drawCircles);
}