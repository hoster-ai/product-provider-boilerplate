import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval, SchedulerRegistry } from "@nestjs/schedule";
import { PayPerUseRequest } from "./dtos/request.dto";
import { intervalHour } from "./constants";
import axios from "axios";
import { ApiException } from "./api.exception";
import { CronJob } from "cron";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  async addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
      this.sendUnits();
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`
    );
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
    const map: Map<string,any> = this.createMapFromArrayPairs(items,units); 
    const url = "https://api.spotify.com/v1/me/player/next"; //this is the Pay Peruse url endpoint to be called on the hoster
    
    const postdata = {
      items: items,
      units: units,
    };

    try {
      const result = await axios.post(url, postdata);
    } catch (err) {
      throw new ApiException(
        err.data.message,
        JSON.stringify(postdata.items),
        err.response.status
      );
    }

    return {};
  }


  //MAP UNITS WITH EACH ITEM_ID
  createMapFromArrayPairs(keys: string[], values: any[]): Map<string, any> {
    if (keys.length !== values.length) {
      throw new Error('Arrays must have the same length');
    }
  
    const resultMap = new Map<string, any>();
  
    for (let i = 0; i < keys.length; i++) {
      resultMap.set(keys[i], values[i]);
    }
  
    return resultMap;
  }
  
}
