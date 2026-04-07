import {test as base, expect} from "@playwright/test";
import {createPetPayload} from "../payloads/pet.payload";
import {createPet} from "../api/pet.api";

type PetPayload = ReturnType<typeof createPetPayload>;

type PetFixture = {
    petPayload: PetPayload;
    petId: number;
}

export const test = base.extend<PetFixture>({

    petPayload: async ({},use) => {
        const paylaod = createPetPayload();
        await use(paylaod);

    },

    petId: async({request, petPayload}, use) => {
        const response = await createPet(request,petPayload);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.id).toBe(petPayload.id);
        expect(responseBody.name).toBe(petPayload.name);
        expect(responseBody.category.id).toBe(petPayload.category.id);
        expect(responseBody.category.name).toBe(petPayload.category.name);
        await use(petPayload.id);
    }

});

export {expect} from "@playwright/test";