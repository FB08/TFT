import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// 1. 현재 에러가 없는 원래의 생성 경로 그대로 가져옵니다.
import { PrismaClient } from '../../generated/client'; 
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 2. 어댑터가 요구하는 정확한 PoolConfig 타입에 맞춰 정보를 기입합니다.
    // 본인의 실제 DB 접속 정보에 맞게 아래 내용을 직접 수정해 주세요!
    const adapter = new PrismaMariaDb({
      host: 'localhost',       // 예: '127.0.0.1' 또는 실제 DB 호스트
      port: 3306,              // MySQL 기본 포트
      user: 'root',            // DB 유저명 (예: 'root')
      password: '1234',    // DB 비밀번호
      database: 'tft',// 연결할 데이터베이스 이름
      connectionLimit: 20,     // 기본 커넥션 풀 개수
    });

    // 3. Prisma 7 생성자에 어댑터를 주입합니다.
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}