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

// функция перемножения матриц
function MultiplyMatrix(A, B) {
    var rowsA = A.length,
        rowsB = B.length,
        colsB = B[0].length;
    for (var k = 0; k < colsB; k++) {
        for (var i = 0; i < rowsA; i++) {
            var t = 0;
            for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
            A[i][k] = t;
        }
    }
   //console.log(A);
    return A;
}


class Cat {
    draw(part) {
        let arr = getNewMatrix(part);
        //console.log(arr)
        for (let i = 0; i < arr.length-1; i+=2) {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = "4";
            ctx.moveTo(arr[i][0], arr[i][1]); //координаты начала линии
            ctx.lineTo(arr[i + 1][0], arr[i + 1][1]); // координаты конца линии
            ctx.stroke();
            //console.log(arr[i][0], arr[i][1],arr[i + 1][0], arr[i + 1][1]);
        }
    }
}
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
let myCat = new Cat();
myCat.draw(mCat1);
myCat.draw(mCat2);
myCat.draw(mSoed);
let CatLeft = new Cat();
let CatBack = new Cat();
let CatTop = new Cat();

let k = 1;
let f = 0.01;
let pLeft = [
    [0,0,1,0],
    [0,1,0,0],
    [-1,0,0,0],
    [0,0,0,1]
]
let pBack = [
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1]
]
let pTop = [
    [1,0,0,0],
    [0,0,-1,0],
    [0,1,0,0],
    [0,0,0,1]
]
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "+":
            Scale(mCat1, k+0.2);
            Scale(mCat2, k+0.2);
            Scale(mSoed, k+0.2);
          
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
        break;
        case "-":
            Scale(mCat1, k-0.2);
            Scale(mCat2, k-0.2);
            Scale(mSoed, k-0.2);
           
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            break;
        case "ArrowLeft":
            MultiplyMatrix(mCat1, B);
            MultiplyMatrix(mCat2, B);
            MultiplyMatrix(mSoed, B);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Left pressed");
            break;
        case "ArrowRight":
            MultiplyMatrix(mCat1, A);
            MultiplyMatrix(mCat2, A);
            MultiplyMatrix(mSoed, A);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Right pressed");
            break;
        case "ArrowUp":
            MultiplyMatrix(mCat1, C);
            MultiplyMatrix(mCat2, C);
            MultiplyMatrix(mSoed, C);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Up pressed");
            break;
        case "ArrowDown":
            MultiplyMatrix(mCat1, D);
            MultiplyMatrix(mCat2, D);
            MultiplyMatrix(mSoed, D);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                    myCat.draw(catMatrix[i]);
            }
            console.log("Down pressed");
            break;
        case "z":
            RotateObj(mCat1, mtxRotateZ);
            RotateObj(mCat2, mtxRotateZ);
            RotateObj(mSoed, mtxRotateZ);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                myCat.draw(catMatrix[i]);
        }
        break;
        case "y":
            RotateObj(mCat1, mtxRotateY);
            RotateObj(mCat2, mtxRotateY);
            RotateObj(mSoed, mtxRotateY);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                myCat.draw(catMatrix[i]);
        }
        break;
        case "x":
            RotateObj(mCat1,  mtxRotateX);
            RotateObj(mCat2,  mtxRotateX);
            RotateObj(mSoed,  mtxRotateX);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < catMatrix.length; i++) {
                myCat.draw(catMatrix[i]);
            }
        break;
        //проекции
        case "p":
           CreatePTop(20,-30);
            //CreatePLeft(-20,-30);
            //CreatePBack(0, -30)
            console.log("p");
        break;
        case "q":
            CreatePLeft(-20,-30);
            console.log("q");
        break;
        case "o":
            CreatePBack(0, -30);
            console.log("o");
        break;

    }
    
})
let mtxRotateZ = [
    [Math.cos(f), Math.sin(f), 0, 0],
    [-Math.sin(f),Math.cos(f), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]
let mtxRotateY = [
    [Math.cos(f),0,-Math.sin(f),0],
    [0,1,0,0],
    [Math.sin(f),0, Math.cos(f),0],
    [0,0,0,1]
]

let mtxRotateX=[
    [1,0,0,0],
    [0,Math.cos(f), Math.sin(f),  0],
    [0,-Math.sin(f),Math.cos(f), 0],
    [0,0,0,1]
]
//-----------------------------Поворот---------------------------------
function RotateObj(A,mtxRotate){
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
        //console.log("A ", A)
        return A;
}
//-----------------------------------------------------------------
//---------------------------Масштабирование-----------------------
function Scale(A,k){
    let scaleMatrix=[
        [k, 0, 0, 0],
        [0, k, 0, 0],
        [0, 0, k, 0],
        [0, 0, 0, 1]
    ]
    MultiplyMatrix(A, scaleMatrix);
}
//-------------------------------Перемещение----------------------------------------
function MoveObj(mtx,x,y){
    let mtxMove = [
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [x,y,0,1]
    ]
    MultiplyMatrix(mtx, mtxMove);
    //console.log(mtx);
}
//------------------------Ортографичекая проекция-----------------------------
function CreatePLeft(x,y){
    MultiplyMatrix(mCat1, pLeft);
    MultiplyMatrix(mCat2, pLeft);
    MultiplyMatrix(mSoed, pLeft);
    MoveObj(mCat1,x,y);
    MoveObj(mCat2,x,y);
    MoveObj(mSoed,x,y);
    for (let i = 0; i < catMatrix.length; i++) {
        CatLeft.draw(catMatrix[i]);
    }
}
function CreatePBack(x,y){
    MultiplyMatrix(mCat1, pBack);
    MultiplyMatrix(mCat2, pBack);
    MultiplyMatrix(mSoed, pBack);
    MoveObj(mCat1,x,y)
    MoveObj(mCat2,x,y)
    MoveObj(mSoed,x,y)
    for (let i = 0; i < catMatrix.length; i++) {
        CatBack.draw(catMatrix[i]);

    }
}
function CreatePTop(x,y){
    MultiplyMatrix(mCat1, pTop);
    MultiplyMatrix(mCat2, pTop);
    MultiplyMatrix(mSoed, pTop);
    MoveObj(mCat1,x,y);
    MoveObj(mCat2,x,y);
    MoveObj(mSoed,x,y);
    for (let i = 0; i < catMatrix.length; i++) {
        CatTop.draw(catMatrix[i]);
    }
}