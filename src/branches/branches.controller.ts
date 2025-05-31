import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BranchesService } from "./branches.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Filiallar") // Swagger'da grup nomi
@Controller("branches")
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi filial yaratish" })
  @ApiResponse({ status: 201, description: "Filial muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi" })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha filiallarni olish" })
  @ApiResponse({ status: 200, description: "Filiallar ro‘yxati qaytarildi" })
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta filialni olish" })
  @ApiParam({ name: "id", description: "Filial ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Topilgan filial" })
  @ApiResponse({ status: 404, description: "Filial topilmadi" })
  findOne(@Param("id") id: string) {
    return this.branchesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Filialni yangilash" })
  @ApiParam({ name: "id", description: "Filial ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Filial muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Filial topilmadi" })
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Filialni o‘chirish" })
  @ApiParam({ name: "id", description: "Filial ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Filial muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Filial topilmadi" })
  remove(@Param("id") id: string) {
    return this.branchesService.remove(+id);
  }
}
