// Fetch and display weather data with updated UI and charts
document.getElementById('get-weather').addEventListener('click', async function () {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = 'caaaeb6569668d5fced6bf03ebfc1932'; // Replace with your OpenWeather API Key
    const units = 'metric';

    try {
        // Fetch current weather
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
        const weatherData = await response.json();
        if (response.ok) {
            displayWeatherData(weatherData);
            setWidgetBackground(weatherData.weather[0].main.toLowerCase());
        } else {
            alert(weatherData.message);
        }

        // Fetch 5-day forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`);
        const forecastData = await forecastResponse.json();
        if (forecastResponse.ok) {

            // displayForecastData(forecastData);
            generateCharts(forecastData);
        } else {
            alert(forecastData.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('City not found or API error.');
    }
});

function displayWeatherData(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = Math.round(data.main.temp);
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('feels-like').innerText = Math.round(data.main.feels_like);
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('wind-speed').innerText = data.wind.speed;
}

function setWidgetBackground(weather) {
    const widget = document.querySelector('.weather-section');
    switch (weather) {
        case 'clear':
            widget.style.backgroundImage = "url('images/clear-sky.avif')";
            break;
        case 'clouds':
            widget.style.backgroundImage = "url('images/cloudy.avif')";
            break;
        case 'rain':
        case 'drizzle':
            widget.style.backgroundImage = "url('images/rainy.jpg')";
            break;
        case 'snow':
            widget.style.backgroundImage = "url('images/snowy.jpg')";
            break;
        default:
            widget.style.backgroundImage = "url('images/default-weather.jpg')";
            break;
    }
}

function generateCharts(data) {
    const labels = data.list.map(item => item.dt_txt.split(' ')[0]);
    const temperatures = data.list.map(item => item.main.temp);
    const conditions = data.list.map(item => item.weather[0].main);

    // Generate Vertical Bar Chart
    const ctxBar = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels.slice(0, 10),
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures.slice(0, 10),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    });

    // Generate Doughnut Chart for weather conditions
    const conditionCounts = conditions.reduce((acc, condition) => {
        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
    }, {});
    
    const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
    new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: Object.keys(conditionCounts),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(conditionCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
                hoverOffset: 4
            }]
        },
        options: {
            animation: {
                delay: 500
            }
        }
    });

    // Generate Line Chart for temperature changes
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels.slice(0, 10),
            datasets: [{
                label: 'Temperature Trend',
                data: temperatures.slice(0, 10),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}
let currentPage = 1;
const entriesPerPage = 10;
let forecastData = []; // Holds forecast data for filtering and pagination

// Fetch and display weather data with pagination and filters
document.getElementById('get-weather').addEventListener('click', async function () {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = 'caaaeb6569668d5fced6bf03ebfc1932';
    const units = 'metric';

    try {
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`);
        const data = await forecastResponse.json();
        if (forecastResponse.ok) {
            forecastData = data.list.filter(item => item.dt_txt.includes("12:00:00")); // Extract daily data at noon
            renderTable(currentPage);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});



// Render table with pagination
function renderTable(page) {
    const tableBody = document.querySelector('#forecast-table tbody');
    tableBody.innerHTML = '';

    const startIndex = (page - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const paginatedData = forecastData.slice(startIndex, endIndex);

    paginatedData.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'short' });
        const morningTemp = item.main.temp_min;
        const noonTemp = item.main.temp;
        const eveningTemp = (item.main.temp + 2).toFixed(1); // For demo, let's simulate evening/night temp
        const nightTemp = (item.main.temp_min - 1).toFixed(1);

        const row = `
            <tr class="forecast-row">
                <td>${date}</td>
                <td>${morningTemp}°C</td>
                <td>${noonTemp}°C</td>
                <td>${eveningTemp}°C</td>
                <td>${nightTemp}°C</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Pagination controls
document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage * entriesPerPage < forecastData.length) {
        currentPage++;
        renderTable(currentPage);
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
});

// Sorting and Filtering
document.getElementById('sort-asc').addEventListener('click', () => {
    forecastData.sort((a, b) => a.main.temp - b.main.temp);
    renderTable(1);
});

document.getElementById('sort-desc').addEventListener('click', () => {
    forecastData.sort((a, b) => b.main.temp - a.main.temp);
    renderTable(1);
});

document.getElementById('filter-rain').addEventListener('click', () => {
    forecastData = forecastData.filter(item => item.weather[0].main.toLowerCase().includes('rain'));
    renderTable(1);
});

document.getElementById('highest-temp').addEventListener('click', () => {
    const highestTempDay = forecastData.reduce((highest, item) => (item.main.temp > highest.main.temp ? item : highest));
    forecastData = [highestTempDay];
    renderTable(1);
});

// Chatbot Response Logic
document.getElementById('send-message').addEventListener('click', function () {
    const userInput = document.getElementById('chat-input').value.trim();
    if (userInput) {
        addMessageToChat(userInput, 'user-message');
        handleBotResponse(userInput);
        document.getElementById('chat-input').value = '';
    }
});

function addMessageToChat(message, className) {
    const chatContent = document.getElementById('chat-content');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function handleBotResponse(userInput) {
    let botResponse = "I'm not sure how to answer that. Please try again.";

    if (userInput.toLowerCase().includes("highest temperature")) {
        const highestTemp = Math.max(...forecastData.map(item => item.main.temp));
        botResponse = `The highest temperature this week is ${highestTemp}°C.`;
    } else if (userInput.toLowerCase().includes("lowest temperature")) {
        const lowestTemp = Math.min(...forecastData.map(item => item.main.temp));
        botResponse = `The lowest temperature this week is ${lowestTemp}°C.`;
    } else if (userInput.toLowerCase().includes("average temperature")) {
        const averageTemp = (forecastData.reduce((sum, item) => sum + item.main.temp, 0) / forecastData.length).toFixed(1);
        botResponse = `The average temperature this week is ${averageTemp}°C.`;
    }

    setTimeout(() => {
        addMessageToChat(botResponse, 'bot-message');
    }, 500);
}
