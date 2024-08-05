import { CronJob } from "cron";

import { timeHelper } from "../helpers/time-helper";
import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    console.log("[removeOldPasswordCron] Cron is running");

    await oldPasswordRepository.deleteByParams({
      createdAt: { $lte: timeHelper.subtractByParams(90, "day") },
    });
    console.log("[removeOldPasswordCron] finished");
  } catch (e) {
    console.error("[removeOldPasswordCron] failed", e);
  }
};

export const removeOldPasswords = new CronJob("0 0 * * 0", handler);
