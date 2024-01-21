import {DataTypes, Sequelize} from "sequelize";
import {MigrationFn} from "umzug";

const tableName = "items";

export const up: MigrationFn<Sequelize> = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable(tableName, {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        invoiceId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().dropTable(tableName)
}
