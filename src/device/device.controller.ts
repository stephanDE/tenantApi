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
import { DeviceEvent } from './events/event';
import { Config } from '../config/config.interface';
import { EventHandler } from './events/event.handler';
import { Evt } from '../kafka/event.decorator';
import { FraunhoferDevice } from './device.schema';
import { DeviceService } from './device.service';

@Controller('device')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class DeviceController {
  constructor(
    private eventHandler: EventHandler,
    private deviceService: DeviceService,
  ) {}

  @Roles('Read')
  @Get('')
  async getAll(): Promise<FraunhoferDevice[]> {
    return this.deviceService.findAll();
  }

  @KafkaTopic('device-event') async onDeviceEvent(
    @Evt() event: DeviceEvent,
  ): Promise<void> {
    await this.eventHandler.handleEvent(event);
    return;
  }
}
