import {
  Controller,
  Get,
  NotFoundException,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AllExceptionsFilter } from 'exception';
import { QueryUsername } from 'base/query/search.query';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Get profile',
  })
  async getProfile(@Req() req: any) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findByEmailExceptPass(
        decodedToken.email,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }

      return user;
    } catch (error) {
      throw new AllExceptionsFilter();
    }
  }

  @Get('username')
  @ApiOperation({
    summary: 'Get profile by username',
  })
  async getProfileByUsername(@Query() query: QueryUsername) {
    try {
      const userProfile = await this.userService.findByUsername(query.username);
      if (!userProfile) {
        throw new UnauthorizedException(
          `Username: ${query.username} not found!`,
        );
      }
      return userProfile;
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
