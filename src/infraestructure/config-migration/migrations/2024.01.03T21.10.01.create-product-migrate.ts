import {DataTypes, Sequelize} from 'sequelize';
import {MigrationFn} from 'umzug';

const tableName = 'products';

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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchasePrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        salesPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().dropTable(tableName)
}