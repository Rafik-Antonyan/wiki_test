# Wikipedia Analytics Mini Service - Frontend

A minimal, responsive web application that visualizes Wikipedia page view statistics over different time periods. Designed to be lightweight and interactive for quick analysis and comparisons.

## Features

- **Interactive Charts**: View page statistics using dynamic bar charts powered by Chart.js
- **Comparative Analysis**: Compare current period views against previous period
- **Flexible Time Ranges**: Choose from last 30, 90, or 365 days
- **Auto Data Grouping**: Smart grouping by day, week, or month depending on selected range
- **Real-time Refresh**: One-click refresh clears cache and fetches fresh data from backend
- **Client-side Caching**: LocalStorage caching of API responses (1-hour duration)
- **Responsive Design**: Optimized for desktop and mobile screens

## Tech Stack

- **HTML5** – Semantic structure
- **Tailwind CSS** – Utility-first styling
- **Vanilla JavaScript** – Lightweight app logic
- **Chart.js** – Interactive chart rendering
- **Font Awesome** – Icon set
- **LocalStorage** – Cache API results on frontend

## Installation

### Prerequisites

- Modern browser (Chrome, Firefox, Safari, Edge)
- Local web server (e.g., `http-server`)

### Setup

```bash
git clone https://github.com/Rafik-Antonyan/wiki_test.git
cd fe
npx http-server