import { test, expect } from "@playwright/test";
import { RequestHandler } from "../../utils/request-handler";
import { validateSchema } from "../../utils/schema-validator";

let baseURL = "https://api.practicesoftwaretesting.com/";

test("Get Products", async ({ request }) => {
  const req = new RequestHandler(request, baseURL);
  const response = await req
    .path("products")
    .params({ page: 1, between: "price,1,100", is_rental: false })
    .getRequest();
  const jsonResponse = await response.json();
  // console.log(JSON.stringify(jsonResponse));
  await validateSchema(jsonResponse, "GET_product-info_schema.json");
  //console.log(jsonResponse.data[0]);
  expect(jsonResponse.data[0].id).toEqual("01KQBC0JWEXCSWAYDZF3W544C4");
  expect(jsonResponse.data[0].price).toEqual(14.15);
});
