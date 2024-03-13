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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const user_args_1 = require("./user.args");
const codeSnippet_1 = __importDefault(require("../codeSnippet/codeSnippet"));
const userSession_1 = __importDefault(require("./userSession"));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
(0, type_graphql_1.registerEnumType)(Role, {
    name: "Role",
});
let User = User_1 = class User extends typeorm_1.BaseEntity {
    constructor(user) {
        super();
        if (user) {
            this.email = user.email;
            this.username = user.username;
            this.hashedPassword = user.password;
            this.description = user.description || "";
        }
    }
    static async saveNewUser(userData) {
        userData.password = await (0, bcrypt_1.hash)(userData.password, 10);
        const newUser = new User_1(userData);
        // TODO: return user-friendly error message when email already used
        const savedUser = await newUser.save();
        return savedUser;
    }
    static async getUsers() {
        const users = await User_1.find();
        return users;
    }
    static async getUserById(id) {
        const user = await User_1.findOne({ where: { id } });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        return user;
    }
    static async updateUser(id, userData) {
        const user = await User_1.getUserById(id);
        if (userData.password && userData.password !== user.hashedPassword) {
            userData.password = await (0, bcrypt_1.hash)(userData.password, 10);
        }
        user.hashedPassword = userData.password;
        console.log(user);
        Object.assign(user, userData);
        await user.save();
        user.reload();
        return user;
    }
    static async deleteUser(id) {
        const user = await User_1.getUserById(id);
        await User_1.delete(id);
        return user;
    }
    static async getUserWithEmailAndPassword({ email, password, }) {
        const user = await User_1.findOne({ where: { email } });
        if (!user || !(await (0, bcrypt_1.compare)(password, user.hashedPassword))) {
            throw new Error("INVALID_CREDENTIALS");
        }
        return user;
    }
    static async signIn({ email, password, }) {
        const user = await this.getUserWithEmailAndPassword({ email, password });
        const session = await userSession_1.default.saveNewSession(user);
        return { user, session };
    }
    static async getUserWithSessionId(sessionId) {
        const session = await userSession_1.default.findOne({
            where: { id: sessionId },
            relations: { user: true },
        });
        if (!session) {
            return null;
        }
        return session.user;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "hashedPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Role.USER }),
    (0, type_graphql_1.Field)(() => Role),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], User.prototype, "isPremium", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => codeSnippet_1.default, (codeSnippet) => codeSnippet.owner),
    __metadata("design:type", Array)
], User.prototype, "codeSnippetsOwned", void 0);
__decorate([
    (0, typeorm_1.JoinTable)({ name: "user_code" }),
    (0, typeorm_1.ManyToMany)(() => codeSnippet_1.default, (code) => code.collaborators),
    (0, type_graphql_1.Field)(() => [codeSnippet_1.default]),
    __metadata("design:type", Array)
], User.prototype, "codeSnippets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userSession_1.default, (session) => session.user),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)("AppUser"),
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [user_args_1.CreateOrUpdateUser])
], User);
exports.default = User;
