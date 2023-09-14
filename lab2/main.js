//canvas.width = (window.innerWidth * 80) / 100;
//canvas.height = (window.innerHeight * 95) / 100;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let ctx = document.getElementById("canvas").getContext("2d");
// функция перевода координат из мировых в экранные
function getNewMatrix(part) {
    let newM = [];
    for (let i = 0; i < part.length; i++) {
        newM[i] = [];
        newM[i][0] = Math.round(centerX + part[i][0] * 10);
        newM[i][1] = Math.round(centerY - part[i][1] * 10);
        newM[i][2] = 1;
    }
    ctx.strokeStyle = "#000";
ctx.lineWidth = 1;

// рисуем ось X
ctx.beginPath();
ctx.moveTo(0, centerY);
ctx.lineTo(canvas.width, centerY);
ctx.stroke();

// рисуем стрелку на оси X
ctx.beginPath();
ctx.moveTo(canvas.width - 10, centerY - 5);
ctx.lineTo(canvas.width, centerY);
ctx.lineTo(canvas.width - 10, centerY + 5);
ctx.stroke();

// подписываем ось X
ctx.fillText("X", canvas.width - 20, centerY + 20);

// рисуем ось Y
ctx.beginPath();
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, canvas.height);
ctx.stroke();

// рисуем стрелку на оси Y
ctx.beginPath();
ctx.moveTo(centerX - 5, 10);
ctx.lineTo(centerX, 0);
ctx.lineTo(centerX + 5, 10);
ctx.stroke();

// подписываем ось Y
ctx.fillText("Y", centerX - 20, 20);
    return newM;
}
class Cat {
    draw(part) {
        let arr = getNewMatrix(part);
        console.log(arr)
        for (let i = 0; i < arr.length - 1; i++) {
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = "4";
            ctx.moveTo(arr[i][0], arr[i][1]); //координаты начала линии
            ctx.lineTo(arr[i + 1][0], arr[i + 1][1]); // координаты конца линии
            ctx.stroke();
        }
    }
}

//----------------------------Матрицы перемещения-------------------------------
let B = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [-10, 0, 0,1]
];
let A = [
    [1, 0, 0, 0],
    [0, 1,0, 0],
    [0, 0,1, 0 ],
    [10, 0,0, 1]
];
let C = [
    [1, 0,  0,0],
    [0, 1,  0,0],
    [0, 0, 1,0],
    [0, 10,0, 1]
];
let D = [
    [1,  0, 0, 0],
    [0,  1,  0,0],
    [0,0,  1,0],
    [0, -10,0, 1]
];
//------------------------------------------------------------------------------------
// функция перемножения матриц
function MultiplyMatrix(A, B) {
    var rowsA = A.length,
        colsA = A[0].length,
        rowsB = B.length,
        colsB = B[0].length;
    for (var k = 0; k < colsB; k++) {
        for (var i = 0; i < rowsA; i++) {
            var t = 0;
            for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
            A[i][k] = t;
        }
    }
    return A;
}
let myCat = new Cat();
myCat.draw(ship1);
myCat.draw(ship2);
//myCat.draw(shipConnectors);


let k = 1;
// ---------------------Работа с объектом------------------------
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "+":
            Scale(ship1, k+0.2);
            Scale(ship2, k+0.2);
            Scale(shipConnectors, k+0.2);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
        break;
        case "-":
            Scale(ship1, k-0.2);
            Scale(ship2, k-0.2);
            Scale(shipConnectors, k-0.2);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            break;
        case "ArrowLeft":
            MultiplyMatrix(ship1, B);
            MultiplyMatrix(ship2, B);
            MultiplyMatrix(shipConnectors, B);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Left pressed");
            break;
        case "ArrowRight":
            MultiplyMatrix(ship1, A);
            MultiplyMatrix(ship2, A);
            MultiplyMatrix(shipConnectors, A);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Right pressed");
            break;
        case "ArrowUp":
            MultiplyMatrix(ship1, C);
            MultiplyMatrix(ship2, C);
            MultiplyMatrix(shipConnectors, C);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Up pressed");
            break;
        case "ArrowDown":
            MultiplyMatrix(ship1, D);
            MultiplyMatrix(ship2, D);
            MultiplyMatrix(shipConnectors, D);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Down pressed");
            break;
        case "r":
            RotateObj(corpus, 0.01);
            RotateObj(cab, 0.01);
            RotateObj(roof, 0.01);
            RotateObj(pipe, 0.01);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                myCat.draw(catMatrix[i]);
        }
    }
});
//--------------------------------------------------------------------
//-----------------------------Поворот-------------------------------
function RotateObj(A,f){
    let mtxRotate = [
        [Math.cos(f), Math.sin(f), 0],
        [-Math.sin(f),Math.cos(f), 0],
        [0, 0,  1] 
    ]
    var rowsA = A.length,
        rowsB = mtxRotate.length,
        colsB = mtxRotate[0].length;
        for (var k = 0; k < colsB; k++) {
            for (var i = 0; i < rowsA; i++) {
                var t = 0;
                for (var j = 0; j < rowsB; j++) t += A[i][j] * mtxRotate[j][k];
                A[i][k] = t;//Number(t.toFixed(1));
            }
        }
        console.log("A ", A)
        return A;
}
//-----------------------------------------------------------------
//---------------------------Масштабирование-----------------------
function Scale(A,k){
    let scaleMatrix=[
        [k, 0, 0],
        [0, k, 0],
        [0, 0, 1]
    ]
    MultiplyMatrix(A, scaleMatrix);
}
