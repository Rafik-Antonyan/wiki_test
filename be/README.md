# Wikipedia Analytics Mini Service - Backend

A clean and efficient backend service for delivering Wikipedia page view analytics. Built using **Node.js**, **Express.js**, and **TypeScript**, it follows the **MVC design pattern** and includes robust caching, logging, and utility systems. This service powers the frontend by providing a single API endpoint with all necessary data for visualization and comparison.

---

## 📦 Features

- **Single RESTful API Endpoint**: `GET /api/wiki` delivers formatted page view statistics
- **MVC Architecture**: Organized codebase for controllers, services, models, routes, and utils
- **TypeScript Support**: Strict typing for better reliability and maintainability
- **In-memory Caching**: 2-hour cache to minimize redundant calls to Wikipedia API
- **Utility Helpers**: Includes tools like `responseHandler`, `wikiDataGenerator`, etc.
- **Centralized Configuration**: Constants and environment variables are managed in one place
- **Logger Integration**: Logs requests and key application events
- **Scalable & Clean Code**: Modular structure ready for future expansion

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **TypeScript** – Strongly typed JavaScript
- **Dotenv** – Environment configuration (not important)
- **Caching System** – In-memory cache with TTL
- **Logger** – Console/file logger for tracing and debugging

---

## 📁 Project Structure

```
be/
│
├── src/
│   ├── api/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routers/
│   ├── services/
│   ├── utils/
│   └── index.ts
│
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/Rafik-Antonyan/wiki_test.git
cd be
npm install
```

### Running in Development

```bash
npm run start:dev
```

> The app will run on `http://localhost:8000` by default.

---

## ⚙️ Environment Variables

Create a `.env` file based on the following template:

```env
PORT=8000
```

---

## 🔗 API Endpoint

### `GET /api/wiki`

Fetches Wikipedia page view statistics for a specific period and compares it to the previous period.

#### Query Parameters

| Name   | Type   | Description                               | Required | Example |
|--------|--------|-------------------------------------------|----------|---------|
| period | number | Number of days to fetch (30, 90, or 365)  | Yes      | `30`    |

#### Example Request

```http
GET http://localhost:8000/api/wiki?period=30
```

#### Example Response

```json
{
  "data": {
    "labels": [
      "3/19", "3/20", "3/21", ..., "4/17"
    ],
    "currentData": [
      4263, 1686, 1442, ..., 5066
    ],
    "previousData": [
      2868, 2042, 2525, ..., 1420
    ]
  },
  "message": "Wiki data retrieved successfully",
  "code": 200,
  "errorData": null
}
```

- `labels`: Dates formatted for frontend chart display
- `currentData`: Page view counts for the selected period
- `previousData`: Page view counts for the previous equivalent period

---

## 🧰 Utilities

- **wikiDataGenerator** – Generates and formats data based on the period
- **responseHandler** – Unified structure for API responses
- **cache** – Stores data in memory for 2 hours per request key
- **logger** – Logs to console
- **consts** – Stores constant data (messages, response status code, etc)

---

## 📈 Caching

Caching is done in-memory with a TTL of **2 hours**. If a request for the same period is repeated within this window, the cached result is returned to improve performance and reduce external API usage.

---

## ✍️ Author

Made with ❤️ by **[Rafik Antonyan](https://github.com/Rafik-Antonyan)**

