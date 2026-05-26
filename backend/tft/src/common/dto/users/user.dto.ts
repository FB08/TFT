import { IsNotEmpty, IsString } from "class-validator";

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

export function toUserDTO(user: UserDTO): UserDTO {
    return {
        id: user.id,
        userId: user.userId,
        name: user.name
    }
}