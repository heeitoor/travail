import { CronJob } from 'cron';

class CronWorker {
  static startJobs(jobs: CronJobDefinition[]) {
    for (const job of jobs) {
      new CronJob(
        job.schedule,
        () => {
          console.info(`[${new Date().toUTCString()}] Executing job: ${job.name}`);
          job.handle();
        },
        null,
        true,
        'America/Sao_Paulo'
      ).start();
    }
  }
}

interface CronJobDefinition {
  /**
   * for reference https://crontab.guru/
   */
  schedule: CrobJobSchedule | string;
  name: string;
  handle(): void;
}

enum CrobJobSchedule {
  everySecond = '* * * * * *',
  everyMinute = '* * * * *',
}

export { CronWorker, CronJobDefinition, CrobJobSchedule };
