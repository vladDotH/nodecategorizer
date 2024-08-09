import Router from "koa-router";
import { categoriesService } from "@/services/categories.service";

export const categoriesController = new Router({ prefix: "/categories" });

categoriesController.post("/", async (ctx, next) => {
  /**/
});

categoriesController.get("/:idOrSlug", async (ctx, next) => {
  /**/
});

categoriesController.put("/:id", async (ctx, next) => {
  /**/
});

categoriesController.delete("/:id", async (ctx, next) => {
  /**/
});

categoriesController.get("/", async (ctx, next) => {
  /**/
});

// categoriesController.post(
//   "/",
//   authGuard("jwt"),
//   rolesGuard(RoleBits.admin),
//   async (ctx) => {
//     // #swagger.tags = ['Books']
//     // #swagger.summary = 'Добавить книгу'
//     // #swagger.description = 'Роли: администратор'
//     /* #swagger.parameters['body'] = {
//     in: 'body',
//     schema: {
//       title: "Name",
//       author: "Author",
//       publicationDate: "2024-10-08",
//       genres: ['Genre']
//     }
//   }*/
//     const book = validate(BookDto, ctx.request.body);
//     ctx.body = await categoriesService.addBook(book);
//     ctx.status = StatusCodes.OK;
//   },
// );
//
// categoriesController.get("/", async (ctx) => {
//   // #swagger.tags = ['Books']
//   // #swagger.summary = 'Получить список книг'
//   // #swagger.description = 'Роли: не требуется'
//   ctx.body = await categoriesService.getBooks();
//   ctx.status = StatusCodes.OK;
// });
//
// categoriesController.get("/:id", async (ctx) => {
//   // #swagger.tags = ['Books']
//   // #swagger.summary = 'Получить информацию о книге'
//   // #swagger.description = 'Роли: не требуется'
//   // #swagger.parameters['id'] = {}
//   const id = validate(Joi.number(), ctx.params.id);
//   ctx.body = await categoriesService.getBook(id);
//   ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
// });
//
// categoriesController.put(
//   "/:id",
//   authGuard("jwt"),
//   rolesGuard(RoleBits.admin),
//   async (ctx) => {
//     // #swagger.tags = ['Books']
//     // #swagger.summary = 'Обновить данные о книге'
//     // #swagger.description = 'Роли: администратор'
//     // #swagger.parameters['id'] = {}
//     /* #swagger.parameters['body'] = {
//   in: 'body',
//   schema: {
//     title: "Name",
//     author: "Author",
//     publicationDate: "2024-10-08",
//     genres: ['Genre']
//   }
//   }*/
//     const id = validate(Joi.number(), ctx.params.id);
//     const book = validate(BookDto, ctx.request.body);
//     ctx.body = await categoriesService.updateBook(id, book);
//     ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
//   },
// );
//
// categoriesController.delete(
//   "/:id",
//   authGuard("jwt"),
//   rolesGuard(RoleBits.admin),
//   async (ctx) => {
//     // #swagger.tags = ['Books']
//     // #swagger.summary = 'Удалить книгу'
//     // #swagger.description = 'Роли: администратор'
//     // #swagger.parameters['id'] = {}
//     const id = validate(Joi.number(), ctx.params.id);
//     ctx.body = await categoriesService.deleteBook(id);
//     ctx.status = ctx.body ? StatusCodes.OK : StatusCodes.NO_CONTENT;
//   },
// );
