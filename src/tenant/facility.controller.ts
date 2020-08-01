import {
  Controller,
  Get,
  Param,
  Inject,
  UseGuards,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ClientKafka } from '@nestjs/microservices';

import { MongoPipe } from '../pipe/mongoid.pipe';
import { KafkaTopic } from '../kafka/kafkaTopic.decorator';
import { Cmd } from '../kafka/command.decorator';
import { Roles } from '../auth/auth.decorator';
import { RoleGuard } from '../auth/auth.guard';
import { ExceptionFilter } from '../kafka/kafka.exception.filter';
import { Command } from './commands/command';
import { Event } from './events/event';
import { Config } from '../config/config.interface';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';
import { Evt } from '../kafka/event.decorator';
import { Facility } from './facility.schema';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/createFacility.dto';

@Controller('facility')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class FacilityController {
  constructor(
    private eventHandler: EventHandler,
    private facilityService: FacilityService,
  ) {}

  @Roles('Read')
  @Get('')
  async getAll(): Promise<Facility[]> {
    return this.facilityService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id', new MongoPipe()) id: string) {
    return this.facilityService.findOne(id);
  }

  @KafkaTopic('facility-event') async onStudentEvent(
    @Evt() event: Event,
  ): Promise<void> {
    await this.eventHandler.handleEvent(event);
    return;
  }
}
