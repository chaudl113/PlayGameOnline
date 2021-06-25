import { Request, Response } from "express";
import { ProductType, selectAllProductType } from "../../models/product_types";




export let index = async (_req: Request, _res: Response) => {
  const data = await selectAllProductType();
  _res.render("admin/router/product_types", {
    title: "New Category",
    data,
    user: _res.locals.currentUser,
    message: _res.locals.success_msg,
    page_name: "category"
  });
};


export let addNew = async (_req: Request, _res: Response) => {
  const name = _req.body.productCategory;
  const check = await ProductType.findOne({ where: { name } });
  if (!check) {
    const save = await ProductType.create({ name });
    if (save) {
      return _res.json({ "success": "Successfully", "status": 200 });
    } else {
      return _res.json({ "err": "err", "status": 201 });

    }
  }

  return _res.json({ "error": "Category Đã có", "status": 201 });
};

export let deletePrt = async (_req: Request, _res: Response) => {
  const id = _req.params.id;
  await ProductType.destroy({ where: { id } })
    .then(async function (rowDeleted) {
      if (rowDeleted === 1) {
        const success = "Deleted successfully";
        _res.locals.success_msg = _req.flash("success_msg", success);
        return _res.redirect("/products-types");
      }
    });
};

// const select = async () => {
//   return new Promise((resolve, reject) => {
//     ProductType.findAll().then(data => {
//       return resolve(data);
//     })

//       .catch(err => {
//         if (err) return reject(undefined);
//       });

//   });
// };