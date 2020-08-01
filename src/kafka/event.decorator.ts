import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { FloorEnrolledEvent } from '../facility/events/floorEnrolled.event';
import { Event } from '../facility/events/event';
import { FlatEnrolledEvent } from 'src/facility/events/flatEnrolled.event';
import { RoomEnrolledEvent } from 'src/facility/events/roomEnrolled.event';

export const Evt = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<Event> => {
    const ctxData = ctx.switchToRpc().getData();
    const value = ctxData.value;

    if (
      !ctxData ||
      !ctxData.value ||
      !ctxData.topic ||
      !value.type ||
      !value.action ||
      value.type != 'event'
    ) {
      throw new RpcException('Invalid kafka event message');
    }

    let event: Event;

    switch (value.action) {
      case 'FloorEnrolled':
        event = plainToClass(FloorEnrolledEvent, value);
        break;
      case 'FlatEnrolled':
        event = plainToClass(FlatEnrolledEvent, value);
        break;
      case 'RoomEnrolled':
        event = plainToClass(RoomEnrolledEvent, value);
        break;
      default:
        throw new RpcException(`Unknown event action: ${value.action}`);
    }

    // validate

    const errors = await validate(event);

    if (errors.length > 0) {
      throw new RpcException(errors);
    }
    return event;
  },
);
