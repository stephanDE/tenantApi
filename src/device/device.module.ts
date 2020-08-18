import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceController } from './device.controller';
import { FraunhoferDeviceSchema } from './device.schema';
import { LoggingModule } from '../logging/logging.module';
import { DeviceService } from './device.service';
import { EventHandler } from './events/event.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'FraunhoferDevice',
        schema: FraunhoferDeviceSchema,
      },
    ]),
    LoggingModule,
  ],
  exports: [DeviceService],
  controllers: [DeviceController],
  providers: [DeviceService, EventHandler],
})
export class DeviceModule {}
