import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choice } from './entities/choice.entity';
import { ChoiceGroup } from './entities/choiceGroup.entity';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
    @InjectRepository(ChoiceGroup)
    private choiceGroupRepository: Repository<ChoiceGroup>,
  ) {}

  async getChoicesByMenuId(menuId: number) {
    return await this.choiceGroupRepository.find({
      where: { choices: { menus: { menuToChoice: { id: menuId } } } },
      relations: ['choices'],
    });
  }

  async getChoiceById(choiceId: number) {
    return await this.choiceRepository.findOneBy({ id: choiceId });
  }

  async getExtraChargeById(choiceId: number) {
    const choice = await this.getChoiceById(choiceId);
    return choice.extraCharge;
  }
}
