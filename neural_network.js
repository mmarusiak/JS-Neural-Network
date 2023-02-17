function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork{
    constructor(inputNodes, hiddenNodes, outputNodes, activationFunction = sigmoid){
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.activationFunction = activationFunction;

        // create weights
        this.weights_i_h = new Matrix(hiddenNodes, inputNodes);
        this.weights_h_o = new Matrix(outputNodes, hiddenNodes);

        this.weights_i_h.Randomize();
        this.weights_h_o.Randomize();

        // create bias
        this.bias_h = new Matrix(hiddenNodes, 1);
        this.bias_o = new Matrix(outputNodes, 1);

        this.bias_h.Randomize();
    }

    Feedforward(input_arr){
        let input = Matrix.FromArray(input_arr);
      
        // hidden hidden outputs
        let hidden =  Matrix.ProductMultiply(this.weights_i_h, input);
        hidden.Add(this.bias_h);

        // activation function
        hidden.Map(this.activationFunction)


        // generate guess outputs
        let output = Matrix.ProductMultiply(this.weights_h_o, hidden);
        output.Add(this.bias_o);

        return Matrix.ToArray(output);
    }

    Train(input_arr, targets){
        let input = Matrix.FromArray(input_arr);
        let guess = this.Feedforward(input_arr);

        let m_targets = Matrix.FromArray(targets);
        let m_guess = Matrix.FromArray(guess);

        // calculate output layer errors
        let output_errors = Matrix.Subtract(m_targets, m_guess);

        // calculate hidden layer errors
        let weight_h_o_trans = Matrix.Transpose(this.weights_h_o);
        let hidden_errors = Matrix.ProductMultiply(weight_h_o_trans, output_errors);
    }
}