import { SetMetadata } from '@nestjs/common';

export const Jwt = () => SetMetadata('jwt', true);
