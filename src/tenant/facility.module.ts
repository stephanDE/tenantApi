import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FacilityController } from './facility.controller';
import { FacilitySchema } from './facility.schema';
import { LoggingModule } from '../logging/logging.module';
import { FacilityService } from './facility.service';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Facilities',
        schema: FacilitySchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [FacilityController],
  providers: [FacilityService, CommandHandler, EventHandler],
})
export class FacilityModule {}
