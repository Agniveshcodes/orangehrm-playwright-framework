import { faker } from "@faker-js/faker";

export const generateEmployee = () => {
  return {
    firstName: faker.person.firstName(),
    middleName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({
      min: 10000,
      max: 99999,
    }).toString(),
  };
};