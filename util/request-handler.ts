import { APIRequestContext, test } from "@playwright/test";
import { Url } from "node:url";

export class RequestHandler {
  private request: APIRequestContext;
  private baseURL: string | undefined;
  private apiBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};

  constructor(request: APIRequestContext, apiBaseUrl: string) {
    ((this.request = request), (this.apiBaseUrl = apiBaseUrl));
  }

  url(baseURL: string) {
    this.baseURL = baseURL;
    return this;
  }
  path(apiPath: string) {
    this.apiPath = apiPath;
    return this;
  }
  params(queryParams: object) {
    this.queryParams = queryParams;
    return this;
  }
  headers(apiHeaders: Record<string, string>) {
    this.apiHeaders = apiHeaders;
    return this;
  }
  body(apiBody: object) {
    this.apiBody = apiBody;
    return this;
  }
  async getRequest() {
    let response: any;
    const fullUrl = `${this.apiBaseUrl}${this.apiPath}`;
    await test.step(`GET request to: ${fullUrl}`, async () => {
      response = await this.request.get(fullUrl, {
        headers: this.apiHeaders,
        params: this.queryParams as {
          [key: string]: string | number | boolean;
        },
      });
    });
    return response;
  }
}
