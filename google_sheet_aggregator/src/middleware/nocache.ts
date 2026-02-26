import {type NextFunction, type Request,type Response } from 'express'
export function nocache() {
  return function (req:Request,res:Response, next:NextFunction) {
    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Expires", "0");
      res.setHeader('Pragma', 'no-cache');
    next();
  };
};

