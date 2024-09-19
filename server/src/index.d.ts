import { Request, RequestHandler } from "express";

/* Doesn't work with RequestHandler, handler functions don't recognize user so had to make a custom handler below */
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export interface AuthenticatedRequestHandler extends RequestHandler {
  user?: { id: string };
}
