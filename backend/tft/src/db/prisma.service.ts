import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { softDeleteExtension } from './prisma.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '1234',
      database: 'tft',
      connectionLimit: 20,
    });

    super({
      adapter,
    });

    return Object.assign(this, this.$extends(softDeleteExtension));
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}