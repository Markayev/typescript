import {NextFunction, Response, Request, Router} from "express";

export interface IControllerRoute {
    path: string,
    method: keyof Pick<Router, 'get'| 'post' | 'put'| 'patch' | 'delete'>,
    func: (req:Request, res: Response, next:NextFunction) => void,
}