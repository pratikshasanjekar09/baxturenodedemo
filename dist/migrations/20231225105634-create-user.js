'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('users', {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: () => uuidv4(), // Generate UUID on the server side
                    primaryKey: true,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                hobbies: {
                    type: Sequelize.ARRAY(Sequelize.STRING),
                    defaultValue: [], // Empty array if not provided
                },
            }, {
                tableName: 'users',
                freezeTableName: true
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('users');
        });
    }
};
//# sourceMappingURL=20231225105634-create-user.js.map