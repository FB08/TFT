import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { softDeleteExtension } from './prisma.extension';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // extends 대신 private 인스턴스로 보유
  private readonly prisma: ReturnType<PrismaClient['$extends']>;

  // 외부에서 prisma.user.findMany() 식으로 쓸 수 있게 Proxy로 위임
  [key: string]: any;

  constructor() {
    const adapter = new PrismaMariaDb({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '1234',
      database: 'tft',
      connectionLimit: 20,
    });

    const client = new PrismaClient({ adapter });

    // extension 적용
    this.prisma = client.$extends(softDeleteExtension);

    // Proxy로 this.user, this.post 등 모델 접근 위임
    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) return (target as any)[prop];
        return (target.prisma as any)[prop];
      },
    });
  }

  async onModuleInit() {
    await (this.prisma as any).$connect();
  }

  async onModuleDestroy() {
    await (this.prisma as any).$disconnect();
  }
}