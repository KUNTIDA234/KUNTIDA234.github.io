// รอให้เอกสาร HTML โหลดเสร็จก่อนที่จะเริ่มทำงาน
document.addEventListener('DOMContentLoaded', function () {
  // นำเข้าองค์ประกอบ DOM ที่จำเป็น
  const board = document.getElementById('game-board');
  const message = document.getElementById('message');
  const startBtn = document.getElementById('start-btn');
  const timer = document.getElementById('timer');

  // สร้างอาร์เรย์ตัวเลข 1-15 และเพิ่มตัวว่าง
  let numbers = [...Array(15).keys()].map(i => i + 1);
  numbers.push('');
  let timerInterval;
  let seconds = 0;

  // เมื่อคลิกที่ปุ่มเริ่มเกม
  startBtn.addEventListener('click', startGame);

  // เริ่มเกม
  function startGame() {
      shuffleArray(numbers); // สับเปลี่ยนตำแหน่งของตัวเลข
      renderBoard(); // แสดงบอร์ดที่สุ่มแล้ว
      startTimer(); // เริ่มจับเวลา
      message.textContent = ''; // ลบข้อความที่แสดงผล
      startBtn.textContent = 'Shuffle Numbers'; // เปลี่ยนข้อความปุ่ม
      startBtn.removeEventListener('click', startGame); // ลบ event listener เดิม
      startBtn.addEventListener('click', shuffleNumbers); // เพิ่ม event listener ใหม่
  }

  // แสดงบอร์ดที่สุ่มแล้ว
  function renderBoard() {
      board.innerHTML = ''; // ล้างเนื้อหาในบอร์ด
      numbers.forEach(number => {
          const tile = document.createElement('div'); // สร้าง div สำหรับแต่ละตำแหน่ง
          tile.classList.add('tile'); // เพิ่มคลาส .tile
          tile.textContent = number; // กำหนดเลขใน tile
          tile.addEventListener('click', () => moveTile(number)); // เพิ่ม event listener สำหรับย้าย tile
          board.appendChild(tile); // เพิ่ม tile ลงในบอร์ด
      });
  }

  // ย้ายไทล์ตำแหน่งหนึ่งไปยังตำแหน่งว่าง
  function moveTile(number) {
      const currentIndex = numbers.indexOf(number); // หา index ปัจจุบันของตัวเลข
      const emptyIndex = numbers.indexOf(''); // หา index ของตำแหน่งว่าง
      const rowDiff = Math.abs(Math.floor(currentIndex / 4) - Math.floor(emptyIndex / 4)); // คำนวณความต่างแถว
      const colDiff = Math.abs((currentIndex % 4) - (emptyIndex % 4)); // คำนวณความต่างคอลัมน์

      // ย้ายไทล์ได้เฉพาะเมื่ออยู่ในแถวเดียวกันหรือคอลัมน์เดียวกัน
      if ((rowDiff === 0 && colDiff === 1) || (colDiff === 0 && rowDiff === 1)) {
          numbers[emptyIndex] = numbers[currentIndex]; // ย้ายตัวเลขไปยังตำแหน่งว่าง
          numbers[currentIndex] = ''; // ตัวเลขปัจจุบันกลายเป็นตำแหน่งว่าง
          renderBoard(); // แสดงบอร์ดใหม่
          checkWin(); // ตรวจสอบว่าชนะหรือยัง
      }
  }

  // ตรวจสอบว่าชนะหรือยัง
  function checkWin() {
      // ตรวจสอบว่าตำแหน่งตัวเลขเรียงติดกันหรือไม่
      if (numbers.slice(0, -1).every((number, index) => parseInt(number) === index + 1)) {
          clearInterval(timerInterval); // หยุดจับเวลา
          message.textContent = 'Congratulations! You solved the puzzle!'; // แสดงข้อความชนะ
          startBtn.textContent = 'Shuffle Numbers'; // เปลี่ยนข้อความปุ่มกลับเป็น Shuffle Numbers
          startBtn.removeEventListener('click', shuffleNumbers); // ลบ event listener shuffleNumbers
          startBtn.addEventListener('click', startGame); // เพิ่ม event listener startGame
          document.querySelectorAll('.tile').forEach(tile => tile.classList.add('correct')); // เพิ่มคลาส .correct ให้ทุก tile
      }
  }

  // เริ่มจับเวลา
  function startTimer() {
      seconds = 0; // เริ่มเวลาที่ 0
      timer.textContent = 'Time: 0 seconds'; // แสดงเวลาเริ่มต้น
      clearInterval(timerInterval); // หยุดการจับเวลาก่อนหน้า (ถ้ามี)
      timerInterval = setInterval(() => { // ให้เริ่มต้นการจับเวลาทุก 1 วินาที
          seconds++; // เพิ่มเวลาทีละ 1 วินาที
          timer.textContent = `Time: ${seconds} second${seconds !== 1 ? 's' : ''}`; // แสดงเวลาที่ผ่านไป
      }, 1000);
  }

  // สับเปลี่ยนตำแหน่งของอาร์เรย์
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // สับเปลี่ยนตำแหน่งของสมาชิก
      }
  }

  // สับเปลี่ยนตำแหน่งของตัวเลข
  function shuffleNumbers() {
      shuffleArray(numbers); // สับเปลี่ยนตำแหน่งของตัวเลข
      renderBoard(); // แสดงบอร์ดที่สุ่มแล้ว
      resetTimer(); // รีเซ็ตจับเวลา
  }

  // รีเซ็ตจับเวลา
  function resetTimer() {
      clearInterval(timerInterval); // หยุดจับเวลา
      startTimer(); // เริ่มจับเวลาใหม่
  }
});
