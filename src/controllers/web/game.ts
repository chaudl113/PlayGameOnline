import { Request, Response } from "express";
import { Product } from "../../models/product";
import { selectAllProductType } from "../../models/product_types";





export let indexPlayNow = async (_req: Request, _res: Response) => {
  const ProductTypes = await selectAllProductType();
  const page = 1;
  const limit = 3;
  const offset = 0 + (page - 1) * limit;
  const data = await Product.findAndCountAll({
    offset: offset,
    limit: limit,
    order: [
      ["id", "ASC"]
    ]
  });
  _res.render("web/router/playnow", {
    title: "Play Now",
    products: data.rows,
    current: page,
    pages: Math.ceil(data.count / limit),
    productsTypes: ProductTypes
  });

};

export let paginationCard1 = async (_req: Request, _res: Response) => {
  const ProductTypes = await selectAllProductType();

  const page = parseInt(_req.params.page) || 1;
  const limit = 3;
  const offset = 0 + (page - 1) * limit;
  const data = await Product.findAndCountAll({
    offset: offset,
    limit: limit,
    order: [
      ["id", "ASC"]
    ]
  });
  _res.render("web/router/playnow", {
    title: "Play Now",
    products: data.rows,
    current: page,
    pages: Math.ceil(data.count / limit),
    productsTypes: ProductTypes

  });



};


