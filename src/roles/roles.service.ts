import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>){}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepo.findOneBy({name: createRoleDto.name})
    if(role){
      throw new BadRequestException("Bunday role mavjud")
    }
    return this.roleRepo.save(createRoleDto)
  }

  findAll() {
    return this.roleRepo.find({relations:['staffs']})
  }

  findOne(id: number) {
    return this.roleRepo.findOneBy({id})
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepo.preload({id, ...updateRoleDto})
    if(!role){
      throw new BadRequestException("Yo'q role ni o'zgartirolmaysiz")
    }
    return this.roleRepo.save(role)
  }

  async remove(id: number) {
    const role = await this.findOne(id)
    if(!role){
      throw new BadRequestException("Yo'q role ni o'chirolmaysiz")
    }
    this.roleRepo.delete(id)
    return {
      message: `${id} ID li role o'chirildi`
    }
  }
}
