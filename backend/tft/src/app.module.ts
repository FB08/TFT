import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { PatternsModule } from './patterns/patterns.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { SinglesModule } from './singles/singles.module';
import { RecordModule } from './records/records.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule, 
    AuthModule, 
    StudentsModule, 
    UsersModule, 
    PatternsModule, 
    ExceptionsModule, 
    SinglesModule,
    RecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
