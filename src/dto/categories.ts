import Joi from "joi";
import { CategoryCreation, CategoryUpdate } from "@/types/category";

export const CategoryCreateDto = Joi.object<CategoryCreation>({
  slug: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  active: Joi.boolean().required(),
});

export const CategoryUpdateDto = Joi.object<CategoryUpdate>({
  slug: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  active: Joi.boolean(),
});
