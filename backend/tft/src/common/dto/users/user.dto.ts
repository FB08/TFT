import { IsNotEmpty, IsString } from "class-validator";
import { user } from "generated/browser";

export type User =  user;
    
export class UserDTO {
    @IsNotEmpty()
    @IsString()
    id!: string;

    @IsNotEmpty()
    @IsString()
    userId!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

}

export function toUserDTO(user: User): UserDTO {
    return {
        id: user.id,
        userId: user.userId,
        name: user.name
    }
}