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
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";

@ApiBearerAuth()
@ApiTags("Feedback")
@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Roles("client")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi feedback yaratish", description: 'clientlar huquqi bor' })
  @ApiResponse({ status: 201, description: "Feedback yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz maʼlumotlar" })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha feedbacklarni olish" , description: 'tokeni bori huquqi' })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli" })
  findAll() {
    return this.feedbackService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha feedbackni olish" ,description: 'tokeni bori huquqi bor'})
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

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Feedbackni yangilash", description: 'admin huquqi' })
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



  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Feedbackni o‘chirish", description: 'admin huquqi bor' })
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
