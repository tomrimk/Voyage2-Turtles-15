/** groups functions related to Timer */

const TimerFunctions = {

    /**
     * Starts the timer
     * @param {number} minutes - sets the minutes for the timer
     * @param {number} seconds - sets the seconds for the timer
     */
    startTimer: function(minutes, seconds) {
      // converting minutes and seconds to milliseconds
      let m = minutes * 60000;
      let s = seconds * 1000;

      let timeToRun = new Date(Date.parse(new Date()) +  m + s);
      TimerFunctions.updateTimer(timeToRun);
      window.timeInterval = setInterval(() => { TimerFunctions.updateTimer(timeToRun)}, 1000);
      window.isPaused = false;
    },

    /**
   * Updates timer and his text
   * @param {object} timeToRun - sets time that is left
   */
  updateTimer: function(timeToRun) {
    let timeDisplay = document.getElementById("time");
    let runningTime = TimerFunctions.getRemainingTime(timeToRun);
    timeDisplay.innerHTML = ('0' + runningTime.minutes).slice(-2) + " : " + ('0' + runningTime.seconds).slice(-2);

    /**If time runs out, stop the interval */
    if(runningTime.finalTime <= 0) {
      clearInterval(window.timeInterval);
    }
  },

  /**
   * Calculates time that is left remaining
   * @param {object} time - passing time that needs to be calculated
   * @return {object} - calculated total time, minutes and seconds
   */
  getRemainingTime: function(time) {
    let finalTime = Date.parse(time) - Date.parse(new Date());
    let minutes = Math.floor((finalTime / 1000 / 60) % 60);
    let seconds = Math.floor((finalTime / 1000) % 60);

    return {
      "finalTime": finalTime,
      "minutes": minutes,
      "seconds": seconds
    };
  },

  /**
   * Pauses the timer / resumes the timer
   */
  pauseTimer: function() {
    if(!window.isPaused) {
      clearInterval(window.timeInterval);
      window.isPaused = true;
    } else {
      let timeDisplay = document.getElementById("time").innerHTML;
      let str = timeDisplay.split(" ");
      let minutes = parseInt(str[0], 10);
      let seconds = parseInt(str[2], 10);

      TimerFunctions.startTimer(minutes, seconds);
      window.isPaused = false;
    }
  },

  /**
   * Stops the timer and resets it
   */
  stopTimer: function() {
    clearInterval(window.timeInterval);
    let timeDisplay = document.getElementById("time");
    timeDisplay.innerHTML = "00 : 00";
  }
};
