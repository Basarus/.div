import { Module, forwardRef } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/users.model';
import { Answer } from './answer.model';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Answer])
  ],
})
export class AnswerModule { }
