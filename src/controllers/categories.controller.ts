import Router from "koa-router";
import { categoriesService } from "@/services/categories.service";
import { uuidValidator, validate } from "@/util/validation";
import {
  CategoryCreateDto,
  CategorySearchDto,
  CategoryUpdateDto,
} from "@/dto/categories";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

export const categoriesController = new Router({ prefix: "/categories" });

categoriesController.post("/", async (ctx) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Добавить категорию'
  /* #swagger.parameters['body'] = {
    in: 'body',
    schema: {
      slug: "unique_str",
      name: "category name",
      description: "optional description",
      active: true
    }
  }*/

  const body = validate(CategoryCreateDto, ctx.request.body);
  ctx.body = (await categoriesService.addCategory(body)) ?? undefined;

  if (ctx.body) {
    ctx.status = StatusCodes.CREATED;
  } else {
    ctx.status = StatusCodes.CONFLICT;
  }
});

categoriesController.get("/:idOrSlug", async (ctx) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Получить категорию по id или slug'

  const idOrSlug = validate(Joi.string(), ctx.params.idOrSlug);
  ctx.body = (await categoriesService.getCategory(idOrSlug)) ?? undefined;

  if (ctx.body) {
    ctx.status = StatusCodes.OK;
  } else {
    ctx.status = StatusCodes.NOT_FOUND;
  }
});

categoriesController.put("/:id", async (ctx) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Обновить категорию по id'
  /* #swagger.parameters['body'] = {
    in: 'body',
    schema: {
      slug: "unique_str",
      name: "category name",
      description: "optional description",
      active: true
    }
  }*/

  const id = validate(uuidValidator, ctx.params.id);
  const body = validate(CategoryUpdateDto, ctx.request.body);

  ctx.body = (await categoriesService.updateCategory(id, body)) ?? undefined;
  if (ctx.body) {
    ctx.status = StatusCodes.OK;
  } else {
    ctx.status = StatusCodes.NOT_FOUND;
  }
});

categoriesController.delete("/:id", async (ctx) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Удалить категорию по id'

  const id = validate(uuidValidator, ctx.params.id);
  ctx.body = (await categoriesService.deleteCategory(id)) ?? undefined;

  if (ctx.body) {
    ctx.status = StatusCodes.OK;
  } else {
    ctx.status = StatusCodes.NOT_FOUND;
  }
});

categoriesController.get("/", async (ctx) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Поиск категорий'
  /* #swagger.parameters['search'] = {} */
  /* #swagger.parameters['name'] = {} */
  /* #swagger.parameters['description'] = {} */
  /* #swagger.parameters['active'] = { type: 'boolean' } */
  /* #swagger.parameters['pageSize'] = { type: 'number' } */
  /* #swagger.parameters['page'] = { type: 'number' } */
  /* #swagger.parameters['sort'] = {} */

  const params = validate(CategorySearchDto, { ...ctx.request.query });

  ctx.body = await categoriesService.getCategories(params);
  ctx.status = StatusCodes.OK;
});
