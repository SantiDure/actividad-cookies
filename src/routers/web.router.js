import { Router } from "express";

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
