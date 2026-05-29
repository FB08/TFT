import { Module } from "@nestjs/common";
import { PatternsController } from "./patterns.controller";
import { PatternsService } from "./patterns.service";
import { PrismaModule } from "src/db/prisma.module";
import { StudentsModule } from "src/students/students.module";

@Module({
    imports: [PrismaModule, StudentsModule],
    providers: [PatternsService],
    controllers: [PatternsController],
    exports: [PatternsService]
})
export class PatternsModule {}