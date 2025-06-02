import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTicketStatusLogDto } from "./dto/create-ticket-status-log.dto";
import { UpdateTicketStatusLogDto } from "./dto/update-ticket-status-log.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketStatusLog } from "./entities/ticket-status-log.entity";
import { Repository } from "typeorm";
import { StaffService } from "../staff/staff.service";
import { TicketsService } from "../tickets/tickets.service";

@Injectable()
export class TicketStatusLogService {
  constructor(
    @InjectRepository(TicketStatusLog)
    private readonly ticketStatusLogRepo: Repository<TicketStatusLog>,
    private readonly staffService: StaffService,
    private readonly ticketService: TicketsService
  ) {}
  async create(createTicketStatusLogDto: CreateTicketStatusLogDto) {
    const staff = await this.staffService.findOne(
      createTicketStatusLogDto.staff_id
    );

    if (!staff) {
      throw new BadRequestException("Bunday Staff mavjud emas");
    }

    const ticket = await this.ticketService.findOne(
      createTicketStatusLogDto.ticket_id
    );

    if (!ticket) {
      throw new BadRequestException("Bunday ticket mavjud emas");
    }

    return this.ticketStatusLogRepo.save(createTicketStatusLogDto);
  }

  findAll() {
    return this.ticketStatusLogRepo.find();
  }

  findOne(id: number) {
    return this.ticketStatusLogRepo.findOneBy({ id });
  }

  async update(id: number, updateTicketStatusLogDto: UpdateTicketStatusLogDto) {
    const ticketStatusLog = await this.ticketStatusLogRepo.preload({
      id,
      ...updateTicketStatusLogDto,
    });
    if (!ticketStatusLog) {
      throw new BadRequestException(
        "Bunday id li ticket status log mavjud emas"
      );
    }

    return this.ticketStatusLogRepo.save(ticketStatusLog);
  }

  remove(id: number) {
    return this.ticketStatusLogRepo.delete(id);
  }
}
