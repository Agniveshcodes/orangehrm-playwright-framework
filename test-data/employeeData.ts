import { faker } from "@faker-js/faker";
export const employeeData = {
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  employeeId: faker.number
    .int({
      min: 10000,
      max: 99999,
    })
    .toString(),
};
