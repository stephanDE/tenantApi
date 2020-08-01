import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFacilityDto {
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  readonly facilityId: string;

  readonly floors: any[];
}
