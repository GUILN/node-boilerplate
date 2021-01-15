import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { database } from '../sequelize/database';

export default class ArchDecisionOptionEntity extends Model {
    public id?: number;
    public name?: string;
}
