import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import * as contactController from "./controllers/web/contact";
import * as gameController from "./controllers/web/game";
import * as detailController from "./controllers/web/detail";
import * as aboutController from "./controllers/web/about";

import fs from "fs";
const app = express();
app.disable("view cache");

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "somesecret",
  cookie: { secure: false }
}));



app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("layout", "layouts/index");


app.get("/", validateStatic, gameController.indexPlayNow);
app.get("/about", validateStatic, aboutController.index);

app.get("/page/:page", validateStatic, gameController.paginationCard1);
app.get("/contacts", validateStatic, contactController.index);
app.get("/details/:id", validateStatic, detailController.index);

app.get("/:name", async (req, res) => {
  try {
    app.engine("html", require("ejs").renderFile);
    app.set("views", `./public/upload/${req.params.name}`);
    app.set("view engine", "html");
    app.use(`/${req.params.name}`, express.static(`./public/upload/${req.params.name}`, { etag: false, cacheControl: false }));

    if (fs.existsSync(`./public/upload/${req.params.name}`)) {
      res.sendFile(path.resolve(`./public/upload/${req.params.name}/index.html`));
    } else {
      res.redirect("/");
    }


  }
  catch (err) {
    console.log(err);
  }

});

async function validateStatic(_req: Request, _res: Response, next: NextFunction) {
  app.use((_req: Request, _res: Response, next: NextFunction) => {

    _res.set("Cache-Control", "no-cache, no-store, must-revalidate");

    next();
  });

  app.use(express.static(path.join(__dirname, `../public`), {
    etag: false, cacheControl: false
  }));
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  next();
}


export default app;