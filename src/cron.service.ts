import { Injectable, Logger, Post } from "@nestjs/common";
import { Cron, Interval, SchedulerRegistry, Timeout } from "@nestjs/schedule";
import axios, { isAxiosError } from "axios";
import { ApiException } from "./api.exception";
import { PayPerUseRequest } from "./dtos/request.dto";

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  //   private cronJob: any; // Store the cron job instance

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  async addInterval(
    item_id: string,
    milliseconds: number,
    payPerUseRequest: PayPerUseRequest
  ) {
    const callback = async () => {
      this.logger.warn(`Interval executing at time (${milliseconds})!`);
      this.logger.debug("Cron job is running...");
      /**
       * Here you can schedule requests to be made at any point in time regularly depending on the Cron Decorator.
       * These requests are made for the express purpose of giving the Hoster any information neccessary for  charging Pay Per Use Items
       * In this example the Cron is called at the begining of each hour
       */
      const url = "https://api.spotify.com/v1/me/player/next"; //this is the Pay Peruse url endpoint to be called on the hoster
      const postdata = payPerUseRequest;
      let result;
      try {
        result = await axios.post(url, postdata);

        return { result };
      } catch (err) {
        this.deleteInterval(item_id);
      }
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(item_id, interval);
  }

  deleteInterval(item_id: string) {
    this.schedulerRegistry.deleteInterval(item_id);
    this.logger.warn(`Interval ${item_id} deleted!`);
  }

  getIntervals() {
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
  }
}
