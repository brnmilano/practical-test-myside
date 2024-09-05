import { booleanSchema, textSchema } from "@/constants/allSchemas";
import * as zod from "zod";

export const searchProductsSchema = zod.object({
  searchProducts: textSchema,
  tv: booleanSchema,
  audio: booleanSchema,
  laptop: booleanSchema,
  mobile: booleanSchema,
  gaming: booleanSchema,
  appliances: booleanSchema,
});

export type SearchProductsType = zod.infer<typeof searchProductsSchema>;
