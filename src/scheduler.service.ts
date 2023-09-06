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

  constructor(private schedulerRegistry: SchedulerRegistry) {
    
  }

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
    // const map: Map<string, any> = this.createMapFromArrayPairs(items, units); // Map every item with each unit it coresponds to
    const url = "https://api.spotify.com/v1/me/player/next"; //this is the Pay Peruse url endpoint to be called on the hoster
    //store the units for every item somewhere(most likely mongodb)

    let postData: PayPerUseRequest[];

    for (let i; i <= items.length; i++) {
      postData[i].item_id = items[i];
      postData[i].units.push(units[i]); // here you can add the logic that will give each item its coresponding unit(s)
    }

    
    if (postData !== null || postData.length !== 0) {
      try {
        const result = await axios.post(url, postData);
        if (result) {
          // remove units from item
        } else {
          //keep units and send them at the next cron instance
        }
      } catch (err) {
        throw new ApiException(
          err.data.message,
          JSON.stringify(postData),
          err.response.status
        );
      }
    }
  }

  //MAP UNITS WITH EACH ITEM_ID
  createMapFromArrayPairs(keys: string[], values: any[]): Map<string, any> {
    // Map every item with each unit it coresponds to
    // This code below is only a demonstration
    if (keys.length !== values.length) {
      throw new Error("Arrays must have the same length");
    }

    const resultMap = new Map<string, any>();

    for (let i = 0; i < keys.length; i++) {
      resultMap.set(keys[i], values[i]);
    }

    return resultMap;
  }
}
