import { PaymentMethod } from './../paymentMethod/entities/paymentMethod.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChoiceService } from 'src/choice/choice.service';
import { MenuService } from 'src/menu/menu.service';
import { PaymentMethodService } from 'src/paymentMethod/paymentMethod.service';

import { CreateOrderDto, CreateOrderSoldMenuDto } from './dto/createOrderDto';
import { CreateSoldMenuDto } from './dto/createSoldMenuDto';

import { Order } from './entities/order.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { SoldMenu } from 'src/order/entities/soldMenu.entity';
import { Choice } from 'src/choice/entities/choice.entity';
import { getRandom, getRandomResult, getYesterday } from 'src/util';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(SoldMenu)
    private soldMenuRepository: Repository<SoldMenu>,

    private menuService: MenuService,
    private paymentMethodService: PaymentMethodService,
    private choiceService: ChoiceService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { paymentMethodId, soldMenus } = createOrderDto;
    const newOrder = await this.createOrder(paymentMethodId);
    const todayOrderNum = await this.calTodayOrderNum(newOrder.id);
    const savedSoldMenus = await Promise.all(
      soldMenus.map(async (soldMenu) => {
        const createSoldMenuDto = await this.makeCreateSoldMenuDto(
          soldMenu,
          newOrder,
        );
        return this.createSoldMenu(createSoldMenuDto);
      }),
    );

    return { todayOrderNum, savedSoldMenus };
  }

  async createOrder(paymentMethodId: number) {
    const paymentMethod = await this.paymentMethodService.findById(
      paymentMethodId,
    );
    const newOrder = this.orderRepository.create({ paymentMethod });
    return await this.orderRepository.save(newOrder);
  }

  async createSoldMenu(createSoldMenuDto: CreateSoldMenuDto) {
    const newSoldMenu = this.soldMenuRepository.create(createSoldMenuDto);
    return await this.soldMenuRepository.save(newSoldMenu);
  }

  calculateSales(menu: Menu, choices: Choice[]) {
    const basePrice = menu.basePrice;
    const totalExtraCharge = choices.reduce(
      (totalExtraCharge, choice) => totalExtraCharge + choice.extraCharge,
      0,
    );
    return basePrice + totalExtraCharge;
  }

  makeChoiceSummary(choices: Choice[]) {
    const choiceSummary = choices.map((choice) => choice.name);
    return JSON.stringify(choiceSummary);
  }

  async makeCreateSoldMenuDto(
    soldMenu: CreateOrderSoldMenuDto,
    order: Order,
  ): Promise<CreateSoldMenuDto> {
    const { menuId, quantity, choiceIds } = soldMenu;
    const menu = await this.menuService.getById(menuId);
    const choices = await Promise.all(
      choiceIds.map((choiceId) => this.choiceService.getChoiceById(choiceId)),
    );

    const sales = this.calculateSales(menu, choices);
    const choiceSummary = this.makeChoiceSummary(choices);

    return {
      menu,
      choiceSummary,
      quantity,
      sales,
      order,
    };
  }

  findYesterdayLastOrder() {
    const yesterDay = getYesterday(new Date());
    return this.orderRepository.findOne({
      where: { createdAt: yesterDay },
      order: { createdAt: 'DESC' },
    });
  }

  async calTodayOrderNum(currentOrderId) {
    const yesterdayLastOrder = await this.findYesterdayLastOrder();
    const yesterdayLastOrderId = yesterdayLastOrder?.id || 0;
    return currentOrderId - yesterdayLastOrderId;
  }

  //???????????? ?????? ?????? ??? ????????? ???????????? ????????? ????????? ?????? ??????
  async checkPaymentValidity(paymentMethodId: number): Promise<boolean> {
    const paymentMethod = await this.paymentMethodService.findById(
      paymentMethodId,
    );
    if (paymentMethod.name === '??????') return true;
    const randomDelay = getRandom(3000, 7000);
    const randomResult = getRandomResult(0.5);
    return new Promise((resolve) =>
      setTimeout(() => resolve(randomResult), randomDelay),
    );
  }
}
