import { Module } from "@nestjs/common";
import { RecordController } from "./records.controller";
import { RecordService } from "./records.service";
import { PrismaModule } from "src/db/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [RecordController],
    providers: [RecordService],
    exports: []
})
export class RecordModule {}