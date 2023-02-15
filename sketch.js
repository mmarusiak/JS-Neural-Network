let a = new Matrix(2,3);
let b = new Matrix(3,2);
a.Randomize();
b.Randomize();
let c = a.MatrixMultiply(b);

console.table(a.matrix);
console.table(b.matrix);
console.table(c.matrix);

let d = a.Transpose();
console.table(d.matrix);