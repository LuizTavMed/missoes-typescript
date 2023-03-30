import { Request, Response } from "express";

interface ILogController {
  create(req: Request, res: Response): Response;
  getAll(req: Request, res: Response): Response;
  get(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  delete(req: Request, res: Response): Response;
}

export default ILogController;
