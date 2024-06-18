import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource, ResourceDocument } from './entities/resource.entity';
import { Model } from 'mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceQueryDto, SearchQueryDto } from 'base';
import { paginate } from 'utils';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name)
    private readonly resourceModel: Model<ResourceDocument>,
  ) {}
  create(input: CreateResourceDto, user: string) {
    const newResource = new this.resourceModel({ ...input, user });
    return newResource.save();
  }

  async findAll(query: ResourceQueryDto) {
    const { limit, page } = query;
    const skip = (page - 1) * limit || 0;

    const condition = {
      isDeleted: false,
    };

    const appService = await this.resourceModel
      .find(condition)
      .skip(skip)
      .limit(limit)
      .populate({ path: 'user', select: '-password' })
      .sort({ createdAt: -1 })
      .exec();

    const totalItems = await this.resourceModel.countDocuments(condition);

    return paginate({
      data: appService,
      totalItems,
      page: page,
      limit: limit,
    });
  }

  async findOne(id: string) {
    const resourceDetail = await this.resourceModel
      .findById(id)
      .populate({ path: 'user', select: '-password' })
      .exec();
    if (!resourceDetail) {
      throw new HttpException(
        `Cannot find resource with ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return resourceDetail;
  }

  async searchResources(searchQuery: SearchQueryDto) {
    const { query } = searchQuery;
    const result = await this.resourceModel
      .aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: new RegExp(query, 'i') } },
              { content: { $regex: new RegExp(query, 'i') } },
            ],
          },
        },
      ])
      .exec();

    return result;
  }
}
