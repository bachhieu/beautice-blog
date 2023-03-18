const { cartModel } = require("./../db");
const { statusEnum } = require("./../init");
class cart {
  async addToCart(anonymous, payload) {
    if (anonymous) {
      const oldCart = await cartModel.findOne({ ip: payload.ip, status: statusEnum.PENDING });
      if (oldCart) {
        let newProductInCart = [];
        payload.products.forEach((product) => {
          if (
            !oldCart.products.some(
              (prod) => prod.product?.toString() == product.product?.toString()
            )
          ) {
            newProductInCart.push(product);
          } else {
            oldCart.products.forEach((prod) => {
              if (prod.product?.toString() == product.product?.toString()) {
                prod.quantity = product.quantity + prod.quantity;
              }
            });
          }
        });
        if (newProductInCart.length) oldCart.products?.push(...newProductInCart);
        Object.assign(oldCart, { userId: payload.userId }, { ip: payload.userId });
        await oldCart.updateOne(oldCart);
        return oldCart;
      } else {
        return cartModel.create(payload);
      }
    } else {
      const oldCart = await cartModel.findOne({
        $or: [{ userId: payload.userId }, { ip: payload.ip }],
        status: statusEnum.PENDING,
      });
      if (oldCart) {
        let newProductInCart = [];
        payload.products.forEach((product) => {
          if (
            !oldCart.products.some(
              (prod) => prod.product?.toString() == product.product?.toString()
            )
          ) {
            newProductInCart.push(product);
          } else {
            oldCart.products.forEach((prod) => {
              if (prod.product?.toString() == product.product?.toString()) {
                prod.quantity = product.quantity + prod.quantity;
              }
            });
          }
        });
        if (newProductInCart.length) oldCart.products.push(...newProductInCart);
        Object.assign(oldCart, { userId: payload.userId }, { ip: payload.userId });
        await oldCart.updateOne(oldCart);
        return oldCart;
      } else {
        return cartModel.create(payload);
      }
    }
  }

  async findCartPending(query) {
    return cartModel.findOne({ ...query, status: statusEnum.PENDING });
  }

  async getCart(query) {
    return cartModel
      .findOne({ ...query, status: statusEnum.PENDING })
      .populate("products.product", "name price _id");
  }

  async changeStatusCartToActive(query) {
    return cartModel.findOneAndUpdate(
      { ...query, status: statusEnum.PENDING },
      { status: statusEnum.ACTIVE },
      { new: true }
    );
  }

  async changeStatusCartToDone(query) {
    return cartModel.findOneAndUpdate(
      { ...query, status: statusEnum.ACTIVE },
      { status: statusEnum.DONE },
      { new: true }
    );
  }
}

module.exports = new cart();
