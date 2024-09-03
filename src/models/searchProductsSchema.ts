import * as zod from "zod";

export const searchProductsSchema = zod.object({
  searchProducts: zod.string(),
});

export type SearchProductsType = zod.infer<typeof searchProductsSchema>;
