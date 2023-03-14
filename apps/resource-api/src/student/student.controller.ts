import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import {
  AuthGuard,
  AuthTicket,
  Cookies,
  Roles,
  UserAuth,
} from '@thepro/auth';
import { Role } from '@thepro/model';

@Controller('/student')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  // @Roles([Role.STUDENT, Role.ADMIN])
  async getStudent(@UserAuth() userAuth: AuthTicket) {
    return await this.studentService.getStudent(userAuth);
  }
}
