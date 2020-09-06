const timer = document.querySelector('.timer');
const minutesNode = document.querySelector('.j-minutes');
const secondsNode = document.querySelector('.j-seconds');
const message = document.querySelector('.j-message');
const btnShowTimer = document.querySelector('.j-show_timer');

const btn25 = document.querySelector('.j-btn-25');
const btn15 = document.querySelector('.j-btn-15');
const btn5 = document.querySelector('.j-btn-5');

const plus = document.querySelector('.j-plus');
const minus = document.querySelector('.j-minus');

const start = document.querySelector('.j-start');
const pause = document.querySelector('.j-pause');
const reset = document.querySelector('.j-reset');


let time = 0;
let intervId = null;

// Для однозначных чисел добавляем 0 впереди
const numberConverter = (value) => {
  if (value < 10) {
    return `0${value}`
  }
  return `${value}`
};

// Изменение времени на таймере, 1 час (3599 - секунд) => максимум
const changeCountdownTime = () => {
  if (time < 3599) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    
    minutesNode.innerHTML = numberConverter(minutes);
    secondsNode.innerHTML = numberConverter(seconds);
  }
};

// Ставим таймер на паузу
const pauseCountdown = () => {
  if (intervId) {
    clearInterval(intervId);
  }
};

changeCountdownTime();


// Обработчик кнопки  на 25 минут
btn25.addEventListener('click', () => {
  pauseCountdown();
  time = 25 * 60;
  changeCountdownTime();
});

// Обработчик кнопки  на 15 минут
btn15.addEventListener('click', () => {
  pauseCountdown();
  time = 15 * 60;
  changeCountdownTime();
});

// Обработчик кнопки  на 5 минут
btn5.addEventListener('click', () => {
  pauseCountdown();
  time = 5 * 60;
  changeCountdownTime();
});

// Обработчик кнопки увеличения на 1 секунду
plus.addEventListener('click', () => {
  pauseCountdown();
  if (time < 3599) {
    time += 1;
    changeCountdownTime();
  }
});

// Обработчик кнопки уменьшения на 1 секунду
minus.addEventListener('click', () => {
  pauseCountdown();
  if (time > 0) {
    time -= 1;
    changeCountdownTime();
  }
});


// Запуск таймера
start.addEventListener('click', () => {
  if (!intervId && time > 0){
    intervId = setInterval(() => {
      if (time > 0){
        time -= 1;
        changeCountdownTime();
      } else {
        clearInterval(intervId);
        intervId = null;
        timer.style.display = 'none';
        message.innerHTML = '<p>I am done.</p>'
        btnShowTimer.style.display = 'inline-block';
      }
    }, 1000);
  }
});

// Остановка таймера
pause.addEventListener('click', () => {
  pauseCountdown();
  intervId = null;
});

// Сброс таймера
reset.addEventListener('click', () => {
  time = 0;
  changeCountdownTime();
});

btnShowTimer.addEventListener('click', () => {
  timer.style.display = 'block';
  btnShowTimer.style.display = 'none';
  message.innerHTML = '<p> </p>'
});