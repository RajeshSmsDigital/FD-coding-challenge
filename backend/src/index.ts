import * as Koa from "koa";
import * as Router from "koa-router";
const cors = require('@koa/cors');

import * as logger from "koa-logger";
import * as json from "koa-json";
import { getProducts } from "./api/productsApi";

const app = new Koa();
const router = new Router();



router.get("/productList", async (ctx, next) => {
  ctx.body = await getProducts();

  await next();
});

// Middlewares
app.use(json());
app.use(logger());

app.use(cors());


// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(8000, () => {
  console.log("server started");
});
