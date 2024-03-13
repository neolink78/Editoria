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
exports.SignInUser = exports.CreateOrUpdateUser = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
let CreateOrUpdateUser = class CreateOrUpdateUser {
};
exports.CreateOrUpdateUser = CreateOrUpdateUser;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateOrUpdateUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrUpdateUser.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(12),
    __metadata("design:type", String)
], CreateOrUpdateUser.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateOrUpdateUser.prototype, "description", void 0);
exports.CreateOrUpdateUser = CreateOrUpdateUser = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateOrUpdateUser);
let SignInUser = class SignInUser {
};
exports.SignInUser = SignInUser;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignInUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SignInUser.prototype, "password", void 0);
exports.SignInUser = SignInUser = __decorate([
    (0, type_graphql_1.ArgsType)()
], SignInUser);
