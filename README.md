# weather-app
Project Overview
The Weather Dashboard is a fully responsive web application built using HTML, CSS, and JavaScript. It displays real-time weather data for a selected city using the OpenWeather API. The dashboard features a 5-day temperature forecast, data visualizations using Chart.js, and an interactive chatbot powered by Dialogflow API for user inquiries related to weather data.

 Features
1. Sidebar Navigation: A navigation menu to access the Dashboard page and the Tables page.
2. Weather Widget: Displays the current weather details of a selected city.
3. Dynamic Backgrounds: Changes background images based on weather conditions (e.g., sunny, rainy, cloudy).
4. Data Visualizations:
   - Vertical Bar Chart: Displays temperatures over the next 5 days.
   - Doughnut Chart: Shows the percentage of different weather conditions in a 5-day period.
   - Line Chart: Plots temperature changes over the next 5 days.
5. Forecast Table with Pagination: Shows a 5-day forecast with temperature details (morning, noon, evening, and night) with pagination controls.
6. Filters and Sorting: Allows users to sort and filter temperature data based on different criteria.
7. Chatbot: Answers weather-related questions based on the data displayed in the forecast table.

 Technology Stack
- Frontend: HTML, CSS
- JavaScript: Vanilla JavaScript for dynamic interactions and data manipulation
- API Integration: OpenWeather API for fetching weather data, Dialogflow API for chatbot responses
- Chart.js: Used for creating interactive data visualizations

 Project Setup Instructions
1. Clone the Repository:
   bash
   https://github.com/malaikarehman/weather-app/
   cd weather-dashboard
   
2. Obtain API Keys:
   - OpenWeather API: Create an API key from [OpenWeather](https://home.openweathermap.org/users/sign_up).
   - Dialogflow API: Create an agent and obtain the credentials from [Dialogflow Console](https://dialogflow.cloud.google.com/).
3. Add API Keys:
   - Replace the placeholder API key (`YOUR_API_KEY`) in the `script.js` file with your OpenWeather API key.
4. Open the Project Locally:
   - Open the `index.html` file in your browser to start the weather dashboard.



 JavaScript Files and Functions
# 1. `script.js`:
This file handles the main functionalities of the weather dashboard, including API requests, data rendering, and interactions.

- `fetchWeatherData(city)`: 
  - Fetches the current weather data from the OpenWeather API based on the selected city and updates the weather widget.
  - Updates the background image of the widget based on the weather condition.
  
- `fetchForecastData(city)`: 
  - Fetches the 5-day weather forecast data and stores it for use in charts and the forecast table.

- `renderTable(page)`:
  - Renders the 5-day temperature forecast table with pagination based on the current page.
  - Displays the temperature for different times of the day (morning, noon, evening, and night).

- `generateCharts(forecastData)`:
  - Uses Chart.js to create a Vertical Bar Chart, Doughnut Chart, and Line Chart based on the temperature and weather condition data fetched from the OpenWeather API.
  - The charts include animations for a better user experience, using options like delay and drop effects.

- `filterAndSortData(option)`:
  - Filters and sorts the data based on the selected criteria (e.g., ascending temperatures, rainy days, highest temperature).
  - Updates the forecast table with the filtered and sorted results.

# 2. `chatbot.js`:
This file contains the logic for the chatbot's interactive responses.

- `handleBotResponse(userInput)`:
  - Responds to user questions based on keywords related to the weather information displayed in the forecast table.
  - For instance, if a user asks, "What is the highest temperature this week?" the bot identifies and returns the highest temperature from the forecast data.

- `addMessageToChat(message, className)`:
  - Dynamically adds a new message to the chatbot interface, with a different style for user and bot messages.

 Using Chart.js
Chart.js is used in this project to display interactive visualizations based on the forecast data.

- Vertical Bar Chart:
  - Purpose: Displays temperature data for the next 5 days.
  - Options Used: `animation.duration` to create a smooth transition effect.

- Doughnut Chart:
  - Purpose: Illustrates the distribution of different weather conditions over 5 days.
  - Options Used: `animation.delay` to introduce a delay effect during rendering.

- Line Chart:
  - Purpose: Plots temperature changes over the next 5 days to show trends.
  - Options Used: `animation.easing` to use a "drop" effect for the lines.

 Error Handling
- Displays user-friendly error messages if the city is not found or if there are issues with the API request.
- Handles invalid input and API limitations gracefully.

 User Instructions
1. Select a City: Enter a city name in the input box and click the "Get Weather" button to fetch the weather data.
2. View Current Weather: The weather widget displays the current weather information with a dynamically updated background.
3. View Forecast Table: Navigate through the table using the pagination buttons to see detailed temperature information.
4. Apply Filters and Sorting: Use the filter and sort buttons to organize and view the data based on different criteria.
5. Interact with the Chatbot: Ask weather-related questions to the chatbot for additional information.
