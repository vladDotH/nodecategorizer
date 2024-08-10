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
  name: Joi.string().custom((value) => value.trim()),
  description: Joi.string().custom((value) => value.trim()),
  active: Joi.boolean(),
  search: Joi.string().custom((value) => value.trim()),
  pageSize: Joi.number().integer().min(0).default(2),
  page: Joi.number()
    .integer()
    .min(0)
    .default(1)
    .custom((value) => {
      if (value < 1) return 1;
      else return value;
    }),
  sort: Joi.string()
    .default("-createdDate")
    .custom((value) => value.trim()),
});
