import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FraunhoferDevice } from './device.schema';

@Injectable()
export class DeviceService {
  enrollFraunhoferDevice(event): any {
    this.fraunhoferDeviceModel.create(event.data);
  }

  async updateFraunhoferDevice(event): Promise<any> {
    const { fraunhoferFlatId, fraunhoferRoomNr } = event.data;
    return await this.fraunhoferDeviceModel
      .updateOne(
        {
          fraunhoferFlatId,
          fraunhoferRoomNr,
        },
        event.data,
      )
      .exec();
  }
  constructor(
    @InjectModel('FraunhoferDevice')
    private fraunhoferDeviceModel: Model<FraunhoferDevice>,
  ) {}

  async findAll(): Promise<FraunhoferDevice[]> {
    return this.fraunhoferDeviceModel.find().exec();
  }
}
