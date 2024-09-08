import { booleanSchema, textSchema } from "@/constants/allSchemas";
import * as zod from "zod";

export const searchProductsSchema = zod.object({
  searchProducts: textSchema,
  tv: booleanSchema,
  audio: booleanSchema,
  mobile: booleanSchema,
  gaming: booleanSchema,
});

export type SearchProductsType = zod.infer<typeof searchProductsSchema>;
