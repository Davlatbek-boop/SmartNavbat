import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { BranchesService } from "./branches.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiBearerAuth()
@Roles("branch_manager", "admin")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiTags("Branchs-Filiallar")
@Controller("branches")
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @ApiOperation({
    summary: "Yangi filial yaratish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 201, description: "Filial muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi" })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({
    summary: "Barcha filiallarni olish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Filiallar ro‘yxati qaytarildi" })
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "ID bo‘yicha bitta filialni olish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", description: "Filial ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Topilgan filial" })
  @ApiResponse({ status: 404, description: "Filial topilmadi" })
  findOne(@Param("id") id: string) {
    return this.branchesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Filialni yangilash",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", description: "Filial ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Filial muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Filial topilmadi" })
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Filialni o‘chirish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", description: "Filial ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Filial muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Filial topilmadi" })
  remove(@Param("id") id: string) {
    return this.branchesService.remove(+id);
  }
}
