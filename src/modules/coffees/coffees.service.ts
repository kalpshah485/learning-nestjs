import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const coffees = await this.coffeesRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
      order: {
        id: {
          direction: 'ASC',
        },
      },
    });
    return coffees;
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: any) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name: string) =>
        this.preloadFlavorByName(name),
      ),
    );

    const coffee = await this.coffeesRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeesRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name: string) =>
          this.preloadFlavorByName(name),
        ),
      ));
    const coffee = await this.coffeesRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found.`);
    }
    return this.coffeesRepository.save(coffee);
  }
  async remove(id: string) {
    const coffee = await this.findOne(+id);
    return this.coffeesRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string) {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: {
        name,
      },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }
}
