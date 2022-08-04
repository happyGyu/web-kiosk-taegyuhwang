import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuOptionService } from './menuOption.service';
import { CreateMenuOptionDto } from './dto/createMenuOption.dto';
import { UpdateMenuOptionDto } from './dto/updateMenuOption.dto';

@Controller('option')
export class MenuOptionController {
  constructor(private readonly menuOptionService: MenuOptionService) {}

  @Post()
  create(@Body() createOptionDto: CreateMenuOptionDto) {
    return this.menuOptionService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.menuOptionService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuOptionDto: UpdateMenuOptionDto,
  ) {
    return this.menuOptionService.update(+id, updateMenuOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuOptionService.remove(+id);
  }

  @Get(':id')
  getMenuOptionsByMenuId(@Param('id') menuId: string) {
    return this.menuOptionService.getMenuOptionsByMenuId(parseInt(menuId));
  }
}
