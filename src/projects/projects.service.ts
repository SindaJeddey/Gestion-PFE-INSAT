import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "./model/project.model";
import { NewProjectDto } from "./model/dto/new-project.dto";
import { StudentsService } from "../students/students.service";
import { ProfessorsService } from "../professors/professors.service";
import { UpdatedProjectDto } from "./model/dto/updated-project.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private projectModel: Model<Project>,
    private studentsService: StudentsService,
    private professorsService: ProfessorsService,
  ) {}

  //We'll be extracting the student from the decorator when sending the jwt token and removing its email from the dto
  async addProject(newProject: NewProjectDto): Promise<Project> {
    const student = await this.studentsService.getStudent(newProject.student);

    const projects = await this.projectModel.find({ student: student }).exec();
    if (projects.length !== 0) {
      throw new ConflictException('Student already has an existing project');
    }

    const supervisor = await this.professorsService.getProfessor(
      newProject.supervisor,
    );
    if (!newProject.tags) newProject.tags = [student.field];
    const project = new this.projectModel({
      ...newProject,
      student,
      supervisor,
    });
    return await project.save();
  }

  async getStudentProject(email: string): Promise<Project> {
    const student = await this.studentsService.getStudent(email);
    const project = await this.projectModel
      .findOne({ student: student })
      .exec();
    if (!project)
      throw new NotFoundException("Student doesn't have a project yet");
    return project;
  }

  async updateProject(
    email: string,
    updates: UpdatedProjectDto,
  ): Promise<Project> {
    const student = await this.studentsService.getStudent(email);
    return this.projectModel.findOneAndUpdate(
      { student },
      { ...updates },
      { new: true },
    );
  }
}
