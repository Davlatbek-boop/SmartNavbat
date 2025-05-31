import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Branch } from "./entities/branch.entity";
import { Repository } from "typeorm";

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>
  ) {}
  async create(createBranchDto: CreateBranchDto) {
    const branch = await this.findByEmail(createBranchDto.email)
    if(branch){
      throw new BadRequestException("Bunday emailli branch mavjud")
    }
    return this.branchRepo.save(createBranchDto);
  }

  findAll() {
    return this.branchRepo.find({relations: ["staffs"]});
  }

  findOne(id: number) {
    return this.branchRepo.findOneBy({ id });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.branchRepo.preload({id, ...updateBranchDto})
    if (!branch) {
      throw new BadRequestException("Bunday branch topilmadi");
    }
    return this.branchRepo.save(branch)
  }

  async remove(id: number) {
    const branch = await this.findOne(id)
    if (!branch) {
      throw new BadRequestException("Bunday branch topilmadi");
    }
    this.branchRepo.delete(id)
    return {
      message: `${id} li branch o'chirildi`
    }
  }

  findByEmail(email: string){
    return this.branchRepo.findOneBy({email})
  }
}
