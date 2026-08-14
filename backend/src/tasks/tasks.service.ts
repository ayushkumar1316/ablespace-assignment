import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().sort({ order: 1, createdAt: 1 }).exec();
  }

  async findOne(id: string): Promise<TaskDocument> {
    const task = await this.findByIdSafe(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  async create(dto: CreateTaskDto): Promise<TaskDocument> {
    const count = await this.taskModel.countDocuments();
    return this.taskModel.create({ ...dto, order: count });
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskDocument> {
    const task = await this.findByIdSafe(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    task.set(dto);
    return task.save();
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const task = await this.findByIdSafe(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    await this.taskModel.deleteOne({ _id: task._id }).exec();
    return { deleted: true };
  }

  private async findByIdSafe(id: string): Promise<TaskDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.taskModel.findById(id).exec();
  }
}
