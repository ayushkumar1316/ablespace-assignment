import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async findAll(): Promise<ProjectDocument[]> {
    return this.projectModel.find().sort({ order: 1, createdAt: 1 }).exec();
  }

  async findOne(id: string): Promise<ProjectDocument> {
    const project = await this.findByIdSafe(id);
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return project;
  }

  async create(dto: CreateProjectDto): Promise<ProjectDocument> {
    const count = await this.projectModel.countDocuments();
    return this.projectModel.create({ ...dto, order: count });
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectDocument> {
    const project = await this.findByIdSafe(id);
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    project.set(dto);
    return project.save();
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const project = await this.findByIdSafe(id);
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    await this.projectModel.deleteOne({ _id: project._id }).exec();
    return { deleted: true };
  }

  private async findByIdSafe(id: string): Promise<ProjectDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.projectModel.findById(id).exec();
  }
}
