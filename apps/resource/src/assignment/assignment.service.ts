import { Injectable } from '@nestjs/common';
import { AssignmentEntity } from '@thepro/model';

@Injectable()
export class AssignmentService {
  constructor(private readonly assignmentEntity: AssignmentEntity) {}

  async getAssignmentById(id: string) {
    return await this.assignmentEntity.getAssignmentById(id)
  }
}
