const API_KEY = '29a6c364a48ffb4dc069357c05ea0778';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');

async function getWeather(city) {
  weatherCard.innerHTML = '<div class="placeholder-text">Загружаем...</div>';

  try {
    const res = await fetch(
      `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`
    );

    if (!res.ok) {
      throw new Error('Город не найден');
    }

    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    weatherCard.innerHTML = `<div class="error-text">😕 ${err.message}</div>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind, sys } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherCard.innerHTML = `
    <div class="weather-content">
      <div class="city-name">📍 ${name}, ${sys.country}</div>
      <div class="weather-main">
        <img class="weather-icon" src="${icon}" alt="${weather[0].description}" />
        <div>
          <div class="temp">${Math.round(main.temp)}<span>°C</span></div>
          <div class="description">${weather[0].description}</div>
        </div>
      </div>
      <div class="details">
        <div class="detail-item">
          <span class="detail-label">Ощущается</span>
          <span class="detail-value">${Math.round(main.feels_like)}°C</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Влажность</span>
          <span class="detail-value">${main.humidity}%</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Ветер</span>
          <span class="detail-value">${Math.round(wind.speed)} м/с</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Давление</span>
          <span class="detail-value">${main.pressure} гПа</span>
        </div>
      </div>
    </div>
  `;
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});
// error handling improved
