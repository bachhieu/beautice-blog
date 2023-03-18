const { CartService, ProductService, DeleveryService } = require("./../services");
class CartController {
  async addToCart(req, res) {
    try {
      let products = await Promise.all(
        req.body.products.map(async (product) => {
          const oldProduct = await ProductService.findOne({ _id: product.product });
          return oldProduct ? product : null;
        })
      );
      products = products.filter((prod) => prod);
      if (!products.length) {
        throw new Error("Bad Request!!!!");
      }
      if (req.anonymous) {
        const payload = {
          ip: req.ip,
          products: products,
        };
        const result = await CartService.addToCart(true, payload);
        res.status(201).json(result);
        return;
      } else {
        const payload = {
          ip: req.ip,
          userId: req.user.id,
          products: products,
        };
        const result = await CartService.addToCart(false, payload);
        res.status(201).json(result);
        return;
      }
    } catch (e) {
      console.log("🚀 ~ file: cart.controller.js:30 ~ CartController ~ addToCart ~ e:", e);
      res.status(400).json("Add to cart fall!!");
    }
  }

  async findCartPending(req, res) {
    try {
      let query;
      if (req.anonymous) {
        query = {
          ip: req.ip,
        };
      } else {
        query = {
          userId: req.user.id,
        };
      }
      const result = await CartService.getCart(query);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json("get cart fail!!!!");
    }
  }

  async order(req, res) {
    try {
      const query = {
        userId: req.user.id,
      };
      const cart = await CartService.getCart(query);
      if (!cart) {
        throw new Error("can not order!!!!");
      }
      // check products In Stock
      await ProductService.checkproductsInStock(cart.products);

      await CartService.changeStatusCartToActive(query);

      res.status(200).json("plase call api cart/payment");
    } catch (e) {
      console.log("🚀 ~ file: cart.controller.js:74 ~ CartController ~ order ~ e:", e);
      res.status(400).json("can not order!!!!");
    }
  }

  async payment(req, res) {
    try {
      const query = {
        userId: req.user.id,
      };

      const cart = (await CartService.changeStatusCartToDone(query)) || [];
      const result = await Promise.all(
        // @ts-ignore
        cart.products.map(async (product) => {
          const params = {
            payment_type_id: 2,
            note: "Tintest 123",
            from_name: "Tin",
            from_phone: "0909999999",
            from_address: "123 Đường 3/2",
            from_ward_name: "Phường 5",
            from_district_name: "Quận 11",
            from_province_name: "TP Hồ Chí Minh",
            service_id: 53320,
            service_type_id: null,
            to_address: "Tops Market Hà Đông, Trần Phú, Mộ Lao, Hà Đông, Hà Nội",
            to_name: "hieu",
            to_phone: "0974303775",
            to_ward_code: "21012",
            cod_amount: 200000,
            height: 50,
            length: 20,
            weight: 200,
            width: 20,
            insurance_value: 10000,
            coupon: null,
            required_note: "CHOTHUHANG",
            Items: [
              {
                name: "demo product",
                quantity: product.quantity,
                weight: 200,
              },
            ],
          };
          return await DeleveryService.create(params);
        })
      );
      res.status(200).json(result);
    } catch (e) {
      console.log("🚀 ~ file: cart.controller.js:107 ~ CartController ~ payment ~ e:", e);
      res.status(400).json("can not order!!!!");
    }
  }
}

module.exports = new CartController();
