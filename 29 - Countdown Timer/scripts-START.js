// define countdown variable so we can set the setInterval to it later which allows us to clear the setInterval to stop the timer
let countdown;

// elements selections
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any existing timers so multiple timers don't start as the user selects multiple buttons
  clearInterval(countdown);

  const now = Date.now();
  // the date timestamp that we want to countdown from
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  // set to variable so we can clear it and stop the timer
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // stop the countdown when it gets to 0
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // call function to display time with however many total seconds are left
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const display = `${minutes}:${
    // ternary used to make sure the extra zero shows up otherwise single digits will only show one digit
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;

  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  /**
   * Figure out what time the timer will end and display it to the user
   */
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  // ternary used to ensure zero exists for single digit minutes and ternary used for hours to keep format not military time
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  /**
   * starts timer via buttons at the top
   */
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));

// note: we don't need to select an element then add the event listener.
// if the element has a "name" attribute, you can simply do document.[name].addEventListener
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // same logic with the this.minutes as the customForm selection above
  const mins = this.minutes.value;

  timer(mins * 60);

  // reset the form field after it is submitted
  this.reset();
});
