import { APIRequestContext } from "@playwright/test";
import { BASE_URL } from "../utils/baseURL";

export async function createPet(request: APIRequestContext, paylaod: any) {
    console.log("\nCreating the Pet");
    console.log("\nREQUEST BODY:", paylaod);
    const response = await request.post(`${BASE_URL}/pet`,{
        data: paylaod
    });

    return response;
}

export async function getPet(request: APIRequestContext, petId: number) {
    const response = await request.get(`${BASE_URL}/pet/${petId}`);
    console.log("\nGetting the Details of the Pet");
    console.log("\nRESPONSE STATUS:", response.status());
    console.log("\nRESPONSE BODY:", await response.json());

    return response;
}

export async function updatePet(request: APIRequestContext, paylaod: any) {
    console.log("\nDetails to be Updated:", paylaod);
    const response = await request.put(`${BASE_URL}/pet`,{
        data: paylaod
    });
    console.log("\nRESPONSE STATUS:", response.status());
    console.log("\nUpdated Details");
    console.log("\nRESPONSE BODY:",await response.json()); 
    
    return response;
}

export async function deletePet(request: APIRequestContext, petId: number) {
    const response = await request.delete(`${BASE_URL}/pet/${petId}`);
    console.log("\nDeleting the Pet");
    
    return response;
}