import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('/assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get('/:id')
  async getAssignmentById(@Param('id') id: string) {
    return await this.assignmentService.getAssignmentById(id);
  }
}
