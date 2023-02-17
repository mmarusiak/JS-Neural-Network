function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x){
    //if (!isXSigmoid) return sigmoid(x) * (1 - sigmoid(x)); // if is x plain value
    return x * (1 - x); // if x is already sigmoid value - in our case x is sigmoid
}

class NeuralNetwork{
    constructor(inputNodes, hiddenNodes, outputNodes, learning_rate = 0.1, activationFunction = sigmoid, d_activationFunction = dsigmoid){
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.activationFunction = activationFunction;
        this.d_activationFunction = d_activationFunction;

        // create weights
        this.weights_i_h = new Matrix(this.hiddenNodes, this.inputNodes);
        this.weights_h_o = new Matrix(this.outputNodes, this.hiddenNodes);

        this.weights_i_h.Randomize();
        this.weights_h_o.Randomize();

        // create bias
        this.bias_h = new Matrix(this.hiddenNodes, 1);
        this.bias_o = new Matrix(this.outputNodes, 1);

        this.bias_h.Randomize();
        this.bias_o.Randomize();

        this.learning_rate = learning_rate;
    }

    Feedforward(inputs_arr){
        // convert to matrix
        let inputs = Matrix.FromArray(inputs_arr);
      
        // hidden hidden outputs
        let hidden =  Matrix.ProductMultiply(this.weights_i_h, inputs);
        hidden.Add(this.bias_h);

        // activation function
        hidden.Map(this.activationFunction)

        // generate guess outputs
        let outputs = Matrix.ProductMultiply(this.weights_h_o, hidden);
        outputs.Add(this.bias_o);

        // activation function
        outputs.Map(this.activationFunction)

        return Matrix.ToArray(outputs);
    }

    Train(inputs_arr, targets_arr){
        // converting arrays to matrices
        let inputs = Matrix.FromArray(inputs_arr);
        let targets = Matrix.FromArray(targets_arr);
      
        // hidden hidden outputs
        let hidden =  Matrix.ProductMultiply(this.weights_i_h, inputs);
        hidden.Add(this.bias_h);

        // activation function
        hidden.Map(this.activationFunction)

        // generate guess outputs
        let outputs = Matrix.ProductMultiply(this.weights_h_o, hidden);
        outputs.Add(this.bias_o);

        // activation function
        outputs.Map(this.activationFunction)

        // calculate output layer errors
        let outputs_errors = Matrix.Subtract(targets, outputs);

        // calculate hidden layer errors
        let weight_h_o_T = Matrix.Transpose(this.weights_h_o);
        let hidden_errors = Matrix.ProductMultiply(weight_h_o_T, outputs_errors);

        // calculate gradients
        let hiddenoutput_gradients = this.CalculateGradients(outputs, this.d_activationFunction, outputs_errors);
        let inputhidden_gradients = this.CalculateGradients(hidden, this.d_activationFunction, hidden_errors);

        // calculate deltas
        let hiddenoutput_deltas = this.CalculateDeltas(hiddenoutput_gradients, hidden);
        let inputhidden_deltas = this.CalculateDeltas(inputhidden_gradients, inputs);

        // apply gradients
        this.bias_o.Add(hiddenoutput_gradients);
        this.bias_h.Add(inputhidden_gradients);

        // apply deltas
        this.weights_h_o.Add(hiddenoutput_deltas);
        this.weights_i_h.Add(inputhidden_deltas);
    }

    CalculateDeltas(gradients, input){
        let input_T = Matrix.Transpose(input);
        let deltas = Matrix.ProductMultiply(gradients, input_T);
        return deltas;
    }

    CalculateGradients(outputs, dfunc, outputs_err){
        let gradients = Matrix.Map(outputs, dfunc);
        gradients.Multiply(outputs_err);
        gradients.Multiply(this.learning_rate);
        return gradients;
    }
}