import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

@Injectable()
export class IdVerificationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.id) ||
      !/^[a-fA-F0-9]{24}$/.test(req.params.id)
    )
      res.status(400).send('Invalid Id');
    else next();
  }
}
