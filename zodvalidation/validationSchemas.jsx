import { z } from "zod";
const phoneRegex = new RegExp(/^\+?[1-9]\d{1,3}?[-.\s]?\d{7,15}$/);
 
import dayjs from "dayjs";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const createPropertiSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  type: z.string({ message: "Type is required" }),
  bedrooms: z
    .number({ message: "Number of bedrooms is required" })
    .min(1, "Number of bedrooms is required"),
  bathrooms: z
    .number({ message: "Number of bathrooms is required" })
    .min(1, "Number of bathrooms is required"),
  square_cm: z
    .number({ message: "Square centimeters is required" })
    .min(1, "Square centimeters is required"),
  sleeps: z
    .number({ message: "Number of sleeps is required" })
    .min(1, "Number of sleeps is required"),
  description: z.string().max(65535).nullable().optional(),

  location: z.object({
    country: z
      .string({ message: "Country is required" })
      .min(1, "Country address is required"),
    street: z
      .string({ message: "Street address is required" })
      .min(1, "Street address is required"),
    city: z.string({ message: "City is required" }).min(1, "City is required"),
    state: z
      .string({ message: "State is required" })
      .min(1, "State is required"),
    zipcode: z
      .string({ message: "Zip code is required" })
      .min(1, "Zip code is required")
     
  }),

  rates: z.object({
    night: z
      .number({
        message: "Per night is required",
      })
      .min(1, "Per night is required"),
    week: z
      .number({
        message: "If you don't want to provide a value, please enter 0.",
      })
      .optional(),
    month: z
      .number({
        message: "If you don't want to provide a value, please enter 0.",
      })
      .optional(),
  }),
  rules: z.object({
    pets: z.boolean().optional(),
    children: z.boolean().optional(),
    smoking: z.boolean().optional(),
    events: z.boolean().optional(),
    checkIn: z.preprocess(
      (val) => (dayjs.isDayjs(val) ? val.toDate() : val),
      z.date({ required_error: "Check-in date is required" })
    ),
    checkOut: z.preprocess(
      (val) => (dayjs.isDayjs(val) ? val.toDate() : val),
      z.date({ required_error: "Check-out date is required" })
    ),
  }),
  amenities: z.array(z.string(),{ message: "At least 1 amenity required"}),

  images: z.union([
    z
      .array(z.instanceof(File).or(z.string()), {
        message: "At least 1 picture required",
      })
      .min(1, { message: "At least 1 picture required" }),
    z
      .array(z.string(), { message: "At least 1 picture required" })
      .min(1, { message: "At least 1 picture required" }),
  ]),
 
});

export const createPropertiSchemaEdit = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  type: z.string({ message: "Type is required" }),
  bedrooms: z
    .number({ message: "Number of bedrooms is required" })
    .min(1, "Number of bedrooms is required"),
  bathrooms: z
    .number({ message: "Number of bathrooms is required" })
    .min(1, "Number of bathrooms is required"),
  square_cm: z
    .number({ message: "Square centimeters is required" })
    .min(1, "Square centimeters is required"),
  sleeps: z
    .number({ message: "Number of sleeps is required" })
    .min(1, "Number of sleeps is required"),
  description: z.string().max(65535).optional(),

  location: z.object({
    country: z
      .string({ message: "Country is required" })
      .min(1, "Country address is required"),
    street: z
      .string({ message: "Street address is required" })
      .min(1, "Street address is required"),
    city: z.string({ message: "City is required" }).min(1, "City is required"),
    state: z
      .string({ message: "State is required" })
      .min(1, "State is required"),
    zipcode: z
      .string({ message: "Zip code is required" })
      .min(1, "Zip code is required")
      
  }),

  rates: z.object({
    night: z
      .number({
        message: "Per night is required",
      })
      .min(1, "Per night is required"),
    week: z
      .number({
        message: "If you don't want to provide a value, please enter 0.",
      })
      .optional(),
    month: z
      .number({
        message: "If you don't want to provide a value, please enter 0.",
      })
      .optional(),
  }),
  rules: z.object({
    pets: z.boolean().optional(),
    children: z.boolean().optional(),
    smoking: z.boolean().optional(),
    events: z.boolean().optional(),
    checkIn: z.preprocess(
      (val) => (dayjs.isDayjs(val) ? val.toDate() : val),
      z.date({ required_error: "Check-in date is required" })
    ),
    checkOut: z.preprocess(
      (val) => (dayjs.isDayjs(val) ? val.toDate() : val),
      z.date({ required_error: "Check-out date is required" })
    ),
  }),
  amenities: z.array(z.string(),{ message: "At least 1 amenity required"}),
  images: z
    .array(
      z.union([
        z.instanceof(File).or(z.string().url({ message: "Invalid image URL" })),
        z.string(),
      ])
    )
    .min(1, { message: "At least 1 picture required" }),

  
});

export const createPropertiSchemaServer = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  type: z.string({ message: "Type is required" }),
  bedrooms: z
    .number({ message: "Number of bedrooms is required" })
    .min(1, "Number of bedrooms is required"),
  bathrooms: z
    .number({ message: "Number of bathrooms is required" })
    .min(1, "Number of bathrooms is required"),
  square_cm: z
    .number({ message: "Square centimeters is required" })
    .min(1, "Square centimeters is required"),
  sleeps: z
    .number({ message: "Number of sleeps is required" })
    .min(1, "Number of sleeps is required"),
  description: z.string().min(1).max(65535).nullable().optional(),

  location: z.object({
    country: z
      .string({ message: "Country is required" })
      .min(1, "Country address is required"),
    street: z
      .string({ message: "Street address is required" })
      .min(1, "Street address is required"),
    city: z.string({ message: "City is required" }).min(1, "City is required"),
    state: z
      .string({ message: "State is required" })
      .min(1, "State is required"),
    zipcode: z
      .string({ message: "Zip code is required" })
      .min(1, "Zip code is required")
     
  }),

  rates: z.object({
    night: z.number().optional(),
    week: z.number().optional(),
    month: z.number().optional(),
  }),
  rules: z.object({
    pets: z.boolean().optional(),
    children: z.boolean().optional(),
    smoking: z.boolean().optional(),
    events: z.boolean().optional(),
    checkIn:  z.string(),
    checkOut:  z.string(),
  }),
  amenities: z.array(z.string(),{ message: "At least 1 amenity required"}),
  images: z.array(z.string()).optional(),

 
});


export const contactFormSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  text: z.string().max(100, "Text is too much").optional(),

  email: z
    .string({ message: "email is required" })
    .min(1, "  email is required")
    .email("This is not a valid email."),
  phone: z.object({
    code: z
      .string({ message: "Country code is required" })
      .min(1, "Country code is required"),
    number: z
      .string({ message: "  number is required" })
      .min(1, "  number is required")
      .regex(phoneRegex, "Invalid number!"),
  }),
});
