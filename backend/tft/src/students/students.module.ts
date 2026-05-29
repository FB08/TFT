import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { PrismaModule } from "src/db/prisma.module";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [PrismaModule, UsersModule],
    providers: [StudentsService],
    exports: [StudentsService],
    controllers: [StudentsController]
})

export class StudentsModule {}