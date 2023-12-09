import express, { Router } from "express";
import handlebars from "express-handlebars";
import { apiRouter } from "./routers/api.router.js";
import { webRouter } from "./routers/web.router.js";
import { Server } from "socket.io";
const app = express();
app.engine("handlebars", handlebars.engine());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use("/api", apiRouter);

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`servidor levantado en el puerto ${PORT}`)
);

//WEBSOCKET
const websocketServer = new Server(server);
app.use("/static", express.static("./static"));
app.use("/", webRouter);
websocketServer.on("connection", async (socket) => {
  console.log(socket.id);
  //getProducts
  socket.emit("getProducts", await productManager.getProducts());
  //add
  socket.on(
    "addProduct",
    async ({ title, description, code, price, stock, category, thumbnail }) => {
      await productManager.addProduct({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail,
      });
      websocketServer.emit("getProducts", await productManager.getProducts());
    }
  );
  socket.on("disconnecting", () => {
    console.log(socket.id + " se fue");
  });
  //delete
  socket.on("deleteProduct", async (productID) => {
    await productManager.deleteProduct(productID);
    websocketServer.emit("getProducts", await productManager.getProducts());
  });
});
