import Joi from "joi";
import {
  CategoryCreation,
  CategoryFilter,
  CategoryUpdate,
} from "@/types/category";

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

export const CategorySearchDto = Joi.object<CategoryFilter>({
  name: Joi.string(),
  description: Joi.string(),
  active: Joi.boolean(),
  search: Joi.string(),
  pageSize: Joi.number().default(2),
  page: Joi.number().default(1),
  sort: Joi.string().default("createdDate"),
});
