import { Controller, Get, Param } from '@nestjs/common';
import { ChoiceService } from './choice.service';

@Controller('choices')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Get(':id')
  getMenuOptionsByMenuId(@Param('id') menuId: string) {
    return this.choiceService.getChoicesByMenuId(parseInt(menuId));
  }
}
