import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export type TaskStatus = 'todo' | 'doing' | 'completed';
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';

export const TASK_STATUSES: TaskStatus[] = ['todo', 'doing', 'completed'];
export const TASK_PRIORITIES: TaskPriority[] = [
  'urgent',
  'high',
  'medium',
  'low',
];

@Schema()
export class Subtask {
  @Prop({ default: '' })
  id: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: false })
  done: boolean;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);

@Schema()
export class ActivityEntry {
  @Prop({ default: '' })
  id: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  authorInitials: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  createdAt: string;
}

export const ActivityEntrySchema = SchemaFactory.createForClass(ActivityEntry);

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, trim: true, maxlength: 200 })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, enum: TASK_STATUSES, default: 'todo' })
  status: TaskStatus;

  @Prop({ required: true, enum: TASK_PRIORITIES, default: 'medium' })
  priority: TaskPriority;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: '' })
  startDate: string;

  @Prop({ default: '' })
  dueDate: string;

  @Prop({ default: '' })
  assignee: string;

  @Prop({ default: '' })
  assigneeInitials: string;

  @Prop({ type: [SubtaskSchema], default: [] })
  subtasks: Subtask[];

  @Prop({ type: [ActivityEntrySchema], default: [] })
  activity: ActivityEntry[];

  @Prop({ default: 0 })
  order: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
