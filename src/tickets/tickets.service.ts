import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { Between, Repository } from "typeorm";
import { ServicesService } from "../services/services.service";
import { BranchesService } from "../branches/branches.service";
import { ClientsService } from "../clients/clients.service";
import { MailService } from "../mail/mail.service";

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private readonly ticketRepo: Repository<Ticket>,
    private readonly serviceService: ServicesService,
    private readonly branchService: BranchesService,
    private readonly clientServie: ClientsService,
    private readonly MailService: MailService
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const client = await this.clientServie.findOne(createTicketDto.clientId);

    if (!client) {
      throw new BadRequestException("Bunday client mavjud emas");
    }

    const service = await this.serviceService.findOne(
      createTicketDto.serviceId
    );

    if (!service) {
      throw new BadRequestException("Bunday service mavjud emas");
    }

    const branch = await this.branchService.findOne(createTicketDto.branchId);

    if (!branch) {
      throw new BadRequestException("Bunday branch mavjud emas");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // 00:00:00.000

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // 23:59:59.999

    const oldTicket = await this.ticketRepo.findOne({
      where: {
        serviceId: service.id,
        branchId: branch.id,
        createdAt: Between(startOfDay, endOfDay),
      },
      order: { ticketNumber: "DESC" },
    });

    let navbat: number;
    if (!oldTicket) {
      navbat = 1;
    } else {
      navbat = oldTicket.ticketNumber + 1;
    }

    const newTicket = await this.ticketRepo.save({
      ...createTicketDto,
      ticketNumber: navbat,
      ticketCode: `${branch.code}-${service.code}`,
      issuedAt: new Date(),
      client,
      service,
      branch,
    });

  const info = {
      Navbat: newTicket.ticketNumber,
      Filial: branch.name,
      Xizmat: service.description,
    }

    try {
      this.MailService.sendMailNewTicket(info, client.email)
    } catch (error) {
      console.log(error);
    }

    return info
  }

  findAll() {
    return this.ticketRepo.find();
  }

  findOne(id: number) {
    return this.ticketRepo.findOneBy({ id });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepo.preload({ id, ...updateTicketDto });
    if (!ticket) {
      throw new BadRequestException("Bunday navbat mavjud emas");
    }
    return this.ticketRepo.save(ticket);
  }

  async remove(id: number) {
    const ticket = await this.findOne(id);
    if (!ticket) {
      throw new BadRequestException("Bunday navbat mavjud emas");
    }
    this.ticketRepo.delete(id);
    return {
      message: `${id} ID li navbat o'chirildi`,
    };
  }
}
