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
import { Event } from './events/event';
import { EventHandler } from './events/event.handler';
import { Evt } from '../kafka/event.decorator';

@Controller('facility')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class FacilityController {
  constructor(private eventHandler: EventHandler) {}

  @Get()
  test() {
    return 'hallo';
  }

  @KafkaTopic('facility-event') async onStudentEvent(
    @Evt() event: Event,
  ): Promise<void> {
    console.log('NEUES EVENt +++++++++++++++++++++++++++');
    await this.eventHandler.handleEvent(event);
    return;
  }
}
