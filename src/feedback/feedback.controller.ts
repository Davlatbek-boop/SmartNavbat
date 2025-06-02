import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Feedback") // Swagger guruh nomi
@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: "Yangi feedback yaratish" })
  @ApiResponse({ status: 201, description: "Feedback yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz maʼlumotlar" })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha feedbacklarni olish" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli" })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha feedbackni olish" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Feedback ID",
  })
  @ApiResponse({ status: 200, description: "Topildi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Feedbackni yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Feedback ID",
  })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto
  ) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Feedbackni o‘chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Feedback ID",
  })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  remove(@Param("id") id: string) {
    return this.feedbackService.remove(+id);
  }
}
