import { Controller, Post, Get, Request, UseGuards, Body, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'models/interfaces/User'
import { UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../sentry/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
    logger: Logger;
    constructor(private readonly userService: UsersService) {
        this.logger = new Logger(AuthController.name)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<User> {
        const user = await this.userService.findById(req.user._id)
        this.logger.log(`${user.email} logged in`)
        return user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('me')
    async getProfileInfo(@Request() req): Promise<User> {
        return await this.userService.findById(req.user._doc._id);
    }

    @Post('register')
    async registerUser(@Body() params): Promise<User> {
        return await this.userService.createUser(
            params.firstName, params.lastName, params.email, params.password
        )
    }
}
