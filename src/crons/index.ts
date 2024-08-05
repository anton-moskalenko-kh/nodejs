import { oldVisitorCron } from "./old-visitor-cron";
import { removeOldPasswords } from "./remove-old-passwords";
import { removeOldTokensCron } from "./remove-old-token";
import { testCron } from "./test";

export const jobRunner = () => {
  testCron.start();
  removeOldTokensCron.start();
  removeOldPasswords.start();
  oldVisitorCron.start();
};
