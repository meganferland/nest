import { Injectable } from '@nestjs/common';
import { PowerService} from '../power/power.service';

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService){}

    getData(){
        console.log("Drawing some power from the power service");
        this.powerService.supplyPower(20);
        return 'something';
    }
}
