import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'public';

export const Public = (): CustomDecorator<string> =>
  SetMetadata(PUBLIC_KEY, true);
