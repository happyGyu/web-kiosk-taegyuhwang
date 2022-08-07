import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ChoiceService } from './choice.service';

@Controller('choices')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Get()
  async getMenuOptionsByMenuId(
    @Res() res: Response,
    @Query('menu-id') menuId: string,
  ) {
    const options = await this.choiceService.getChoicesByMenuId(
      parseInt(menuId),
    );
    return res.status(HttpStatus.OK).json(options);
  }
}
