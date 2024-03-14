'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(), // Generate UUID on the server side
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hobbies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [], // Empty array if not provided
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: "users",
        timestamps: false,
    });
    return User;
};
//# sourceMappingURL=user.js.map