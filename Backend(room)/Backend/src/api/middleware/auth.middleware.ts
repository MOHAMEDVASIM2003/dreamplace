import { NextFunction, Request, Response } from "express";

export const authorise = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Authorising...');
    next();
    // Authorisation logic here...
}