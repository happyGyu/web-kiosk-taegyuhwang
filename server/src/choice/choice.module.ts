import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Choice } from './entities/choice.entity';
import { ChoiceGroup } from './entities/choiceGroup.entity';
import { ChoiceController } from './choice.controller';
import { ChoiceService } from './choice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Choice, ChoiceGroup])],
  controllers: [ChoiceController],
  providers: [ChoiceService],
  exports: [ChoiceService],
})
export class ChoiceModule {}
