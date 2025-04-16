# Wikipedia Analytics Mini Service

A minimal web application that displays Wikipedia page view statistics for selected time periods. This service provides an intuitive interface for visualizing and comparing Wikipedia page view data across different time ranges.

## Features

- **Interactive Data Visualization**: View Wikipedia page statistics with an interactive bar chart
- **Comparative Analysis**: Compare current period data with previous period data
- **Flexible Time Periods**: Choose between last 30 days, 90 days, or 365 days views
- **Automatic Data Grouping**: Data is automatically grouped by day, week, or month depending on the selected period
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Performance Optimized**: Frontend caching of API responses (1 hour duration)
- **Real-time Updates**: Refresh data on demand with a single click - It cleaning cache and doing request to backend

## Technologies Used

- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vanilla JavaScript**: Core application logic without frameworks
- **Chart.js**: JavaScript charting library for data visualization
- **Font Awesome**: Icon library for UI elements
- **LocalStorage**: For client-side caching implementation

## Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript
- A local web server (to run this project)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Rafik-Antonyan/wiki_test.git
   cd wiki_test