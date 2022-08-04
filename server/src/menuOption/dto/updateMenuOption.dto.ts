import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuOptionDto } from './createMenuOption.dto';

export class UpdateMenuOptionDto extends PartialType(CreateMenuOptionDto) {}
