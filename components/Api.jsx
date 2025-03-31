// api.js (Separate file for API calls)
const API_KEY = '1af2d745ebd29c6c176f2e0ee06909e6'; // Replace with your actual API key

export async function fetchWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      alert(`${errorData.cod} ${errorData.message}`);
      console.error('API Error:', errorData);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}
