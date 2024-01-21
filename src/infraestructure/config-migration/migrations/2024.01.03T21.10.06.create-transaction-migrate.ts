import {DataTypes, Sequelize} from "sequelize";
import {MigrationFn} from "umzug";

const tableName = "transactions";

export const up: MigrationFn<Sequelize> = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable(tableName, {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().dropTable(tableName)
}
