// Update all clocks every second
function updateTime() {
  document.querySelectorAll(".clock-card").forEach((clock) => {
    const timezone = clock.dataset.timezone;
    const time = moment().tz(timezone);

    const dateElement = clock.querySelector(".date");
    const timeElement = clock.querySelector(".time");

    if (dateElement) {
      dateElement.innerHTML = time.format("MMMM Do YYYY");
    }

    if (timeElement) {
      timeElement.innerHTML = time.format("h:mm:ss [<small>]A[</small>]");
    }
  });
}

// Add a city clock card
function addClock({ id, timezone, name }) {
  const clocksContainer = document.getElementById("clocks-container");
  if (!clocksContainer) {
    console.error("Clocks container element not found.");
    return;
  }

  // Prevent adding a duplicate clock
  if (document.getElementById(id)) return;

  const time = moment().tz(timezone);

  clocksContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="city clock-card" id="${id}" data-timezone="${timezone}">
      <div>
        <h2>${name}</h2>
        <div class="date">${time.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">${time.format("h:mm:ss")} <small>${time.format(
      "A"
    )}</small></div>
      <button class="remove-clock-btn" data-city-id="${id}">&times;</button>
    </div>
  `
  );
}

// Set up default clocks
function setupInitialClocks() {
  addClock({
    id: "centurion-clock",
    timezone: "Africa/Johannesburg",
    name: "Centurion",
  });

  addClock({
    id: "moscow-clock",
    timezone: "Europe/Moscow",
    name: "Moscow",
  });
}

// Add new city from dropdown
function updateCity(event) {
  const timezone = event.target.value;
  const name = timezone.includes("/")
    ? timezone.split("/")[1].replace("_", " ")
    : timezone;
  const id = `${timezone.replace(/\//g, "-")}-clock`;

  addClock({ id, timezone, name });
}

// Remove clock
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-clock-btn")) {
    const clockId = e.target.dataset.cityId;
    document.getElementById(clockId)?.remove();
  }
});

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  const citySelectElement = document.getElementById("city-select");
  if (citySelectElement) {
    citySelectElement.addEventListener("change", updateCity);
  }

  setupInitialClocks();
  updateTime();
  setInterval(updateTime, 1000); // Update every second
});
