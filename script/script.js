document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    const message = document.getElementById('message');
    const startBtn = document.getElementById('start-btn');
    const timer = document.getElementById('timer');
  
    let numbers = [...Array(15).keys()].map(i => i + 1); // สร้างอาร์เรย์ตัวเลข 1-15
    numbers.push('');
    let timerInterval;
    let seconds = 0;
  
    startBtn.addEventListener('click', startGame);
  
    function startGame() {
      shuffleArray(numbers);
      renderBoard();
      startTimer();
      message.textContent = '';
      startBtn.textContent = 'Shuffle Numbers'; // เปลี่ยนข้อความปุ่ม
      startBtn.removeEventListener('click', startGame); // ลบ event listener เดิม
      startBtn.addEventListener('click', shuffleNumbers); // เพิ่ม event listener ใหม่
    }
  
    function renderBoard() {
      board.innerHTML = '';
      numbers.forEach(number => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = number;
        tile.addEventListener('click', () => moveTile(number));
        board.appendChild(tile);
      });
    }
  
    function moveTile(number) {
      const currentIndex = numbers.indexOf(number);
      const emptyIndex = numbers.indexOf('');
      const rowDiff = Math.abs(Math.floor(currentIndex / 4) - Math.floor(emptyIndex / 4));
      const colDiff = Math.abs((currentIndex % 4) - (emptyIndex % 4));
  
      if ((rowDiff === 0 && colDiff === 1) || (colDiff === 0 && rowDiff === 1)) {
        numbers[emptyIndex] = numbers[currentIndex];
        numbers[currentIndex] = '';
        renderBoard();
        checkWin();
      }
    }
  
    function checkWin() {
      if (numbers.slice(0, -1).every((number, index) => parseInt(number) === index + 1)) {
        clearInterval(timerInterval);
        message.textContent = 'Congratulations! You solved the puzzle!';
        startBtn.textContent = 'Shuffle Numbers'; // เปลี่ยนข้อความปุ่มกลับเป็น Shuffle Numbers
        startBtn.removeEventListener('click', shuffleNumbers); // ลบ event listener shuffleNumbers
        startBtn.addEventListener('click', startGame); // เพิ่ม event listener startGame
        document.querySelectorAll('.tile').forEach(tile => tile.classList.add('correct'));
      }
    }
  
    function startTimer() {
      seconds = 0;
      timer.textContent = 'Time: 0 seconds';
      clearInterval(timerInterval); // เพิ่มการรีเซ็ตเวลา
      timerInterval = setInterval(() => {
        seconds++;
        timer.textContent = `Time: ${seconds} second${seconds !== 1 ? 's' : ''}`;
      }, 1000);
    }
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    function shuffleNumbers() {
      shuffleArray(numbers);
      renderBoard();
      resetTimer(); // เรียกใช้งานเมื่อสุ่มเลข
    }
  
    function resetTimer() {
      clearInterval(timerInterval);
      startTimer();
    }
  });
  