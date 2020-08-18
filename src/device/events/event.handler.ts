import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { DeviceService } from '../device.service';
import { DeviceEvent } from './event';

@Injectable()
export class EventHandler {
  constructor(private deviceService: DeviceService) {}

  async handleEvent(event: DeviceEvent): Promise<any> {
    switch (event.action) {
      case 'FraunhoferDeviceCreated': {
        return this.handleFraunhoferDeviceCreatedEvent(event as DeviceEvent);
      }
      case 'FraunhoferDeviceUpdated': {
        return this.handleFraunhoferDeviceUpdatedEvent(event as DeviceEvent);
      }

      default:
        throw new RpcException(`Unsupported event action: ${event.action}`);
    }
  }

  private async handleFraunhoferDeviceCreatedEvent(
    event: DeviceEvent,
  ): Promise<any> {
    return this.deviceService.enrollFraunhoferDevice(event);
  }

  private async handleFraunhoferDeviceUpdatedEvent(
    event: DeviceEvent,
  ): Promise<any> {
    return this.deviceService.updateFraunhoferDevice(event);
  }
}
