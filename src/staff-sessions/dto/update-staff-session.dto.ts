import { PartialType } from '@nestjs/swagger';
import { CreateStaffSessionDto } from './create-staff-session.dto';

export class UpdateStaffSessionDto extends PartialType(CreateStaffSessionDto) {}
