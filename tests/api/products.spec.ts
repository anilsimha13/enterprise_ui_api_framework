import { test, expect } from "@playwright/test";
import { RequestHandler } from "../../util/request-handler";

let baseURL = "https://api.practicesoftwaretesting.com/";

test("Get Products", async ({ request }) => {
  const req = new RequestHandler(request, baseURL);
  const response = await req
    .path("products")
    .params({ page: 1, between: "price,1,100", is_rental: false })
    .getRequest();
  console.log(await response.json());
});
