import { Request, Response } from "express";
import { Identifier } from "sequelize/types";
import { Product } from "../../models/product";

export let index = async (_req: Request, _res: Response) => {
  const id = _req.params.id;
  const data = await select(id);

  const allGame = await Product.findAndCountAll({

    limit: 6,
    order: [
      ["id", "DESC"]
    ]
  });
  if (data) {
    return _res.render("web/router/details", {
      title: "Detail",
      data,
      allGame
    });
  }
  return _res.redirect("/");
};


const select = async (id: Identifier) => {
  return new Promise((resolve, reject) => {
    Product.findByPk(id).then(data => {
      resolve(data);
    })
      .catch(err => {
        console.log(err);
        reject(undefined);

      });

  });
};
