import * as zod from "zod";
import {
  optionalTextSchema,
  requiredTextSchema,
} from "../constants/allSchemas";

// Schema de validação para o formulário
export const AddressValidationSchema = zod.object({
  cep: requiredTextSchema,
  street: requiredTextSchema,
  number: requiredTextSchema,
  complement: optionalTextSchema,
  district: requiredTextSchema,
  city: requiredTextSchema,
  uf: requiredTextSchema,
});

export type AddressSchema = zod.infer<typeof AddressValidationSchema>;

export type fieldsTypes =
  | "cep"
  | "street"
  | "number"
  | "complement"
  | "district"
  | "city"
  | "uf";
