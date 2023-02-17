let = brain = new NeuralNetwork(2, 2, 2);

exampleInput = [0,1];
target = [1, 0];

brain.Train(exampleInput, target);
//let guess = brain.Feedforward(exampleInput);


//console.log(guess)