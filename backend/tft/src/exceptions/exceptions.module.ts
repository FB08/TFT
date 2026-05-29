import { Module } from "@nestjs/common";
import { ExceptionsController } from "./exceptions.controller";
import { ExceptionsService } from "./exceptions.service";
import { PrismaModule } from "src/db/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [ExceptionsService],
    exports: [ExceptionsService],
    controllers: [ExceptionsController]
})
export class ExceptionsModule {}