import {faker} from '@faker-js/faker';

/*
export const petPayload = {
  //id: Math.floor(Math.random() * 100000),
  id: faker.number.int({min: 1000, max:999999}),
  name: faker.animal.dog(),
  status: "available"
};
*/

export function createPetPayload() {
    return {
        id: faker.number.int({min: 1000, max: 999999}),
        category: {
            id: faker.number.int({min: 1, max: 100}),
            name: faker.animal.type()
        },
        name: faker.animal.dog(),
        photoUrls: [
            faker.image.url()
        ],
        tags: [{
            id: faker.number.int({min: 1, max: 50}),
            name: faker.word.sample()
        }
        ],
        status: "available"

    };
    
}

