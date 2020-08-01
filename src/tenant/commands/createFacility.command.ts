import { IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { Command } from './command';

class Facility {
  @IsNotEmpty()
  @IsString()
  readonly address;

  readonly floors: string[];
}

export class CreateFacilityCommand extends Command {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Facility)
  readonly data: Facility;
}
