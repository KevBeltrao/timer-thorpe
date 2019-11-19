const gel = (el) => document.querySelector(el);
const startButton = gel('.start-button');
const timer = gel('.timer');

const startStop = [];
let isCounting = false;

const counter = () => {
  let total = 0;
  let range = startStop.length % 2 ? startStop.length - 1 : startStop.length;

  for (let i = 0; i < range; i++) {
    if (i % 2) total += startStop[i] - startStop[i - 1];
  }

  if (startStop.length % 2) total += Date.now() - startStop[startStop.length - 1];

  return total;
}

startButton.addEventListener('click', () => {
  startStop.push(Date.now());
  isCounting = !isCounting;
  startButton.innerHTML = isCounting ? 'Stop' : 'Start';
});

const removeFather = (time, father) => {
  while (time >= father) {
    time -= father;
  }

  return time;
}

const addZero = (number) => number >= 10 ? number : `0${number}`;

const convert = (time) => {
  let days = Math.floor(time / 86400000);
  if (days) time = removeFather(time, 86400000);

  let hours = Math.floor(time / 3600000);
  if (hours) time = removeFather(time, 3600000);

  let minutes = Math.floor(time / 60000);
  if (minutes) time = removeFather(time, 60000);
  
  let seconds = Math.floor(time / 1000);

  const plural = days > 1 ? 's' : '';

  return `${addZero(days)} dia${plural} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

setInterval(() => {
  if (!startStop.length) return;

  const ms = counter();
  timer.innerHTML = convert(ms);
}, 50);
