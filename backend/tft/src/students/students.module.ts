import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { PrismaModule } from "src/db/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [StudentsService],
    exports: [StudentsService],
    controllers: [StudentsController]
})

export class StudentsModule {}