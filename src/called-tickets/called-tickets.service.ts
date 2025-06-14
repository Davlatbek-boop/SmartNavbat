import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCalledTicketDto } from "./dto/create-called-ticket.dto";
import { UpdateCalledTicketDto } from "./dto/update-called-ticket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CalledTicket } from "./entities/called-ticket.entity";
import { Repository } from "typeorm";
import { StaffService } from "../staff/staff.service";
import { TicketsService } from "../tickets/tickets.service";
import { CounterService } from "../counter/counter.service";
import { MailService } from "../mail/mail.service";
import { ClientsService } from "../clients/clients.service";

@Injectable()
export class CalledTicketsService {
  constructor(
    @InjectRepository(CalledTicket)
    private readonly calledTicketRepo: Repository<CalledTicket>,
    private readonly staffService: StaffService,
    private readonly ticketService: TicketsService,
    private readonly counterService: CounterService,
    private readonly sendMail: MailService,
    private readonly clientService: ClientsService
  ) {}
  async create(createCalledTicketDto: CreateCalledTicketDto) {
    const staff = await this.staffService.findOne(
      createCalledTicketDto.staffId
    );

    if (!staff) {
      throw new BadRequestException("Bunday staff mavjud emas");
    }

    const ticket = await this.ticketService.findOne(
      createCalledTicketDto.ticketId
    );

    if (!ticket || ticket.status != "pending") {
      throw new BadRequestException("Bunday ticket mavjud emas yoki chaqirilgan");
    }

    const counter = await this.counterService.findOne(
      createCalledTicketDto.counterId
    );

    if (!counter) {
      throw new BadRequestException("Bunday staff mavjud emas");
    }

    const now = new Date();

    const colledTicket = await this.calledTicketRepo.save({
      ...createCalledTicketDto,
      calledAt: now,
      staff,
      ticket,
      counter,
    });

    this.ticketService.update(ticket.id, { calledAt: now, status: "called"});

    const client = await this.clientService.findOne(ticket.clientId);

    if (!client) {
      throw new BadRequestException("Bu navbat olgan client mavjud emas");
    }
    
    const info = {
      counter: counter.counterNumber,
      ticketNumber: ticket.ticketNumber,
    };

    try {
      this.sendMail.sendMailComeTicket(info, client?.email);
    } catch (error) {
      console.log(error);
    }

    return {
      message: `${ticket.ticketCode} - ${ticket.ticketNumber} raqamli navbat`,
    };
  }

  findAll() {
    return this.calledTicketRepo.find();
  }

  findOne(id: number) {
    return this.calledTicketRepo.findOneBy({ id });
  }

  async update(id: number, updateCalledTicketDto: UpdateCalledTicketDto) {
    const calledTicket = await this.calledTicketRepo.preload({
      id,
      ...updateCalledTicketDto,
    });

    if (!calledTicket) {
      throw new BadRequestException("Bunday called ticket mavjud emas");
    }
    return this.calledTicketRepo.save(calledTicket);
  }

  async remove(id: number) {
    const calledTicket = await this.findOne(id);
    if (!calledTicket) {
      throw new BadRequestException("Bunday Bunday called ticket mavjud emas");
    }
    return {
      message: `${id} ID li called ticket o'chirildi`,
    };
  }
}
