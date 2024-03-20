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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrUpdateProjectArgs = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
let CreateOrUpdateProjectArgs = class CreateOrUpdateProjectArgs {
};
exports.CreateOrUpdateProjectArgs = CreateOrUpdateProjectArgs;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateOrUpdateProjectArgs.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CreateOrUpdateProjectArgs.prototype, "is_public", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateOrUpdateProjectArgs.prototype, "collaboratorIds", void 0);
exports.CreateOrUpdateProjectArgs = CreateOrUpdateProjectArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateOrUpdateProjectArgs);
