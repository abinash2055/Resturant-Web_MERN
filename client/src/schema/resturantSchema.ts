import { z } from "zod";

export const resturantFromSchema = z.object({
  resturantName: z.string().nonempty({ message: "Resturant name is required" }),
  city: z.string().nonempty({ message: "city name is required" }),
  country: z.string().nonempty({ message: "Country name is required" }),
  deliveryTime: z
    .number()
    .positive({ message: "Delivery time can not be negative" }),
  cuisines: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});

export type ResturantFormSchema = z.infer<typeof resturantFromSchema>;
