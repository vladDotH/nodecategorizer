import Router from "koa-router";
import { categoriesController } from "@/controllers/categories.controller";
import { docsController } from "@/controllers/docs.controller";
import { configService } from "@/services/config.service";

export const apiController = new Router({
  prefix: `${configService.APP_PREFIX}`,
});

apiController.use(docsController.routes());
apiController.use(categoriesController.routes());
