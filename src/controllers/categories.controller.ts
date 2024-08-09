import Router from "koa-router";
import { categoriesService } from "@/services/categories.service";

export const categoriesController = new Router({ prefix: "/categories" });

categoriesController.post("/", async (ctx, next) => {
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
});

categoriesController.get("/:idOrSlug", async (ctx, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Получить категорию по id или slug'
});

categoriesController.put("/:id", async (ctx, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Обновить категорию по id'
});

categoriesController.delete("/:id", async (ctx, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Удалить категорию по id'
});

categoriesController.get("/", async (ctx, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Поиск категорий'
  /* #swagger.parameters['name'] = {} */
  /* #swagger.parameters['description'] = {} */
  /* #swagger.parameters['active'] = { type: 'boolean' } */
  /* #swagger.parameters['pageSize'] = { type: 'number' } */
  /* #swagger.parameters['page'] = { type: 'number' } */
  /* #swagger.parameters['sort'] = {} */
});
