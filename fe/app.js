const CACHE_KEY_PREFIX = "wiki_analytics_";
const CACHE_DURATION = 60 * 60 * 1000;
const WIKI_DATA_GET_URL = "http://localhost:8000/api/wiki";
const STATUS_CODES = {
  SUCCESS: 200,
  ERROR: 500,
}

let viewsChart = null;

let currentPeriod = 30;

const loadingIndicator = document.getElementById("loadingIndicator");
const periodButtons = document.querySelectorAll(".period-btn");
const refreshButton = document.getElementById("refreshBtn");
const totalCurrentViewsElement = document.getElementById("totalCurrentViews");
const totalPreviousViewsElement = document.getElementById("totalPreviousViews");
const viewsChangeElement = document.getElementById("viewsChange");

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadData(currentPeriod);
});

const setupEventListeners = () => {
  periodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const period = Number.parseInt(button.dataset.period);

      periodButtons.forEach((btn) => {
        btn.classList.remove("bg-primary", "text-white");
        btn.classList.add("bg-gray-200", "text-gray-700");
      });

      button.classList.remove("bg-gray-200", "text-gray-700");
      button.classList.add("bg-primary", "text-white");

      currentPeriod = period;
      loadData(period);
    });
  });

  refreshButton.addEventListener("click", () => {
    clearCacheForPeriod(currentPeriod);
    loadData(currentPeriod);
  });
};

const fetchData = async (period) => {
  const url = `${WIKI_DATA_GET_URL}?period=${period}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const loadData = async (period) => {
  try {
    showLoading();

    const cachedData = getCachedData(period);
    if (cachedData) {
      updateUI(cachedData);
      return;
    }

    const { data, code } = await fetchData(period);

    if(code === STATUS_CODES.SUCCESS){
      cacheData(period, data);
      updateUI(data);
    } else{
      console.error("Error fetching data:", data.message);
      alert("Failed to load data. Please try again later.");
    }
  } catch (error) {
    console.error("Error loading data:", error);
    alert("Failed to load data. Please try again later.");
  } finally {
    hideLoading();
  }
};

const updateUI = (data) => {
  updateChart(data);
  updateSummaryStats(data);
};

const updateChart = (data) => {
  const ctx = document.getElementById("viewsChart").getContext("2d");
  if (viewsChart) {
    viewsChart.destroy();
  }

  viewsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Current Period",
          data: data.currentData,
          backgroundColor: "#2563eb",
          borderColor: "#2563eb",
          borderWidth: 1,
        },
        {
          label: "Previous Period",
          data: data.previousData,
          backgroundColor: "#64748b",
          borderColor: "#64748b",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => formatNumber(value),
          },
        },
      },
    },
  });
};

const updateSummaryStats = (data) => {
  const totalCurrent = data.currentData.reduce((sum, value) => sum + value, 0);
  const totalPrevious = data.previousData.reduce(
    (sum, value) => sum + value,
    0
  );
  const percentChange = ((totalCurrent - totalPrevious) / totalPrevious) * 100;
  totalCurrentViewsElement.textContent = formatNumber(totalCurrent);
  totalPreviousViewsElement.textContent = formatNumber(totalPrevious);
  const changeIcon =
    percentChange >= 0
      ? '<i class="fas fa-arrow-up text-green-500 mr-1"></i>'
      : '<i class="fas fa-arrow-down text-red-500 mr-1"></i>';
  const changeClass = percentChange >= 0 ? "text-green-500" : "text-red-500";
  viewsChangeElement.innerHTML = `
    <span class="${changeClass}">
      ${changeIcon}
      ${Math.abs(percentChange).toFixed(2)}%
    </span>
  `;
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const showLoading = () => {
  loadingIndicator.classList.remove("hidden");
};

const hideLoading = () => {
  loadingIndicator.classList.add("hidden");
};

const getCacheKey = (period) => {
  return `${CACHE_KEY_PREFIX}${period}`;
};

const getCachedData = (period) => {
  const cacheKey = getCacheKey(period);
  const cachedItem = localStorage.getItem(cacheKey);

  if (!cachedItem) {
    return null;
  }

  const { timestamp, data } = JSON.parse(cachedItem);
  const now = new Date().getTime();

  if (now - timestamp > CACHE_DURATION) {
    localStorage.removeItem(cacheKey);
    return null;
  }

  return data;
};

const cacheData = (period, data) => {
  const cacheKey = getCacheKey(period);
  const cacheItem = {
    timestamp: new Date().getTime(),
    data,
  };

  localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
};

const clearCacheForPeriod = (period) => {
  const cacheKey = getCacheKey(period);
  localStorage.removeItem(cacheKey);
};
