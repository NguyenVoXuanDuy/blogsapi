import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { UpdateBlogDto } from './updateblog.dto';
import { CreateBlogDto } from './createblog.dto';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @Get()
  getBlogs(@Query('author') author: string) {
    if (author) {
      return this.blogsService.getBlogsByAuthor(author);
    } else {
      return this.blogsService.getBlogs();
    }
  }
  @Get(':id')
  getBlogsById(@Param('id') id: number) {
    try {
      return this.blogsService.getBlogById(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
  @Post('create')
  createData(@Body() data: CreateBlogDto) {
    try {
      return this.blogsService.createBlog(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
  @Put(':id')
  updateBlog(@Param('id') id: number, @Body() data: UpdateBlogDto) {
    try {
      return this.blogsService.updateBlog(+id, data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
  @Delete(':id')
  deleteBlog(@Param('id') id: number) {
    try {
      return this.blogsService.deleteBlog(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
