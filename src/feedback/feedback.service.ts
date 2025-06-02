import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(@InjectRepository(Feedback) private readonly feedbackRepo: Repository<Feedback>){}
  create(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackRepo.save(createFeedbackDto)
  }

  findAll() {
    return this.feedbackRepo.find()
  }

  findOne(id: number) {
    return this.feedbackRepo.findOneBy({id})
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.feedbackRepo.preload({id, ...updateFeedbackDto})
    if(!feedback){
      throw new BadRequestException("Bunday id li feedback mavjud emas")
    }
    return this.feedbackRepo.save(feedback)
  }

  remove(id: number) {
    return this.feedbackRepo.delete(id)
  }
}
