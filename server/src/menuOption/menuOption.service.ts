import { Injectable } from '@nestjs/common';
import { CreateMenuOptionDto } from './dto/createMenuOption.dto';
import { UpdateMenuOptionDto } from './dto/updateMenuOption.dto';

@Injectable()
export class MenuOptionService {
  create(createMenuOptionDto: CreateMenuOptionDto) {
    return 'This action adds a new option';
  }

  findAll() {
    return `This action returns all option`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  update(id: number, updateMenuOptionDto: UpdateMenuOptionDto) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }
}
