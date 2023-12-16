import { Router } from "express";
import { productsManager } from "../dao/mongodb/mongodb.js";
import { cartsManager } from "../dao/mongodb/mongodb.js";

export const webRouter = Router();

webRouter.get("/", (req, res) => {
  res.render("index.handlebars", { title: "PRUEBA" });
});
webRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts.handlebars", { title: "REAL" });
});
webRouter.get("/chat", (req, res) => {
  res.render("chat.handlebars", { title: "CHAT" });
});
webRouter.get("/products", async (req, res, next) => {
  const criterioDeBusqueda = {};
  const opcionesDePaginacion = {
    limit: req.query.limit || 5,
    page: req.query.page || 1,
    lean: true,
  };

  const result = await productsManager.paginate(
    criterioDeBusqueda,
    opcionesDePaginacion
  );

  console.log(result);

  res.render("products.handlebars", {
    title: "products",
    hayDocs: result.docs.length > 0,

    docs: result.docs,
    limit: result.limit,
    page: result.page,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    nextPage: result.nextPage,
    hasPrevPage: result.hasPrevPage,
    prevPage: result.prevPage,
    pagingCounter: result.pagingCounter,
  });
});
webRouter.get("/carts/:cid", async (req, res, next) => {
  const { cid } = req.params;
  const result = await cartsManager.findById({ _id: cid }).lean();
  let productList = result.products;
  res.render("cart.handlebars", {
    title: "cart",
    products: productList,
    productsInCart: productList.length > 0,
  });
});
