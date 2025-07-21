// Player State
const playerState = {
  currentRoom: 1,
  hasKey: false,
  timeLeft: 60,
};

// Room Switcher
const goToRoom = (roomNumber) => {
  document.querySelectorAll('.room').forEach(div => div.classList.add('hidden'));
  document.getElementById(`room${roomNumber}`).classList.remove('hidden');
  playerState.currentRoom = roomNumber;
};

// Room 1: Password Check
const checkPassword = () => {
  const input = document.getElementById('password').value;
  if (input === 'sk9955') {
    alert(`Welcome Agent! Proceed to next room.`);
    goToRoom(2);
  } else {
    alert("Incorrect password! Try again.");
  }
};

function revealHint() {
  const hint = document.querySelector('.hidden-text');
  hint.style.color = 'lime'; }


// Room 2: Math Puzzle
const solveMathPuzzle = () => {
  const questions = [
    {
      question: "What is (8 × 5) + (60 ÷ 4)?",
      answer: 55
    },
    {
      question: "Solve: (12 × 3) - (6 ÷ 2)",
      answer: 33
    },
    {
      question: "What is (15 + 5) × 2?",
      answer: 40
    },
    {
      question: "Solve: (100 ÷ 4) + (3 × 2)",
      answer: 31
    },
    {
      question: "What is (9 × 9) - (5 × 3)?",
      answer: 66
    }
  ];

  const randomIndex = Math.floor(Math.random() * questions.length);
  const selected = questions[randomIndex];

  const userAnswer = prompt(selected.question);
  if (Number(userAnswer) === selected.answer) {
    alert("Trap Disabled!");
    goToRoom(3);
  } else {
    alert("Wrong answer! Try again.");
  }
};


// Room 3: Button Order Puzzle
let sequence = [];
const correctOrder = ["red", "green", "blue"];

const pressButton = (color) => {
  sequence.push(color);
  if (sequence.length === 3) {
    if (sequence.join() === correctOrder.join()) {
      alert("Security Panel Bypassed! Collect the key to continue.");
    } else {
      alert("Wrong order! Try again.");
    }
    sequence = [];
  }
};

// Collect Key
const collectKey = () => {
  playerState.hasKey = true;
  document.getElementById('keyStatus').innerText = "Key Collected ✔️";
  goToRoom(4);
};

// Room 4: Hover to reveal hint
function revealHint() {
  document.querySelector('.hidden-text').innerHTML = "The final escape code is: <b>freedom</b>";
}

// Final Escape
const finalEscape = () => {
  const code = document.getElementById('finalCode').value;
  if (code.toLowerCase() === "freedom" && playerState.hasKey) {
    clearInterval(countdown);
    alert(`Congratulations Agent! You have escaped the Spy Lab!`);
    window.location.href = "congratulations.html"; // Redirect
  } else {
    alert("Incorrect code or missing key!");
  }
};

// Typewriter Effect
window.onload = function () {
  const story = "You are trapped! Solve puzzles to escape.";
  let i = 0;
  const speed = 50;
  const storyElement = document.getElementById("story");
  storyElement.textContent = "";

  function typeWriter() {
    if (i < story.length) {
      storyElement.textContent += story.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
};


// Global Timer
window.onload = function () {
  let timeLeft = 60;
  const timerElement = document.getElementById("timer");

  const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}`;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    alert("Time's up! Mission failed.");
    location.reload(); // Or redirect to retry page
  }
}, 1000); 
}
