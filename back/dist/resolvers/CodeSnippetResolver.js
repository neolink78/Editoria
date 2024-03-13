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
exports.CodeSnippetResolver = void 0;
const type_graphql_1 = require("type-graphql");
const codeSnippet_1 = __importDefault(require("../entities/codeSnippet/codeSnippet"));
const codeSnippet_args_1 = require("../entities/codeSnippet/codeSnippet.args");
let CodeSnippetResolver = class CodeSnippetResolver {
    createCodeSnippet(args, { user }) {
        return codeSnippet_1.default.createCodeSnippet({ ...args, owner: user });
    }
    codeSnippets() {
        return codeSnippet_1.default.getCodeSnippet();
    }
    codeSnippet(id) {
        return codeSnippet_1.default.getCodeSnippetById(id);
    }
    async deleteCodeSnippet(id) {
        return codeSnippet_1.default.deleteCodeSnippet(id);
    }
    updateCodeSnippet(id, args) {
        return codeSnippet_1.default.updateCodeSnippet(id, args);
    }
};
exports.CodeSnippetResolver = CodeSnippetResolver;
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => codeSnippet_1.default),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [codeSnippet_args_1.CreateOrUpdateCodeSnippetArgs, Object]),
    __metadata("design:returntype", void 0)
], CodeSnippetResolver.prototype, "createCodeSnippet", null);
__decorate([
    (0, type_graphql_1.Query)(() => [codeSnippet_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CodeSnippetResolver.prototype, "codeSnippets", null);
__decorate([
    (0, type_graphql_1.Query)(() => codeSnippet_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CodeSnippetResolver.prototype, "codeSnippet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => codeSnippet_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CodeSnippetResolver.prototype, "deleteCodeSnippet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => codeSnippet_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, codeSnippet_args_1.CreateOrUpdateCodeSnippetArgs]),
    __metadata("design:returntype", void 0)
], CodeSnippetResolver.prototype, "updateCodeSnippet", null);
exports.CodeSnippetResolver = CodeSnippetResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CodeSnippetResolver);
