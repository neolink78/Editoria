"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Project_1;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const codeSnippet_1 = __importDefault(require("../codeSnippet/codeSnippet"));
const user_1 = __importDefault(require("../user/user"));
let Project = Project_1 = class Project extends typeorm_1.BaseEntity {
    constructor(project) {
        super();
        if (project) {
            this.title = project.title;
            this.is_public = project.is_public;
            this.owner = project.owner;
        }
    }
    static async createProject(project) {
        const newProject = new Project_1(project);
        return await Project_1.save(newProject);
    }
    static async getProject() {
        return await Project_1.find();
    }
    static async getProjectById(id) {
        const project = await Project_1.findOne({ where: { id } });
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    }
    static async deleteProject(id) {
        const project = await Project_1.getProjectById(id);
        await Project_1.delete(id);
        return project;
    }
    static async updateProject(id, partialProject) {
        const project = await Project_1.getProjectById(id);
        Object.assign(project, partialProject, { updatedAt: new Date() });
        if (partialProject.collaboratorIds) {
            project.collaborators = await Promise.all(partialProject.collaboratorIds.map(user_1.default.getUserById));
        }
        await project.save();
        project.reload();
        return project;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Project.prototype, "is_public", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => codeSnippet_1.default, (codeSnippet) => codeSnippet.project),
    __metadata("design:type", Array)
], Project.prototype, "codeSnippetsOwned", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default, (user) => user.projectsOwned, { eager: true }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", user_1.default)
], Project.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_1.default, (collaborators) => collaborators.projects),
    __metadata("design:type", Array)
], Project.prototype, "collaborators", void 0);
Project = Project_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], Project);
exports.default = Project;
