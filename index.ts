import axios from 'axios';

interface WeatherData {
    main: { temp: number; humidity: number; };
    wind: { speed: number; };
    weather: Array<{ description: string; }>;
    name: string;
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

export const handler = async (event: any) => {
    const city = event.queryStringParameters?.city || 'Ankara';
    const API_KEY = '40534da5bd28d412725c7555dc179c49'; 
    const URL = `https://api.openweathermap.org/data/2.5/weather`;

    try {
        const response = await axios.get<WeatherData>(URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'en'
            }
        });

        const data = response.data;
        const score = calculateSCI(data.main.temp, data.main.humidity, data.wind.speed);

        const result = {
            city: data.name,
            temperature: `${data.main.temp}°C`,
            humidity: `%${data.main.humidity}`,
            windSpeed: `${data.wind.speed} m/s`,
            condition: data.weather[0]?.description,
            comfortScore: score,
            message: score > 70 ? "The weather is perfect for a walk!" : "Be careful when you go outside."
        };

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify(result)
        };

    } catch (error: any) {
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                message: "Weather data could not be obtained.",
                error: error.message
            })
        };
    }
};