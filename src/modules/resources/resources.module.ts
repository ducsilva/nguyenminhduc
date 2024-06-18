import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './entities/resource.entity';
import { UsersModule } from 'modules/users/users.module';
import { CloudinaryMulterConfigModule } from 'middleware/CloudinaryMulterConfigModule.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Resource.name,
        schema: ResourceSchema,
      },
    ]),
    UsersModule,
    CloudinaryMulterConfigModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
