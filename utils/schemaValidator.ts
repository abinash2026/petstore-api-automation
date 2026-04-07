import Ajv from "ajv";

const ajv = new Ajv();

export function validateSchema(schema: any, paylaod: any) {
    const validate = ajv.compile(schema);

    const valid = validate(paylaod);

    if(!valid) {
        console.log(validate.errors);
    }

    return valid;
}