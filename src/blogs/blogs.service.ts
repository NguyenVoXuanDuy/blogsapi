import { Injectable } from '@nestjs/common';
import { UpdateBlogDto } from './updateblog.dto';
import { CreateBlogDto } from './createblog.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
@Injectable()
export class BlogsService {
  count = 3;
  blogs: { id: number; author: string }[] = [
    { id: 0, author: 'Duy' },
    { id: 1, author: 'Huy' },
    { id: 2, author: 'Conmemay' },
  ];
  getBlogs() {
    return this.blogs;
  }
  getBlogById(id: number) {
    const requiredBlog = this.blogs.find((blog) => blog.id === id);
    if (!requiredBlog) throw new Error('Id not found!');
    return requiredBlog;
  }
  getBlogsByAuthor(author: string) {
    const requiredBlogs = this.blogs.filter((blog) => blog.author === author);
    return requiredBlogs;
  }
  createBlog(data: CreateBlogDto) {
    if (!data.author) {
      throw new Error('Author not found!');
    }
    const newBlog = {
      id: this.count,
      author: data.author,
    };
    this.count++;
    this.blogs = [...this.blogs, newBlog];
    return newBlog;
  }

  updateBlog(id: number, data: UpdateBlogDto) {
    const found = this.blogs.find((obj) => obj.id === id);
    if (!found) throw new Error('Id not found');
    var newblogs = this.blogs.map((obj) => {
      if (obj.id === id) {
        return {
          id: data.id,
          author: data.author,
        };
      } else {
        return obj;
      }
    });
    this.blogs = newblogs;
    return this.blogs;
  }
  deleteBlog(id: number) {
    var newBlogs = this.blogs.filter((obj) => obj.id !== id);
    if (this.blogs.length == newBlogs.length) throw new Error('Id not found');
    this.blogs = newBlogs;
    return this.blogs;
  }
}
