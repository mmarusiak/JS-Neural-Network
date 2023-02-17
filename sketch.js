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

function setup(){
    brain = new NeuralNetwork(2, 2, 1);
    button = createButton("CHECK");
    button.position(window.innerWidth/2 - button.width/2, 400)
    
    xInput = createInput();
    xInput.position(window.innerWidth/2 - 1.5 * xInput.width, button.height + 400);

    xText = createElement('h2', 'X');
    xText.position(window.innerWidth/2 - .75 * xInput.width, 400 - xText.height);

    yInput = createInput();
    yInput.position(window.innerWidth/2 + yInput.width/2, button.height + 400);

    yText = createElement('h2', 'Y');
    yText.position(window.innerWidth/2 + .75 * yInput.width, 400 - yText.height);

    output = createElement('h2', 'Unfixed output');
    f_output = createElement('h2', 'Fixed output');

    button.mouseClicked(check);
}

function draw(){
    for (let i = 0; i < training_per_step; i ++){
        data = random(data_set);
        brain.Train(data.inputs, data.targets);
    }
}

function check(){
    const x = xInput.value();
    const y = yInput.value();

    xInput.value('');
    yInput.value('');

    if(x > 1 || y > 1 || x < 0 || y < 0) console.log("Invalid input");

    let answer = brain.Feedforward([x, y])
    output.html("Unfixed output " + answer);
    f_output.html("Fixed output " + Math.round(answer[0]))
    console.log(answer)
}