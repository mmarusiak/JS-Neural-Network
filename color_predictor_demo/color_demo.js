let r, g, b;
let colorMatchBorder = 300;
let brain;
let guess = [];
let ctx;
let sumGuess = 0;
const trainCount = 10000;


function setup(){    
    brain = new NeuralNetwork(3, 3, 2);

    // train it!
    for(let i = 0; i < trainCount; i++){
        generateNewColor();
        brain.Train([r/255,g/255,b/255], genericFunc());
    }
    // predict first color
    predictColor();

    createCanvas(.65 * window.innerWidth, .45 * window.innerHeight);
    generateNewColor();
}

function mousePressed(){
    if(mouseX > width/2) userChoice("w");
    else userChoice("b");
    generateNewColor();
    predictColor();
}

function userChoice(choice){
    let output = choice == "w" ? [0, 1] : [1, 0];
    if(Math.round(guess[0]) != output[0]) brain.Train([r, g, b], output); // train only if brain didn't predict correct
}

function generateNewColor(){
    r = random(255);
    g = random(255);
    b = random(255);
}

function draw(){
    background(r, g, b)
    addColorTexts();
    drawPrediction();
}

function genericFunc(){
    if(r + g + b > colorMatchBorder) return [1, 0];
    else return [0, 1]; 
}

function addColorTexts(){
    if (width > 370) textSize(64);
    else textSize(16);
    noStroke();
    fill(0);
    // also we need to place it in center keeping in mind column in middle
    // column x size is 50
    textAlign(CENTER);
    text("black", (width - 50)/4, 150)
    fill(255);
    text("white", 3*(width)/4 + 50/4 , 150);
}

function predictColor(){
    guess = brain.Feedforward([r/255, g/255, b/255]);
    sumGuess = guess[0] + guess[1];
    console.log(guess);
}

function drawPrediction(){
    // draw black
    fill(0);
    const sizeX = 50;
    let sizeY = height * guess[0]/sumGuess;
    const posX = width/2;
    let posY = 0;
    rect(posX - sizeX/2, posY, sizeX, sizeY);

    // draw white
    fill(255)
    posY = sizeY;
    sizeY = height * guess[1]/sumGuess;
    rect(posX - sizeX/2, posY, sizeX, sizeY);
}
