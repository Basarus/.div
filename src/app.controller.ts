
import { Controller, Get } from '@nestjs/common';
import { RequestService } from './app.service';

@Controller('/requests')

export class RequestController {

    constructor(private requestService: RequestService){}

    @Get()
    getRequestes(){
        return this.requestService.getRequests()
    }

}
