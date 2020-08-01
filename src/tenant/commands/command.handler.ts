import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Command } from './command';
import { CreateFacilityCommand } from './createFacility.command';

@Injectable()
export class CommandHandler {
  constructor(private facilityService: FacilityService) {}

  async handler(command: Command): Promise<Facility> {
    switch (command.action) {
      case 'CreateFacility':
        return this.handleCreateFacilityCommand(
          command as CreateFacilityCommand,
        );
      default:
        throw new RpcException(`Unsupported command action: ${command.action}`);
    }
  }

  private async handleCreateFacilityCommand(command: CreateFacilityCommand) {
    return null;
    //return this.facilityService.createOne(command.data);
  }
}
