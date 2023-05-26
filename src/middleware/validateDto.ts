import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

export const validateDto = <T extends object>(dtoClass: new () => T) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dtoInstance = plainToClass(dtoClass, req.body);

  const errors: ValidationError[] = await validate(dtoInstance);

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => Object.values(error.constraints));
    return res.status(400).json({ errors: errorMessages });
  }

  req.body = dtoInstance; // Replace the request body with the validated DTO object
  next();
};