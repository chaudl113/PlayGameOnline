import { Request, Response } from "express";


export let index = async (_req: Request, _res: Response) => {
  _res.render("web/router/contact", {
    title: "Contact",
  });
};



