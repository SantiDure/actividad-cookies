import { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";
import { productsManager } from "../mongodb.js";
const cartSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    products: { type: [Object], default: [] },
  },
  {
    strict: "throw",
    versionKey: false,
    statics: {
      addProductToCart: async function (cid, pid) {
        const initialQuantity = 1;

        const cart = await cartsManager.findById(cid);
        const product = await productsManager.findById(pid).lean();

        const productIndexFind = cart.products.findIndex(
          (p) => p._id === product._id
        );

        if (productIndexFind === -1) {
          await cartsManager.findOneAndUpdate(
            { _id: cid },
            {
              $addToSet: {
                products: { _id: product._id, quantity: initialQuantity },
              },
            }
          );
        } else {
          await cartsManager.findOneAndUpdate(
            { _id: cid, "products._id": product._id },
            {
              $inc: {
                "products.$.quantity": initialQuantity,
              },
            }
          );
        }
      },
    },
  }
);

export const cartsManager = model("carts", cartSchema);
