import z from "zod";

export const newsAttributesSchema = z.object({
  name: z.string().max(200, { error: "Title is too long" }).min(5, { error: "Title is too short" }),
  text: z.string().max(200, { error: "Description is too long" }).min(5, { error: "Description is too short" }),
});
export interface NewsRelationships {
  company: {
    data: {
      type: "company";
      id: string;
    };
  };
}
export type NewsAttributes = z.infer<typeof newsAttributesSchema>;
