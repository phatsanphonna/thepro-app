import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard, AuthTicket, UserAuth } from '@thepro/auth';

@Controller('/student')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  async getStudent(@UserAuth() userAuth: AuthTicket) {
    return await this.studentService.getStudent(userAuth);
  }
}
