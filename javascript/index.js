// function to update the time

function updateTime() {
  let centurionElement = document.getElementById("centurion-clock");
  let centurionTimeElement = centurionElement.querySelector(".time");
  let centurionDateElement = centurionElement.querySelector(".date");
  let centurionTime = moment().tz("Africa/Johannesburg");
  centurionDateElement.innerHTML = centurionTime.format("DD MMM YYYY");
  centurionTimeElement.innerHTML = centurionTime.format(
    "hh:mm:ss[<small>]A[</small>]"
  );

  //
  let moscowElement = document.getElementById("moscow-clock");
  let moscowTimeElement = moscowElement.querySelector(".time");
  let moscowDateElement = moscowElement.querySelector(".date");
  let moscowTime = moment().tz("Europe/Moscow");
  moscowDateElement.innerHTML = moscowTime.format("DD MMM YYYY");
  moscowTimeElement.innerHTML = moscowTime.format(
    "hh:mm:ss[<small>]A[</small>]"
  );
}

updateTime();
setInterval(updateTime, 1000);
