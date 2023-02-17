console.log('Sketch loaded...');
let a = new Matrix(2,3);
let b = new Matrix(3,2);
a.Randomize();
b.Randomize();

console.table(a.matrix);
console.table(b.matrix);

a.Add(2);

console.table(a.matrix);

c = Matrix.Map(a, DoubleIt);


function DoubleIt(a){
    return(a*2);
}

console.table(c.matrix);