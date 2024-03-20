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
var UserSession_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
const user_1 = __importDefault(require("./user"));
let UserSession = UserSession_1 = class UserSession extends typeorm_1.BaseEntity {
    constructor(user) {
        super();
        if (user) {
            this.id = (0, crypto_1.randomBytes)(16).toString("hex");
            this.user = user;
        }
    }
    static async saveNewSession(user) {
        const newSession = new UserSession_1(user);
        const savedSession = await newSession.save();
        return savedSession;
    }
    static async deleteSession(userSessionId) {
        await UserSession_1.delete({ id: userSessionId });
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 32 }),
    __metadata("design:type", String)
], UserSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default, (user) => user.sessions),
    __metadata("design:type", user_1.default)
], UserSession.prototype, "user", void 0);
UserSession = UserSession_1 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [user_1.default])
], UserSession);
exports.default = UserSession;
