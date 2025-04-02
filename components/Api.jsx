// api.jsx
const API_KEY = '1af2d745ebd29c6c176f2e0ee06909e6';

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

// Function to fetch weather forecast data
export async function fetchWeatherForecast(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      alert(`${errorData.cod} ${errorData.message}`);
      console.error('API Error:', errorData);
      return null;
    }

    const data = await response.json();
    {
      console.log('Unfiltered:', data);
    }
    const timezoneOffset = data.city.timezone; // Timezone offset in seconds

    const filteredForecast = data.list
      .map(item => {
        const utcTime = new Date(item.dt * 1000);
        const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000); // Convert to local time

        const localHours = localTime.getHours();

        return {
          day: localTime
            .toLocaleDateString('en-US', {weekday: 'short'})
            .toUpperCase(),
          hour: localHours, // Store hour for filtering
          data: item,
        };
      })
      .filter(item => item.hour >= 9 && item.hour <= 12) // Keep only 9AM-12PM entries
      .reduce((acc, curr) => {
        if (!acc.some(entry => entry.day === curr.day)) {
          acc.push(curr); // Pick only one entry per day
        }
        return acc;
      }, [])
      .slice(0, 5); // Get next 5 days

    return filteredForecast;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}
