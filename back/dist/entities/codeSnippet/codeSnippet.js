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
var CodeSnippet_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const codeSnippet_args_1 = require("./codeSnippet.args");
// import { User } from './User';
// import { Comment } from './Comment';
// import { Like } from './Like';
var Language;
(function (Language) {
    Language["JAVASCRIPT"] = "JAVASCRIPT";
    Language["TYPESCRIPT"] = "TYPESCRIPT";
    Language["PYTHON"] = "PYTHON";
    Language["JAVA"] = "JAVA";
    Language["C"] = "C";
    Language["CPP"] = "C++";
    Language["CSHARP"] = "C#";
})(Language || (exports.Language = Language = {}));
let CodeSnippet = CodeSnippet_1 = class CodeSnippet extends typeorm_1.BaseEntity {
    constructor(codeSnippet) {
        super();
        if (codeSnippet) {
            this.title = codeSnippet.title;
            this.code = codeSnippet.code;
            this.is_public = codeSnippet.is_public;
            this.language = codeSnippet.language;
        }
    }
    static async createCodeSnippet(codeSnippet) {
        const newCodeSnippet = new CodeSnippet_1(codeSnippet);
        if (newCodeSnippet.code.length === 0) {
            throw new Error('Code snippet cannot be empty');
        }
        return await CodeSnippet_1.save(newCodeSnippet);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], CodeSnippet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CodeSnippet.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CodeSnippet.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CodeSnippet.prototype, "is_public", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CodeSnippet.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CodeSnippet.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Language.JAVASCRIPT }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CodeSnippet.prototype, "language", void 0);
CodeSnippet = CodeSnippet_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [codeSnippet_args_1.CreateOrUpdateCodeSnippetArgs])
], CodeSnippet);
exports.default = CodeSnippet;
