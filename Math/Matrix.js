class Matrix{

    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;

        this.matrix = [];

        // initialize matrix with zeros
        for(let i = 0; i < rows; i++){
            this.matrix[i] = [];
            for (let j = 0; j < cols; j ++){
                this.matrix[i][j] = 0;
            }
        }
    }

    Randomize(){
        for(let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j ++){
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }

    Add(n){
        if(n instanceof Matrix){
            if(n.rows != this.rows || n.cols != this.cols) return "Matrix A doesn't have same cols/rows as matrix B.";

            let result = new Matrix(this.rows, this.cols);
            for(let i = 0; i < this.rows; i ++){
                for (let j = 0; j < this.cols; j ++){
                    result.matrix[i][j] = this.matrix[i][j] + n.matrix[i][j];
                }
            }
            return result;
        }
        else if(Number.isFinite(n)){
            let result = new Matrix(this.rows, this.cols);
            for(let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.cols; j++){
                    result.matrix[i][j] = this.matrix[i][j] + n;
                }
            }
            return result;
        }else{
            return (typeof(n) + " is not assignable for Matrix.Add(number/Matrix) argument.");
        }
    }

    Multiply(n){
        if(n instanceof Matrix){
            // elementary multiplication
            if(n.rows != this.rows || n.cols != this.cols) return "Matrix A doesn't have same cols/rows as matrix B.";

            let result = new Matrix(this.rows, this.cols);
            for(let i = 0; i < this.rows; i ++){
                for (let j = 0; j < this.cols; j ++){
                    result.matrix[i][j] = this.matrix[i][j] * n.matrix[i][j];
                }
            }
            return result;
        }
        else if(Number.isFinite(n)){
            let result = new Matrix(this.rows, this.cols);
            for(let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.cols; j++){
                    result.matrix[i][j] = this.matrix[i][j] * n;
                }
            }
            return result;
        }else{
            return (typeof(n) + " is not assignable for Matrix.Mutiply(number/Matrix) argument.");
        }
    }

    MatrixMultiply(n){
        if(!(n instanceof Matrix)) return (typeof(n) + " doesn't match argument for MatrixMultiply(Matrix) function.");
        if(this.rows != n.cols) return ("Rows count and colums count of Matrixes must be the same in MatrixMutiply.");

        let result = new Matrix(this.rows, n.cols);

        for (let i = 0; i < result.rows; i ++){
            for (let j = 0; j < result.cols; j ++){
                let sum = 0;
                for(let k = 0; k < n.rows; k ++){
                    sum += this.matrix[i][k] * n.matrix[k][j];
                }
                result.matrix[i][j] = sum;
            }
        }
        return result;
    }

    Transpose(){
        let result = new Matrix(this.cols, this.rows);
        for(let i = 0; i < this.rows; i ++){
            for(let j = 0 ; j < this.cols; j ++){
                result.matrix[j][i] = this.matrix[i][j];
            }
        }
        return result;
    }
}