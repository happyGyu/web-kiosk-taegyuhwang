import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { Response } from 'express';

@Controller('choices')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Get()
  async getMenuOptionsByMenuId(
    @Res() res: Response,
    @Query('menu_id') menuId: string,
  ) {
    const options = await this.choiceService.getChoicesByMenuId(
      parseInt(menuId),
    );
    return res.status(HttpStatus.OK).json(options);
  }
}
