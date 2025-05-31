import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateStaffSessionDto } from "./dto/create-staff-session.dto";
import { UpdateStaffSessionDto } from "./dto/update-staff-session.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { StaffSession } from "./entities/staff-session.entity";
import { Repository } from "typeorm";
import { StaffService } from "../staff/staff.service";

@Injectable()
export class StaffSessionsService {
  constructor(
    @InjectRepository(StaffSession)
    private readonly staffSessionRepo: Repository<StaffSession>,
    @Inject(forwardRef(() => StaffService))
  private readonly staffService: StaffService,
  ) {}
  async create(createStaffSessionDto: CreateStaffSessionDto) {
    const staff = await this.staffService.findOne(
      createStaffSessionDto.staffId
    );
    if (!staff) {
      throw new BadRequestException("Bunday staff topilmadi");
    }

    return this.staffSessionRepo.save({ staff, ...createStaffSessionDto });
  }

  findAll() {
    return this.staffSessionRepo.find();
  }

  findOne(id: number) {
    return this.staffSessionRepo.findOneBy({ id });
  }

  async update(id: number, updateStaffSessionDto: UpdateStaffSessionDto) {
    if(updateStaffSessionDto.staffId){
      const staff = await this.staffService.findOne(updateStaffSessionDto.staffId)
      if(!staff){
        throw new BadRequestException("Bunday id li staff mavjud emas")
      }
    }
    const stSession = await this.staffSessionRepo.preload({
      id,
      ...updateStaffSessionDto,
    });
    if (!stSession) {
      throw new BadRequestException("Bunday Staff Session mavjud emas");
    }
    return this.staffSessionRepo.save(stSession);
  }

  async remove(id: number) {
    const stSession = await this.findOne(id);
    if (!stSession) {
      throw new BadRequestException("Bunday Staff Session mavjud emas");
    }
    this.staffSessionRepo.delete(id);
    return {
      message: `${id} ID li staff session o'chirildi`,
    };
  }
}
