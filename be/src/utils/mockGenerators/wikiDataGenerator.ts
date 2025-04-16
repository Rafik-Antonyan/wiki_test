import { WikiAnalyticsData } from "../types/wikiDataT";

const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const wikiDataGenerator = (period: number): WikiAnalyticsData => {
  const labels: string[] = [];
  const currentData: number[] = [];
  const previousData: number[] = [];
  if (period === 30) {
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.unshift(`${date.getMonth() + 1}/${date.getDate()}`);
      currentData.unshift(Math.floor(Math.random() * 5000) + 1000);
      previousData.unshift(Math.floor(Math.random() * 5000) + 1000);
    }
  } else if (period === 90) {
    for (let i = 0; i < 13; i++) {
      labels.unshift(`Week ${i + 1}`);
      currentData.unshift(Math.floor(Math.random() * 30000) + 5000);
      previousData.unshift(Math.floor(Math.random() * 30000) + 5000);
    }
  } else if (period === 365) {
    for (let i = 0; i < 12; i++) {
      const monthIndex = (new Date().getMonth() - i + 12) % 12;
      labels.unshift(months[monthIndex]);
      currentData.unshift(Math.floor(Math.random() * 100000) + 20000);
      previousData.unshift(Math.floor(Math.random() * 100000) + 20000);
    }
  }

  return {
    labels,
    currentData,
    previousData,
  };
};
