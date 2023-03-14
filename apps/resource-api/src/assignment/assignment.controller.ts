import { Controller, Get, Param, Post } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Roles } from '@thepro/auth';
import { Role } from '@thepro/model'

@Controller('/assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get('/:id')
  async getAssignmentById(@Param('id') id: string) {
    return await this.assignmentService.getAssignmentById(id);
  }

  @Post('/')
  @Roles([Role.ADMIN, Role.TEACHER])
  async createAssignment() {
    return
  }
}
