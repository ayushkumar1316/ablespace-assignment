import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../tasks/task.schema';
import { Project } from '../projects/project.schema';
import { TASKS_SEED, PROJECTS_SEED } from './seed-data';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const taskCount = await this.taskModel.estimatedDocumentCount();
    if (taskCount > 0) {
      this.logger.log(`Skipping seed — ${taskCount} tasks already present`);
      return;
    }

    const inserted = await this.taskModel.insertMany(
      TASKS_SEED.map((seed, index) => {
        const { id: _seedId, ...task } = seed;
        void _seedId;
        return { ...task, order: index };
      }),
    );

    const taskIdBySeedId = new Map<string, string>();
    inserted.forEach((doc, index) => {
      taskIdBySeedId.set(TASKS_SEED[index].id, doc._id.toString());
    });

    const projects = PROJECTS_SEED.map((seed, index) => {
      const { id: _seedId, ...project } = seed;
      void _seedId;
      return {
        ...project,
        taskIds: project.taskIds
          .map((seedTaskId) => taskIdBySeedId.get(seedTaskId))
          .filter((taskId): taskId is string => Boolean(taskId)),
        order: index,
      };
    });

    await this.projectModel.insertMany(projects);

    this.logger.log(
      `Seeded ${inserted.length} tasks and ${projects.length} projects`,
    );
  }
}
