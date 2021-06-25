import express, { Response, NextFunction } from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import * as homeController from "./controllers/admin/home";
import * as productsController from "./controllers/admin/products";
import * as productTypesController from "./controllers/admin/product_types";
import * as userController from "./controllers/admin/user_Controller";
import multer from "multer";
import fs from "fs";
import expressSession from "express-session";
const flash = require("connect-flash");
import cookieParser from "cookie-parser";
import { selectLastID } from "./models/product"


const storage = multer.diskStorage({
  destination: async function (_req, _file, cb) {
    const lastID: any = await selectLastID();
    var nextID = 0;
    if (lastID) {
      nextID = lastID.id;
    }
    nextID += 1;

    const dir = `public/upload/${nextID}_game/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: async function (_req, file, cb) {
    const lastID: any = await selectLastID();
    var nextID = 0;
    if (lastID) {
      nextID = lastID.id;
    }
    nextID += 1;
    cb(undefined, `${nextID}_${file.fieldname}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage
});

const app2 = express();
app2.use(cookieParser());



app2.set("views", './views');
app2.set("view engine", "ejs");
app2.use(expressLayouts);
app2.use(compression());
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(
  express.static("./public", { maxAge: 31557600000 })
);

app2.use(expressSession({
  secret: "mySecretKey",
  resave: true,
  saveUninitialized: true
}));
app2.use(flash());
const sessionFlash = function (req: any, res: Response, next: NextFunction) {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();

};
app2.use(sessionFlash);

app2.set("layout", "layouts/admin");
app2.get("/login", userController.getLogin);
app2.post("/login", userController.postLogin);

app2.get("/verify-2fa", userController.getVerify);
app2.post("/verify2fa", userController.postVerify);


app2.post('/enable-2fa', userController.tokenGuard(), userController.postEnable2FA)
app2.get('/enable-2fa', userController.tokenGuard(), userController.getEnable2FAPage)

app2.get("/signup", userController.getSignup);
app2.post("/signup", userController.postSignup);
app2.get("/logout", userController.logout);
app2.get("/change-passwords", userController.tokenGuard(), userController.reset);
app2.post("/change-passwords", userController.tokenGuard(), userController.savePassword);
app2.get("/", userController.tokenGuard(), homeController.index);

app2.get("/products-types", userController.tokenGuard(), productTypesController.index);
app2.post("/products-types", userController.tokenGuard(), productTypesController.addNew);
app2.get("/products-types/:id/delete", userController.tokenGuard(), productTypesController.deletePrt);
app2.get("/product", userController.tokenGuard(), productsController.index);
app2.get("/product/add", userController.tokenGuard(), productsController.add);
app2.get("/product/:id/delete", userController.tokenGuard(), productsController.deletePro);
app2.get("/product/:id/edit", userController.tokenGuard(), productsController.editPro);
app2.post("/product/:id/edit", userController.tokenGuard(), productsController.saveUpdate);
app2.post("/product", userController.tokenGuard(), upload.fields([{
  name: "fileGame",
  maxCount: 1
},
{
  name: "image",
  maxCount: 1
},
{
  name: "icon",
  maxCount: 1
}
]), productsController.addNew);




export default app2;