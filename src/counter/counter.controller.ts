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
import { CounterService } from "./counter.service";
import { CreateCounterDto } from "./dto/create-counter.dto";
import { UpdateCounterDto } from "./dto/update-counter.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiBearerAuth()
@UseGuards(AdminGuard)
@UseGuards(AuthGuard)
@ApiTags("Counter")
@Controller("counter")
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Post()
  @ApiOperation({
    summary: "Yangi counter yaratish",
    description: "adminlar ruxsati bor",
  })
  @ApiResponse({ status: 201, description: "Counter muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz maʼlumot" })
  create(@Body() createCounterDto: CreateCounterDto) {
    return this.counterService.create(createCounterDto);
  }

  @Get()
  @ApiOperation({
    summary: "Barcha counterlarni olish",
    description: "adminlar ruxsati bor",
  })
  @ApiResponse({ status: 200, description: "Counterlar roʻyxati" })
  findAll() {
    return this.counterService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "ID orqali bitta counterni olish",
    description: "adminlar ruxsati bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Counter ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan counter" })
  @ApiResponse({ status: 404, description: "Counter topilmadi" })
  findOne(@Param("id") id: string) {
    return this.counterService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Counterni yangilash",
    description: "adminlar ruxsati bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Counter ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Counter muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Counter topilmadi" })
  update(@Param("id") id: string, @Body() updateCounterDto: UpdateCounterDto) {
    return this.counterService.update(+id, updateCounterDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Counterni o‘chirish",
    description: "adminlar ruxsati bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Counter ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Counter muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Counter topilmadi" })
  remove(@Param("id") id: string) {
    return this.counterService.remove(+id);
  }
}
