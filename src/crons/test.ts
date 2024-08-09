import { CronJob } from "cron";

const handler = () => {
  console.log("Cron is running");
};

export const testCron = new CronJob("0 0 * * 0", handler);
