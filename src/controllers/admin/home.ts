import { Request, Response } from "express";
import { Product } from "../../models/product";


export let index = async (_req: Request, _res: Response) => {
  const products = await Product.findAll();
  _res.render("admin/router/home", {
    user: _res.locals.currentUser,
    title: "Home",
    page_name: "home"
    , products
  });
};

