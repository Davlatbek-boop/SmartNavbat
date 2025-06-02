import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CounterService } from "./counter.service";
import { CreateCounterDto } from "./dto/create-counter.dto";
import { UpdateCounterDto } from "./dto/update-counter.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Counter")
@Controller("counter")
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Post()
  @ApiOperation({ summary: "Yangi counter yaratish" })
  @ApiResponse({ status: 201, description: "Counter muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz maʼlumot" })
  create(@Body() createCounterDto: CreateCounterDto) {
    return this.counterService.create(createCounterDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha counterlarni olish" })
  @ApiResponse({ status: 200, description: "Counterlar roʻyxati" })
  findAll() {
    return this.counterService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta counterni olish" })
  @ApiParam({ name: "id", type: Number, description: "Counter ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan counter" })
  @ApiResponse({ status: 404, description: "Counter topilmadi" })
  findOne(@Param("id") id: string) {
    return this.counterService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Counterni yangilash" })
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
  @ApiOperation({ summary: "Counterni o‘chirish" })
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
