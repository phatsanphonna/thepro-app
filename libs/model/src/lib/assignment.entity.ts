import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@thepro/database';

@Injectable()
export class AssignmentEntity {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAssignments() {
    return await this.databaseService.assignment.findMany();
  }

  async getAssignmentById(id: string) {
    return await this.databaseService.assignment.findUnique({
      where: {
        id,
      },
      select: {
        assignToStudent: true,
        material: true
      }
    });
  }
}
