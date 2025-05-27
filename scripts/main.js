const dailyButton = document.querySelector(".daily-btn");
const weeklyButton = document.querySelector(".weekly-btn");
const monthlyButton = document.querySelector(".monthly-btn");

const buttons = [dailyButton, weeklyButton, monthlyButton];

let activityData = []; // Global storage for fetched data

// Fetching data
fetch("/data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Oops! Something went wrong.");
    return response.json();
  })
  .then((data) => {
    activityData = data;
    renderData("weekly");
    setActiveButton(weeklyButton);
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Button click event listeners
dailyButton.addEventListener("click", () => {
  renderData("daily");
  setActiveButton(dailyButton);
});
weeklyButton.addEventListener("click", () => {
  renderData("weekly");
  setActiveButton(weeklyButton);
});
monthlyButton.addEventListener("click", () => {
  renderData("monthly");
  setActiveButton(monthlyButton);
});

// Render activity data
function renderData(timeframe) {
  const container = document.querySelector(".activities");
  container.innerHTML = activityData
    .map((activity) => {
      const current = activity.timeframes[timeframe].current;
      const previous = activity.timeframes[timeframe].previous;
      const label =
        timeframe === "daily"
          ? "Yesterday"
          : timeframe === "weekly"
          ? "Last Week"
          : "Last Month";

      return `
        <div class="activity-card ${activity.title.toLowerCase()}">
          <div class="image-container">
            <img src="${activity.image}" alt="Icon of ${activity.title}">
          </div>
          <article class="activity">
            <div class="title">
              <p>${activity.title}</p>
              <img src="./images/icon-ellipsis.svg" alt="Ellipsis icon">
            </div>
            <div class="time">
              <p class="current-time">${current}hrs</p>
              <p class="previous-time">${label} - ${previous}hrs</p>
            </div>
          </article>
        </div>
      `;
    })
    .join("");
}

// Highlight the active button
function setActiveButton(activeBtn) {
  buttons.forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}
