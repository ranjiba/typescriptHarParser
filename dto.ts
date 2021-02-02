import { Request,Content } from "@tracerbench/har";

export default interface HarDto {
    requestCount: number;
    satusCount: number;
    hosts: Array<string>,
    request: Array<Request>;
    content:Array<Content>
  }