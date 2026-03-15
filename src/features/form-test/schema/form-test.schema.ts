import z from "zod";

export const testEnumSchema = z.enum(["OPTION_A", "OPTION_B", "OPTION_C"]);

export const formTestSchema = z.object({
  id: z.uuid(),
  textField: z.string().min(1, "Text is required"),
  numberField: z.number().int("Must be an integer"),
  decimalField: z.number().or(z.string().regex(/^\d+(\.\d+)?$/)).transform((v) => Number(v)),
  floatField: z.number(),
  booleanField: z.boolean(),
  dateField: z.date().or(z.string().pipe(z.coerce.date())),
  longTextField: z.string().min(1, "Long text is required"),
  jsonField: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Invalid JSON"),
  enumField: testEnumSchema,
  optionalField: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createFormTestSchema = formTestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateFormTestSchema = formTestSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const deleteFormTestSchema = z.object({
  id: z.uuid(),
});

export const getFormTestSchema = z.object({
  id: z.uuid(),
});

export type FormTestType = z.infer<typeof formTestSchema>;
export type CreateFormTestType = z.infer<typeof createFormTestSchema>;
export type UpdateFormTestType = z.infer<typeof updateFormTestSchema>;
