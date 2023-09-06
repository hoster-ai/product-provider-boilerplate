import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval, SchedulerRegistry } from "@nestjs/schedule";
import { PayPerUseRequest } from "./dtos/request.dto";
import { intervalHour } from "./constants";
import axios from "axios";
import { ApiException } from "./api.exception";
import { CronJob } from "cron";
import { IntervalEnum } from "./enums/interval.enum";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private chargeRequests: Array<Array<PayPerUseRequest>>; // In this Array the requests to be made are stored.

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  async addCronJob(name: string, interval: IntervalEnum) {
    const job = new CronJob(interval, () => {
      this.logger.warn(`time (${interval}) for job ${name} to run!`);
      this.sendUnits();
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for each minute at ${interval}!`);
  }

  deleteJob(jobName: string) {
    this.schedulerRegistry.deleteCronJob(jobName);
  }

  getCronJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();

    jobs.forEach((value, key, map) => {
      console.log("Value:", value);
    });
  }

  async sendUnits() {
    let items: string[]; //get items from storage
    let units: Record<string, number>[]; //calculate units some way
    const url = "https://api.spotify.com/v1/me/player/next"; //this is the Pay Peruse url endpoint to be called on the hoster
    //store the units for every item somewhere(most likely mongodb)

    let postData: PayPerUseRequest[];
    if (items != undefined) {
      if (items.length > 0) {
        for (let i; i <= items.length; i++) {
          postData[i].item_id = items[i];
          postData[i].units.push(units[i]); // here you can add the logic that will give each item its coresponding unit(s)
          postData[i].createdAt = new Date();
        }
      }
    }
    if (postData !== undefined) {
      this.chargeRequests.push(postData);
    }
    if (this.chargeRequests != undefined) {
      if (this.chargeRequests.length > 0) {
        try {
          for (let i; i <= this.chargeRequests.length; i++) {
            const result = await axios.post(url, this.chargeRequests[i]); // here any requests to be made as they exist in the Charge Requests array./
            if (result) {
              this.chargeRequests.splice(i, 1); // When a charge Request is succsful it is removed from the array
            }
          }
        } catch {}
      }
    }
  }
}
