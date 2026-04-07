//import {test, expect} from "@playwright/test";
import {test, expect} from "../fixtures/pet.fixture";
import {createPet, getPet,updatePet, deletePet} from "../api/pet.api";
import {validateSchema} from "../utils/schemaValidator";
import {petSchema} from "../utils/pet.schema";
import { get } from "node:http";

test.describe.serial("Petstore API Tests", ()=>{

    /*
    test.beforeEach(async({request}) => {
        console.log("Running before each test");
        const response = await createPet(request, petPayload);
        expect(response.status()).toBe(200);
    });*/

    test.skip("Verify POST API of Petstore", async ({request, petPayload})=>{

        const response = await createPet(request, petPayload.id);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(petPayload.id);
        expect(responseBody.name).toBe(petPayload.name);
        expect(responseBody.category.id).toBe(petPayload.category.id);
        expect(responseBody.category.name).toBe(petPayload.category.name);

        expect(validateSchema(petSchema, petPayload)).toBeTruthy();
    });

    test("Verify GET API of Petstore", async({request, petId, petPayload})=>{
        
        const response = await getPet(request,petId);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.id).toBe(petId);

        expect(validateSchema(petSchema, petPayload)).toBeTruthy();
    });

    test("Verify PUT API of Petstore", async({request, petId}) => {

        const updatedPayload = {
            id: petId,
            category: {
                name: "Updated Category"
            },
            name: "Updated Dog"

        }

        const response = await updatePet(request, updatedPayload);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(petId);
        expect(responseBody.category.name).toBe(updatedPayload.category.name);
        expect(responseBody.name).toBe(updatedPayload.name);
    });

    test("Verify DELETE API of Petstore", async ({request, petId}) => {
        const deleteResponse = await deletePet(request, petId);
        expect(deleteResponse.status()).toBe(200);

        const getResponse = await getPet(request, petId);
        expect(getResponse.status()).toBe(404);
        const body = await getResponse.json();
        expect(body.message).toContain("not found");
    });

    test("Verify Negative Scenario - with in-valid pet id", async({request}) => {
        const invlaidPetId = 999654236299999;

        const response = await getPet(request, invlaidPetId );
        expect(response.status()).toBe(404);
    });

});