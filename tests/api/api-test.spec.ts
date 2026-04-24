import { fa, faker } from "@faker-js/faker";
import { request, test } from "@playwright/test";
import fs from "fs";

const email: string = faker.internet.email();
const password: string = "Kotoco@123";
test("Should validate the Registration of a user", async ({ request }) => {
  const response = await request.post(
    "https://api.practicesoftwaretesting.com/users/register",
    {
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        dob: "2001-01-01",
        phone: "6281227715",
        email: email,
        password: password,
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          postal_code: faker.location.zipCode(),
        },
      },
    },
  );
  const response_json = await response.json();
  console.log(response_json);
});

test("Should Login user into the application", async ({ request }) => {
  const response = await request.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      data: {
        email: email,
        password: password,
      },
    },
  );
  const response_json = await response.json();
  const access_token = response_json.access_token;
  const tokenValue = { token: `${access_token}` };
  const writtenValue = fs.writeFileSync(
    "./credentials/auth-token.json",
    JSON.stringify(tokenValue, null, 4),
  );
  console.log(writtenValue);
});
