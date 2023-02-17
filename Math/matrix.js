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
                this.matrix[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    static ToArray(a){
        let result = [];

        for(let i = 0; i < a.rows; i ++){
            for (let j = 0; j < a.cols; j ++){
                result.push(a.matrix[i][j]);
            }
        }
        
        return result;
    }

    static MatrixFromArray(a){
        let result = new Matrix(1, a.length());

        for(let i = 0; i < result.length(); i ++){
            result.matrix[0][i] = a[i];
        }

        return result;
    }

    AssignNewMatrix(matrix){
        this.rows = matrix.rows;
        this.cols = matrix.cols;

        for(let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j ++){
                this.matrix[i][j] = matrix.matrix[i][j];
            }
        }
    }

    static Add(a, b){
        if(!(a instanceof Matrix)) return "A should be a Matrix object, not an " + typeof(a) + ".";

        if(b instanceof Matrix){
            if(b.rows != a.rows || a.cols != b.cols) return "Matrix A doesn't have same cols/rows as matrix B.";
            return (Matrix.AddTwoMatricies(a, b));
        }
        else if(Number.isFinite(b)){
            return(Matrix.AddNumberToMatrix(a, b));
        }
        else{
            return (typeof(n) + " is not assignable for Matrix.Add(number/Matrix) argument.");
        }
    }

    static AddTwoMatricies(a, b){
        let result = new Matrix(a.rows, a.cols);
        for(let i = 0; i < a.rows; i ++){
            for (let j = 0; j < a.cols; j ++){
                result.matrix[i][j] = a.matrix[i][j] + b.matrix[i][j];
            }
        }
        return result;
    }

    static AddNumberToMatrix(a, b){
        let result = new Matrix(a.rows, a.cols);
        for(let i = 0; i < a.rows; i++){
            for (let j = 0; j < a.cols; j++){
                result.matrix[i][j] = a.matrix[i][j] + b;
            }
        }
        return result;
    }

    Add(a){
        let result = Matrix.Add(this, a);
        this.AssignNewMatrix(result);
    }

    static Subtract(a, b){
        if(b instanceof Matrix) return Matrix.Add(a, Matrix.Multiply(b, -1));
        else if(Number.isFinite(b)) return Matrix.Add(a, -b);
        else console.log(typeof(b) + " is wrong type for subtraction (number/Matrix).");
    }

    Subtract(a){
        let result = Matrix.Subtract(this, a);
        this.AssignNewMatrix(result);
    }


    static Multiply(a, b){
        if(!(a instanceof Matrix)) return "a should be a matrix, not a " + typeof(a) + ".";
        if(b instanceof Matrix){
            // elementary multiplication
            if(b.rows != a.rows || b.cols != a.cols) return "Matrix A doesn't have same cols/rows as matrix B.";
            return Matrix.MultiplyTwoMatricies(a, b);
        }
        else if(Number.isFinite(b)){
            Matrix.MultiplyNumberWithMatrix(a, b);
        }
        else{
            return (typeof(n) + " is not assignable for Matrix.Mutiply(number/Matrix) argument.");
        }
    }

    static MultiplyTwoMatricies(a, b){
        let result = new Matrix(a.rows, a.cols);
            for(let i = 0; i < a.rows; i ++){
                for (let j = 0; j < a.cols; j ++){
                    result.matrix[i][j] = a.matrix[i][j] * b.matrix[i][j];
                }
            }
        return result;
    }

    static MultiplyNumberWithMatrix(a, b){
        let result = new Matrix(a.rows, a.cols);
            for(let i = 0; i < a.rows; i++){
                for (let j = 0; j < a.cols; j++){
                    result.matrix[i][j] = a.matrix[i][j] * b;
                }
            }
        return result;
    }

    Multiply(b){
        let result = Matrix.Multiply(this, b);
        this.AssignNewMatrix(result);
    }

    static ProductMultiply(a, b){
        if(!(a instanceof Matrix)) return (typeof(a) + " doesn't match argument for MatrixMultiply(Matrix) function.");
        if(!(b instanceof Matrix)) return (typeof(b) + " doesn't match argument for MatrixMultiply(Matrix) function.");
        if(a.rows != b.cols) return ("Rows count and colums count of Matrixes must be the same in MatrixMutiply.");

        let result = new Matrix(a.rows, b.cols);

        for (let i = 0; i < result.rows; i ++){
            for (let j = 0; j < result.cols; j ++){
                let sum = 0;
                for(let k = 0; k < n.rows; k ++){
                    sum += a.matrix[i][k] * b.matrix[k][j];
                }
                result.matrix[i][j] = sum;
            }
        }
        return result;
    }

    ProductMultiply(b){
        let result = Matrix.ProductMultiply(this, b);
        this.AssignNewMatrix(result);
    }

    Transpose(a){
        let result = new Matrix(a.cols, a.rows);
        for(let i = 0; i < a.rows; i ++){
            for(let j = 0 ; j < a.cols; j ++){
                result.matrix[j][i] = a.matrix[i][j];
            }
        }
        return result;
    }


    static Map(a, func){
        for(let i = 0; i < a.rows; i ++){
            for(let j = 0 ; j < a.cols; j ++){
                a.matrix[i][j] = func(a.matrix[i][j]);
            }
        }
        return a;
    }

    Map(func){
        let result = Matrix.Map(this, func);
        this.AssignNewMatrix(result);
    }
}