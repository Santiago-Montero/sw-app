import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly env: Record<string, string>;
  constructor() {
    if (!process.env.NODE_ENV) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      config({
        path: '.env',
      });
    }
    this.env = process.env as Record<string, string>;
  }

  get<T extends string>(key: T): string {
    return this.env[key];
  }
}
