import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateServiceScheduleDto } from "./dto/create-service-schedule.dto";
import { UpdateServiceScheduleDto } from "./dto/update-service-schedule.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceSchedule } from "./entities/service-schedule.entity";
import { Repository } from "typeorm";
import { ServicesService } from "../services/services.service";

@Injectable()
export class ServiceScheduleService {
  constructor(
    @InjectRepository(ServiceSchedule)
    private readonly serviceScheduleRepo: Repository<ServiceSchedule>,
    private readonly serviceService: ServicesService
  ) {}
  async create(createServiceScheduleDto: CreateServiceScheduleDto) {
    const service = await this.serviceService.findOne(
      createServiceScheduleDto.serviceId
    );
    if (!service) {
      throw new BadRequestException("Bunday Service mavjud emas");
    }

    const newServiceSchedule = await this.serviceScheduleRepo.save({
      ...createServiceScheduleDto,
      service,
    });
    return newServiceSchedule;
  }

  findAll() {
    return this.serviceScheduleRepo.find();
  }

  findOne(id: number) {
    return this.serviceScheduleRepo.findOneBy({ id });
  }

  async update(id: number, updateServiceScheduleDto: UpdateServiceScheduleDto) {
    if (updateServiceScheduleDto.serviceId) {
      const service = await this.serviceService.findOne(
        updateServiceScheduleDto.serviceId
      );

      if (!service) {
        throw new BadRequestException("Bunday ID li service mavjud emas");
      }
    }
    const sService = await this.serviceScheduleRepo.preload({
      id,
      ...updateServiceScheduleDto,
    });
    if (!sService) {
      throw new BadRequestException("Bunday service schedule mavjud emas");
    }

    return this.serviceScheduleRepo.save(sService);
  }

  async remove(id: number) {
    const sService = await this.findOne(id);
    if (!sService) {
      throw new BadRequestException(
        "Bunday ID li service schedule mavjud emas"
      );
    }
    this.serviceScheduleRepo.delete(id);
    return {
      message: `${id} ID li service schedule o'chirildi`,
    };
  }
}
