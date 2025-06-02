import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAnnouncementDto } from "./dto/create-announcement.dto";
import { UpdateAnnouncementDto } from "./dto/update-announcement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Announcement } from "./entities/announcement.entity";
import { Repository } from "typeorm";
import { StaffService } from "../staff/staff.service";
import { BranchesService } from "../branches/branches.service";

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepo: Repository<Announcement>,
    private readonly staffService: StaffService,
    private readonly branchService: BranchesService
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    const staff = await this.staffService.findOne(
      createAnnouncementDto.staffId
    );

    if (!staff) {
      throw new BadRequestException("Bunday staff ID mavjud emas");
    }

    const branch = await this.branchService.findOne(
      createAnnouncementDto.branchId
    );

    if (!branch) {
      throw new BadRequestException("Bunday branch ID mavjud emas");
    }

    const newAnnouncement = await this.announcementRepo.save({
      ...createAnnouncementDto,
      staff,
      branch,
    });

    return newAnnouncement;
  }

  findAll() {
    return this.announcementRepo.find();
  }

  findOne(id: number) {
    return this.announcementRepo.findOneBy({ id });
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    if (updateAnnouncementDto.staffId) {
      const staff = await this.staffService.findOne(
        updateAnnouncementDto.staffId
      );

      if (!staff) {
        throw new BadRequestException("Bunday staff ID mavjud emas");
      }
    }

    if (updateAnnouncementDto.branchId) {
      const branch = await this.branchService.findOne(
        updateAnnouncementDto.branchId
      );

      if (!branch) {
        throw new BadRequestException("Bunday branch ID mavjud emas");
      }
    }
    const announcement = await this.announcementRepo.preload({
      id,
      ...updateAnnouncementDto,
    });

    if (!announcement) {
      throw new BadRequestException("Bunday announcement mavjud emas");
    }
    return this.announcementRepo.save(announcement);
  }

  async remove(id: number) {
    const announcement = await this.findOne(id);
    if (announcement) {
      throw new BadRequestException("Bunday announcement mavjud emas");
    }
    this.announcementRepo.delete(id);
    return {
      message: `${id} ID li announcement o'chirildi`,
    };
  }
}
