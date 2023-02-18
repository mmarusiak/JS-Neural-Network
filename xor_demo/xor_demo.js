// 10.18 xor example 

let data_set = [
{
    inputs: [0, 1],
    targets: [1]
},
{
    inputs: [1, 0],
    targets: [1]
},
{
    inputs: [1, 1],
    targets: [0]
},
{
    inputs: [0, 0],
    targets: [0]
},
]

let brain;
let training_per_step = 25000;
let output = 0;

const xPos = 100;
const yPos = 300;


const colors = [
    "red",
    "green"
];

function setup(){
    brain = new NeuralNetwork(2, 2, 1);

    xButton = createInputButton();
    xButton.button.mouseClicked(changeXValue);
    xButton.button.position(xPos, yPos);

    yButton = createInputButton();
    yButton.button.mouseClicked(changeYValue);
    yButton.button.position(xPos, yPos + xButton.button.height + 100);

    createCanvas(window.innerWidth - 300, window.innerHeight - 300); 
}

function draw(){
    for (let i = 0; i < training_per_step; i ++){
        data = random(data_set);
        brain.Train(data.inputs, data.targets);
    }

    background(12, 17, 22)
    // draw output
    let c = color(colors[Math.round(output)]);
    fill(c);
    textSize(32);
    const x = xPos + 500;
    const y = (2 * yPos + xButton.button.height + 100)/2 - 100;

    text("Fixed output " + Math.round(output), xPos, yPos) ;
    text("Raw output " + output, xPos, yPos + 200) ;
}

function createInputButton(){
    let newButton = {
        button: createButton(""),
        value: 0
    }
    newButton.button.size(100,100);
    changeButtonColor(newButton);

    return newButton;
}

function changeButtonColor(button){
    button.button.style("background-color", colors[button.value]);
}

function changeXValue () {
    changeValue(xButton);
}

function changeYValue(){
    changeValue(yButton);
}

function changeValue(button){
    button.value = button.value == 0 ? 1 : 0;
    // make new guess
    output = brain.Feedforward([xButton.value, yButton.value]);
    changeButtonColor(button);
}