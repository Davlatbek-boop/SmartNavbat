import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";
import { Repository } from "typeorm";
import { BranchesService } from "../branches/branches.service";
import { StaffService } from "../staff/staff.service";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    private readonly branchService: BranchesService,
    private readonly staffService: StaffService
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const branch = await this.branchService.findOne(createServiceDto.branchId);

    if (!branch) {
      throw new BadRequestException("Bunday branch mavjud emas");
    }

    const staff = await this.branchService.findOne(createServiceDto.staffId);

    if (!staff) {
      throw new BadRequestException("Bunday xodim mavjud emas");
    }

    const newService = await this.serviceRepo.save({
      ...createServiceDto,
      branch,
    });
    return newService
  }

  findAll() {
    return this.serviceRepo.find()
  }

  findOne(id: number) {
    return this.serviceRepo.findOneBy({id})
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    if(updateServiceDto.branchId){
      const branch = await this.branchService.findOne(updateServiceDto.branchId)
      if(!branch){
        throw new BadRequestException("Bunday ID li Branch mavjud emas")
      }
    }
    const service = await this.serviceRepo.preload({id, ...updateServiceDto})
    if(!service){
      throw new BadRequestException("Bunday ID li Service yo'q")
    }
    return this.serviceRepo.save(service)
  }

  async remove(id: number) {
    const service = await this.findOne(id)
    if(!service){
      throw new BadRequestException("Bunday Service mavjud emas")
    }

    this.serviceRepo.delete(id)
    return {
      message: `${id} ID li service o'chirildi`
    }
  }
}
