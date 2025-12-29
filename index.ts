import axios from 'axios';

interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: Array<{
        description: string;
    }>;
    name: string;
}

const API_KEY: string = '40534da5bd28d412725c7555dc179c49';
const CITY: string = 'Ankara';
const URL: string = `https://api.openweathermap.org/data/2.5/weather`;

async function getWeatherData(): Promise<WeatherData | void> {
    try {
        const response = await axios.get<WeatherData>(URL, {
            params: {
                q: CITY,
                appid: API_KEY,
                units: 'metric',
                lang: 'eng'
            }
        });

        const data = response.data;
        const score = calculateSCI(data.main.temp, data.main.humidity, data.wind.speed);
        
        console.log(`--- ${data.name} for Air Condition (TS) ---`);
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Humidity: %${data.main.humidity}`);
        console.log(`Wind Speed: ${data.wind.speed} m/s`);
        console.log(`Condition: ${data.weather[0]?.description}`);
        console.log("Comfort Score: ", score);

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API Error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
    }
}

function calculateSCI(temp: number, humidity: number, wind: number): number {
    const idealTemp = 22;
    const idealHumidity = 45;

    const wT = 0.6; 
    const wH = 0.3; 
    const wW = 0.1; 

    const tempPenalty = Math.abs(temp - idealTemp) * wT;
    const humidityPenalty = Math.abs(humidity - idealHumidity) * 0.1 * wH;
    const windPenalty = wind * wW;

    let score = 100 - (tempPenalty + humidityPenalty + windPenalty) * 10;
    
    return Math.max(0, Math.min(100, Math.round(score)));
}
getWeatherData();
