import { Request, Response } from "express";
import fs from "fs";
import unzipper from "unzipper";
import { Product, selectById, selectAll, selectLastID } from "../../models/product";
import { selectAllProductType } from "../../models/product_types";

interface MulterRequest extends Request {
  files: any;
}




export let index = async (_req: Request, _res: Response) => {
  const data = await selectAll();


  _res.render("admin/router/product", {
    user: _res.locals.currentUser,

    title: "Product",
    data,
    message: _res.locals.success_msg,
    page_name: "product"
  });
};


var deleteFolderRecursive = function (path: any) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

export let add = async (_req: Request, _res: Response) => {
  const data = await selectAllProductType();
  _res.render("admin/router/add", {
    user: _res.locals.currentUser,

    title: "Product",
    message: _res.locals.error,
    data,
    page_name: "product"
  });
};

export let deletePro = async (_req: Request, _res: Response) => {
  const product_id = _req.params.id;
  try {
    const product = await Product.findOne({ where: { id: product_id } });
    await Product.destroy({ where: { id: product_id } })
      .then(async function (rowDeleted) {
        if (rowDeleted === 1) {
          const dir = `./public/upload/${product.url}/`;
          await deleteFolderRecursive(dir)
          const success = "Deleted successfully";
          _res.locals.success_msg = _req.flash("success_msg", success);
          return _res.redirect("/product");
        }
      }, function (err: any) {
        console.error(err);
      });
  } catch (err) {
    console.error(`Error while deleting .`);
  }


};

export let editPro = async (_req: Request, _res: Response) => {
  const data = await selectAllProductType();
  const resultId = await selectById(_req.params.id);
  _res.render("admin/router/edit", {
    user: _res.locals.currentUser,
    resultId,
    title: "Product Edit ",
    data,
    id: _req.params.id,
    error: _res.locals.error,
    page_name: "product"
  });
};


export let saveUpdate = async (_req: Request, _res: Response) => {
  try {
    const product_id = _req.params.id;
    Product.update({ name: _req.body.exampleGameName, price: _req.body.price, ios: _req.body.ios, apk: _req.body.apk, description: _req.body.exampleDescription, category: _req.body.select }, { where: { product_id } }).then(rowUpdate => {
      if (rowUpdate[0] === 1) {
        const success = "Edit successfully";
        _res.locals.success_msg = _req.flash("success_msg", success);
        return _res.redirect("/product");
      }
    });
  } catch (error) {
    console.log(error);
  }

};




export let addNew = async (_req: MulterRequest, _res: Response) => {
  try {
    const lastID: any = await selectLastID();
    var nextID = 0;
    if (lastID) {
      nextID = lastID.id;
    }
    nextID += 1;

    const file = _req.files.fileGame[0];
    const fileImage = _req.files.image[0];
    const iconImage = _req.files.icon[0];

    if (!file || !fileImage || !iconImage) {
      return _res.send({
        status: 201,
        url: ("Please upload a file")
      });
    } else {

      return unzip(file.path, file.destination)
        .then(async function (res: number) {
          const product = {
            name: _req.body.exampleGameName,
            price: _req.body.price,
            ios: _req.body.ios,
            apk: _req.body.apk,
            description: _req.body.exampleDescription,
            category: _req.body.select,
            image: `${fileImage.path.substr(7, fileImage.path.length)}`,
            url: `${nextID}_game/`,
            icon: `${iconImage.path.substr(7, iconImage.path.length)}`,
          };

          if (res == 200) {
            const save = await Product.create(product);
            if (save) {
              return _res.redirect("/product");
            }
          } else {
            const errMsgs = "Error Create Database";
            _res.locals.error = _req.flash("error", errMsgs);
            return _res.redirect(`/product/add`);
          }
        })
        .catch(async (err) => {
          const errMsgs = "Error Unzip  " + err;
          _res.locals.error = _req.flash("error", errMsgs);
          return _res.redirect(`/product/add`);
        });
    }
  } catch (err) {
    console.log(err);
  }


};


function unzip(url: string, dest: string) {

  return new Promise((resolve, reject) => {
    try {

      fs.createReadStream(url).pipe(unzipper.Extract({ path: dest })).on("close", () => {
        fs.unlink(url, (e) => {
          if (e) console.error(e);
          else console.log(`Remove ${url}`);
        });
        return resolve(200);
      });
    } catch (error) {
      reject(error);
    }

  });
}

