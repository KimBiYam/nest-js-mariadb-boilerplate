import { ConfigModuleOptions } from '@nestjs/config';

export const configModuleOption: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'DEVELOPMENT' ? '.env-dev' : '.env',
};
