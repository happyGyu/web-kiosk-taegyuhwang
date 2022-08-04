import { Module } from '@nestjs/common';
import { MenuOptionService } from './menuOption.service';
import { MenuOptionController } from './menuOption.controller';

@Module({
  controllers: [MenuOptionController],
  providers: [MenuOptionService],
})
export class MenuOptionModule {}
