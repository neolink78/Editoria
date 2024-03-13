"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = void 0;
const typeorm_1 = require("typeorm");
const userSession_1 = __importDefault(require("./entities/user/userSession"));
const user_1 = __importDefault(require("./entities/user/user"));
const codeSnippet_1 = __importDefault(require("./entities/codeSnippet/codeSnippet"));
let dataSource;
const getDataSource = async () => {
    if (!dataSource) {
        dataSource = new typeorm_1.DataSource({
            type: "postgres",
            url: process.env.NODE_ENV === "test"
                ? process.env.TEST_DATABASE_URL
                : process.env.DATABASE_URL,
            entities: [codeSnippet_1.default, user_1.default, userSession_1.default],
            synchronize: true,
        });
        await dataSource.initialize();
    }
    return dataSource;
};
exports.getDataSource = getDataSource;
