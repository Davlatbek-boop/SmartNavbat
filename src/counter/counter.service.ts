import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCounterDto } from "./dto/create-counter.dto";
import { UpdateCounterDto } from "./dto/update-counter.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Counter } from "./entities/counter.entity";
import { Repository } from "typeorm";
import { BranchesService } from "../branches/branches.service";

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter) private readonly counterRepo: Repository<Counter>,
    private readonly branchService: BranchesService
  ) {}
  async create(createCounterDto: CreateCounterDto) {
    const branch = await this.branchService.findOne(createCounterDto.branchId)
    if(!branch){
      throw new BadRequestException("Bunday id li branch  mavjud emas")
    }
    return this.counterRepo.save(createCounterDto);
  }

  findAll() {
    return this.counterRepo.find({ relations: ["branch"] });
  }

  findOne(id: number) {
    return this.counterRepo.findOneBy({ id });
  }

  async update(id: number, updateCounterDto: UpdateCounterDto) {
    const counter = await this.counterRepo.preload({ id, ...updateCounterDto });
    if (!counter) {
      throw new BadRequestException("Bunday counter mavjud emas");
    }
    return this.counterRepo.save(counter);
  }

  async remove(id: number) {
    const counter = await this.findOne(id);
    if (!counter) {
      throw new BadRequestException("Bunday counter mavjud emas");
    }
    this.counterRepo.delete(id);
    return {
      message: `${id} ID li counter o'chirildi`,
    };
  }
}
