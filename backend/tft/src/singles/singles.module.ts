import { Module } from "@nestjs/common";
import { SinglesService } from "./singles.service";
import { SinglesController } from "./singles.controller";
import { PrismaModule } from "src/db/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [SinglesService],
    controllers: [SinglesController],
    exports: []
})
export class SinglesModule {}