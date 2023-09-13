import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private UsersService: UsersService){}

    async signup(email: string, password: string){
        // See if email is in use
        const users = await this.UsersService.find(email);
        if(users.length){
            throw new BadRequestException('email in use');
        }

        // Hash the user's password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and the password
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save
        const user = await this.UsersService.create(email, result);

        // return the user
        return user;
    }

    signin(){

    }
}