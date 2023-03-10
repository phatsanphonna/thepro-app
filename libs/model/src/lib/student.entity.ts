import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@thepro/database';

@Injectable()
export class StudentEntity {
  constructor(private readonly databaseService: DatabaseService) {}

  async findStudentByUserAuthId(userAuthId: string) {
    return await this.databaseService.student.findUnique({
      where: {
        userAuthId,
      },
      include: {
        userAuth: {
          select: {
            email: true,
          }
        },
        assignment: {
          select: {
            id: true,
            title: true,
            descripton: true
          }
        },
      }
    });
  }
}
