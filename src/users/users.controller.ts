import {Controller, Post, Body, Get, Param, Query, Delete, Patch} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post("/signup")
    signUp(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password).then(user => {
            return {
                message: "User created successfully",
                user
            }
        }).catch(error => {
            throw new Error(`User creation failed: ${error.message}`);
        });
    }

    @Get("/:id")
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Get()
    findAllUsers() {
        return this.usersService.findAll();
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
