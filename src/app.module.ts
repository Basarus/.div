import {Module } from "@nestjs/common"
import { RequestController } from "./app.controller";
import { RequestService } from "./app.service";

@Module({
    controllers: [RequestController],
    providers: [RequestService]
})

export class RequestModule{}