import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Facility } from './facility.schema';
import { FloorEnrolledEvent } from './events/floorEnrolled.event';
import { of } from 'rxjs';
import { FacilityEnrolledEvent } from './events/facilityEnrolled.event';
import { RoomEnrolledEvent } from './events/roomEnrolled.event';
import { FlatEnrolledEvent } from './events/flatEnrolled.event';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel('Facilities') private facilityModel: Model<Facility>,
  ) {}

  async findAll(): Promise<Facility[]> {
    return this.facilityModel.find().exec();
  }

  async findOne(id: string): Promise<Facility> {
    return this.facilityModel.findById(id).exec();
  }

  enrolFlat(event: FlatEnrolledEvent): Facility | PromiseLike<Facility> {
    throw new Error('Method not implemented.');
  }
  enrollRoom(event: RoomEnrolledEvent): Facility | PromiseLike<Facility> {
    throw new Error('Method not implemented.');
  }
  enrollFloor(event: FloorEnrolledEvent): Facility | PromiseLike<Facility> {
    throw new Error('Method not implemented.');
  }
  enrollFacility(
    event: FacilityEnrolledEvent,
  ): Facility | PromiseLike<Facility> {
    return this.facilityModel.create(event.data);
    throw new Error('Method not implemented.');
  }

  async enroll(event: FloorEnrolledEvent): Promise<Facility> {
    const facility = await this.findOne(event.data.facilityId);

    this.facilityModel
      .findByIdAndUpdate(
        { _id: event.data.facilityId },
        { floors: [...facility.floors, event.data._id] },
      )
      .exec();

    return of(facility).toPromise();
  }
}
