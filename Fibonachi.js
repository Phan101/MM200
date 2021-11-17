
const number = process.argv[2];
let n1 = 0, n2 = 1, nxtNumber;

console.log('Fibonacci Series:');

for (let i = 1; i <= number; i++) {
    console.log(n1);
    nxtNumber = n1 + n2;
    n1 = n2;
    n2 = nxtNumber;
}
let m = 10
//YOLO



