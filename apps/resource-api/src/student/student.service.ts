import { Injectable } from '@nestjs/common';
import { AuthTicket } from '@thepro/auth';
import { StudentEntity } from '@thepro/model';

@Injectable()
export class StudentService {
  constructor(private readonly studentEntity: StudentEntity) {}

  async getStudent(userAuth: AuthTicket) {
    return await this.studentEntity.findStudentByUserAuthId(userAuth.id);
  }
}
