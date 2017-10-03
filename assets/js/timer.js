/** groups functions related to Timer */

const TimerFunctions = {

    /**
     * Starts the timer
     * @param {number} minutes - sets the minutes for the timer
     * @param {number} seconds - sets the seconds for the timer
     */
    start: function(minutes, seconds){
      // converting minutes and seconds to milliseconds
      let m = minutes * 60000;
      let s = seconds * 1000;

      let timeToRun = new Date(Date.parse(new Date()) +  m + s);
      TimerFunctions.update(timeToRun);
      window.timeInterval = setInterval(() => { TimerFunctions.update(timeToRun)}, 1000);
      window.isPaused = false;
    },

    /**
   * Updates timer and his text
   * @param {object} timeToRun - sets time that is left
   */
  update: function(timeToRun){
    let timeDisplay = document.getElementById("time");
    let runningTime = TimerFunctions.getRemainingTime(timeToRun);
    timeDisplay.innerHTML = ('0' + runningTime.minutes).slice(-2) + " : " + ('0' + runningTime.seconds).slice(-2);

    /**If time runs out, stop the interval */
    if(runningTime.finalTime <= 0){
      clearInterval(window.timeInterval);
    }
  },

  /**
   * Calculates time that is left remaining
   * @param {object} time - passing time that needs to be calculated
   * @return {object} - calculated total time, minutes and seconds
   */
  getRemainingTime: function(time){
    let finalTime = Date.parse(time) - Date.parse(new Date());
    let minutes = Math.floor((finalTime / 1000 / 60) % 60);
    let seconds = Math.floor((finalTime / 1000) % 60);

    return {
      "finalTime": finalTime,
      "minutes": minutes,
      "seconds": seconds
    };
  },
  }
