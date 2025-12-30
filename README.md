🌦️ Stat-Weather API: Statistical Comfort Index Service
Stat-Weather API is a production-ready, serverless backend service that processes real-time weather data through a specialized statistical model to calculate a "Human Comfort Index" (SCI). Built with TypeScript and deployed on AWS, it demonstrates a modern approach to cloud-native application development and analytical data processing.

🚀 Key Features
Serverless Architecture: Fully hosted on AWS Lambda, providing high scalability and zero maintenance.

Statistical Analysis: Raw meteorological data (Temperature, Humidity, Wind Speed) is transformed into a single "Comfort Score" using a weighted penalty algorithm.

Automated CI/CD Pipeline: Integration with GitHub Actions ensures that every code change is automatically built, tested, and deployed to the AWS Stockholm (eu-north-1) region.

Type-Safe Implementation: Developed using TypeScript to ensure robust error handling and maintainable code architecture.

📊 The Statistical Model: Statistical Comfort Index (SCI)The API calculates the human comfort level by measuring deviations from ideal environmental conditions. The model applies weighted penalties to different meteorological factors:$$SCI = 100 - \left( |T - T_{ideal}| \cdot w_T + |H - H_{ideal}| \cdot \alpha \cdot w_H + |W| \cdot w_W \right) \cdot 10$$Model Parameters:Ideal Values: Optimal temperature ($T_{ideal}$) is set at $22^\circ C$ and optimal humidity ($H_{ideal}$) at $45\%$.Weights ($w$): * Temperature ($w_T$): 60% impact on the final score.Humidity ($w_H$): 30% impact on the final score.Wind Speed ($w_W$): 10% impact on the final score.Logic: The score decreases as current conditions deviate from the "Comfort Zone," simulating human sensitivity to extreme weather.

🛠️ Technical Stack
Runtime: Node.js (via AWS Lambda)

Language: TypeScript

Infrastructure: AWS (API Gateway, Lambda, CloudWatch)

DevOps: GitHub Actions (CI/CD)

Data Provider: OpenWeatherMap API

📡 API Reference
Get Weather & Comfort Analysis
Endpoint: GET /weather

Query Parameters: | Parameter | Type | Required | Description | | :--- | :--- | :--- | :--- | | city | string | No | The target city for analysis (Default: Ankara) |

Example Request: https://2ekmzv5ov7.execute-api.eu-north-1.amazonaws.com/weather?city=Istanbul

Example Response:

{
  "city": "Istanbul",
  "temperature": "14.5°C",
  "humidity": "%65",
  "windSpeed": "4.2 m/s",
  "condition": "broken clouds",
  "comfortScore": 68,
  "message": "Caution is advised for outdoor activities."
}

🏗️ Development & Deployment
1. Prerequisites
Node.js installed locally.

An active AWS Account with IAM credentials configured.

OpenWeatherMap API Key.

2. Local Setup

# Clone the repository
git clone https://github.com/your-repo/stat-weather-api.git

# Install dependencies
npm install

# Build the project
npx tsc

3. CI/CD Configuration
The project uses GitHub Actions for deployment. Ensure the following secrets are added to your GitHub repository settings:

AWS_ACCESS_KEY_ID: Your IAM access key.

AWS_SECRET_ACCESS_KEY: Your IAM secret key.

AWS_REGION: The target region (e.g., eu-north-1).