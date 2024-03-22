const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];

const numberGrid = document.getElementById('number-grid');
const shuffleBtn = document.getElementById('shuffle-btn');
const restartBtn = document.getElementById('restart-btn');
const timerDisplay = document.getElementById('timer');

let startTime, endTime;
let timerInterval;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createNumberCells() {
    numberGrid.innerHTML = ''; // ล้างเซลล์เดิมออกก่อนสร้างใหม่
    numbers.forEach(number => {
        const cell = document.createElement('div');
        cell.classList.add('number-cell');
        cell.textContent = number === '' ? '' : number.toString();
        numberGrid.appendChild(cell);
        cell.addEventListener('click', () => moveNumber(number));
    });
}

function moveNumber(number) {
    const index = numbers.indexOf(number);
    const emptyIndex = numbers.indexOf('');
    if (isMoveValid(index, emptyIndex)) {
        [numbers[index], numbers[emptyIndex]] = [numbers[emptyIndex], numbers[index]];
        createNumberCells();
        checkWin();
    }
}

function isMoveValid(index, emptyIndex) {
    const row = Math.floor(index / 4);
    const emptyRow = Math.floor(emptyIndex / 4);
    const col = index % 4;
    const emptyCol = emptyIndex % 4;

    return (
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
}

function checkWin() {
    const winNumbers = numbers.slice(0, numbers.length - 1);
    if (numbers.every((number, index) => number === winNumbers[index])) {
        clearInterval(timerInterval); // หยุดเวลาเมื่อเกมจบ
        endTime = new Date(); // บันทึกเวลาเมื่อเกมจบ
        const timeTaken = (endTime - startTime) / 1000; // คำนวณเวลาที่ใช้
        alert(`Congratulations! You won in ${timeTaken} seconds!`);

        // แสดงข้อความและเวลาที่ได้บนหน้าเว็บ
        const winMessage = document.createElement('div');
        winMessage.textContent = `Congratulations! You won in ${timeTaken} seconds!`;
        document.body.appendChild(winMessage);

        restartBtn.disabled = false; // เปิดให้ปุ่ม Restart Game ใช้งาน
        shuffleBtn.textContent = 'Restart'; // เปลี่ยนข้อความปุ่ม Shuffle เป็น Restart
    }
}

shuffleBtn.addEventListener('click', () => {
    startTime = new Date(); // เริ่มเวลาเมื่อเริ่มเกมใหม่
    clearInterval(timerInterval); // หยุดเวลาก่อนเริ่มเกมใหม่
    timerInterval = setInterval(updateTimer, 1000); // เริ่มจับเวลาใหม่
    shuffleArray(numbers);
    createNumberCells();
    restartBtn.disabled = false; // เปิดให้ปุ่ม Restart Game ใช้งาน
});

restartBtn.addEventListener('click', () => {
    startTime = null;
    endTime = null;
    clearInterval(timerInterval);
    timerDisplay.textContent = '';
    
    // จัดเรียงตัวเลขใหม่ โดยให้ตัวเลข 1 อยู่ซ้ายสุด
    numbers.sort((a, b) => {
        if (a === '' || b === '') return 1; // ถ้าเป็นช่องว่างให้ไว้ขวาสุด
        if (a === 1) return -1; // ตัวเลข 1 ให้ไว้ซ้ายสุด
        if (b === 1) return 1;
        return a - b;
    });

    createNumberCells();
    restartBtn.disabled = true; // ปิดให้ปุ่ม Restart Game ใช้งาน
    shuffleBtn.textContent = 'Shuffle'; // เปลี่ยนข้อความปุ่ม Restart เป็น Shuffle
});


function updateTimer() {
    const currentTime = new Date();
    const timePassed = (currentTime - startTime) / 1000;
    timerDisplay.textContent = `Time: ${timePassed} seconds`;
}

createNumberCells();
