import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

export type ProjectStatus = 'active' | 'completed';

export const PROJECT_STATUSES: ProjectStatus[] = ['active', 'completed'];

@Schema()
export class ProjectMember {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: '' })
  initials: string;
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, trim: true, maxlength: 200 })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, enum: PROJECT_STATUSES, default: 'active' })
  status: ProjectStatus;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: '' })
  dueDate: string;

  @Prop({ type: [ProjectMemberSchema], default: [] })
  members: ProjectMember[];

  @Prop({ type: [String], default: [] })
  taskIds: string[];

  @Prop({ default: 0 })
  order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
