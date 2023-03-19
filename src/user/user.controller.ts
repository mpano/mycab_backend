import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  Serialize,
  SerializeEnterceptor,
} from '../interceptor/serialize.enterceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { currentuser } from './functions/current-user.decorator';
import { User } from './user.entity';
import { AuthGuards } from './guards/auth.guards';
import { LoginUserDto } from './dtos/login-user.dto';
import { RoleGuard } from "./guards/role.guard";

@Serialize(UserDto)
@Controller('/auth')
export class UserController {
  constructor(private userser: UserService, private authservice: AuthService) {}
  @Get('/currentuser')
  currentuser(@currentuser() user: User){
    if(!user){
      throw new BadRequestException('no user log in');
    }
    return user;
  }
  @Post('/logout')
  logout(@Session() session: any) {
    session.userId = null;
  }
  @Post('/signup')
  async createuser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authservice.signup(
      body.name,
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.authservice.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @UseGuards(AuthGuards)
  @Get('/user')
  display() {
    return this.userser.findall();
  }
  @UseGuards(AuthGuards)
  @Get('/:id')
  findbyid(@Param('id') id: string) {
    return this.userser.findbyid(parseInt(id));
  }
  @UseGuards(AuthGuards)
  @Patch('/user/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userser.update(parseInt(id), body);
  }
  @UseGuards(AuthGuards)
  @Get('/user/email')
  findbyemail(@Query('email') email: string) {
    return this.userser.find(email);
  }
  @UseGuards(RoleGuard)
  @Delete('user/delete/:id')
  remove(@Param('id') id: string) {
    return this.userser.remove(parseInt(id));
  }
}
