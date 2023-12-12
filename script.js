$(document).ready(function () {
    // Display current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  

    function setColors() {
      let currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        let hour = parseInt($(this).attr("data-hour"));
  
        if (hour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (hour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
    setColors();
    
    // Set interval to set colors every mins
    setInterval(setColors, 60000);
  
    // Save event to local storage
    $(".saveBtn").on("click", function () {
      let hour = $(this).parent().attr("data-hour");
      let eventText = $(this).siblings(".description").val();
  
      localStorage.setItem("event_" + hour, eventText);
    });
  
    // Load events from local storage
    $(".time-block").each(function () {
      let hour = $(this).attr("data-hour");
      let savedEvent = localStorage.getItem("event_" + hour);
  
      if (savedEvent) {
        $(this).children(".description").val(savedEvent);
      }
    });
  });