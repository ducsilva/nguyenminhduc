import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'multer';
import { Role, Roles } from 'config/role';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CloudinaryMulterConfigService } from 'middleware/cloudinary.middleware.service';
import { CurrentUser } from 'common/decorations';
import { SearchQueryDto } from 'base/query/search.query';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceQueryDto } from 'base';

@ApiBearerAuth()
@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly cloudaryService: CloudinaryMulterConfigService,
  ) {}

  @Roles(Role.USER)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'User create resource',
  })
  @UseInterceptors(FileInterceptor('banner'))
  async create(
    @Body() createResourceDto: CreateResourceDto,
    @UploadedFile() banner: File,
    @CurrentUser() userId: string,
  ) {
    try {
      if (!userId) {
        return new HttpException(
          'Failed to create resource',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { title, content } = createResourceDto;
      const fileData = banner?.buffer?.toString('base64');

      const bannerUrl = await this.cloudaryService.uploadToCloudinary(
        `data:${banner.mimetype};base64,${fileData}`,
      );
      return this.resourcesService.create(
        {
          title,
          content,
          banner: bannerUrl,
        },
        userId,
      );
    } catch (error) {
      return new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/query')
  @ApiOperation({
    summary: 'Search resource by content',
  })
  async queryByContent(@Query() query: SearchQueryDto) {
    return await this.resourcesService.searchResources(query);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all resources',
  })
  async getAllResource(@Query() query: ResourceQueryDto) {
    return await this.resourcesService.findAll(query);
  }

  @Roles(Role.USER)
  @Get(':id')
  @ApiOperation({
    summary: 'Get detail resource',
  })
  async getResourceDetail(@Param('id') id: string) {
    return await this.resourcesService.findOne(id);
  }
}
