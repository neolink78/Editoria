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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolver = void 0;
const type_graphql_1 = require("type-graphql");
const project_1 = __importDefault(require("../entities/project/project"));
const project_args_1 = require("../entities/project/project.args");
let ProjectResolver = class ProjectResolver {
    createProject(args, { user }) {
        return project_1.default.createProject({ ...args, owner: user });
    }
    getProjects() {
        return project_1.default.getProject();
    }
    getProjectById(id) {
        return project_1.default.getProjectById(id);
    }
    async deleteProject(id) {
        return project_1.default.deleteProject(id);
    }
    updateProject(id, args) {
        return project_1.default.updateProject(id, args);
    }
};
exports.ProjectResolver = ProjectResolver;
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => project_1.default),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_args_1.CreateOrUpdateProjectArgs, Object]),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    (0, type_graphql_1.Query)(() => [project_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "getProjects", null);
__decorate([
    (0, type_graphql_1.Query)(() => project_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "getProjectById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => project_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => project_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_args_1.CreateOrUpdateProjectArgs]),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "updateProject", null);
exports.ProjectResolver = ProjectResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProjectResolver);
