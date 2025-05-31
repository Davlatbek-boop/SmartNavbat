import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { ClientsService } from "../clients/clients.service";
import { MailService } from "../mail/mail.service";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly clientService: ClientsService,
    private readonly mailService: MailService
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const { clientId } = createNotificationDto;

    const client = await this.clientService.findOne(clientId)

    if(!client){
      throw new BadRequestException("Bunday ID li client mavjud emas")
    }

    const notification = this.notificationRepo.create({...createNotificationDto, client});

    try {
      await this.mailService.sendMailByNotification(notification, client)
    } catch (error) {
      console.log(error);
    }

    return this.notificationRepo.save(notification)
  }

  findAll() {
    return this.notificationRepo.find();
  }

  async findOne(id: number) {
    const notification = await this.notificationRepo.findOneBy({ id });
    if (!notification) {
      throw new BadRequestException("Bunday notification yo'q");
    }
    return notification;
  }

  async findByClientId(clientId: number){
    const notifications = await this.notificationRepo.find({where: {clientId}})
    return notifications
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.findOne(id);
    if (!notification) {
      throw new BadRequestException("Bunday notification yo'q");
    }
    return this.notificationRepo.update(id, updateNotificationDto);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    if (!notification) {
      throw new BadRequestException("Bunday notification yo'q");
    }
    return this.notificationRepo.delete(id);
  }
}
