import * as zod from "zod";
import { requiredField } from "./messages";

// Text
export const textSchema = zod.string();

// Boolean
export const booleanSchema = zod.boolean();

// Optional
export const optionalTextSchema = zod.any().optional();

// Required
export const requiredTextSchema = zod
  .string({
    message: requiredField,
  })
  .min(1, requiredField);
