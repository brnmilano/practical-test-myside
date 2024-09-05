import { booleanSchema, textSchema } from "@/constants/allSchemas";
import * as zod from "zod";

export const searchProductsSchema = zod.object({
  searchProducts: textSchema,
  electronics: booleanSchema,
  jewelery: booleanSchema,
  mensClothing: booleanSchema,
  womensClothing: booleanSchema,
});

export type SearchProductsType = zod.infer<typeof searchProductsSchema>;
