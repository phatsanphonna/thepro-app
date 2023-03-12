import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import {
  AuthGuard,
  AuthTicket,
  Roles,
  UserAuth,
} from '@thepro/auth';
import { Role } from '@prisma/client';

@Controller('/student')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  @Roles([Role.STUDENT])
  async getStudent(@UserAuth() userAuth: AuthTicket) {
    return await this.studentService.getStudent(userAuth);
  }
}
