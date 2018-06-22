import { IUser } from '../models/iuser';

export class User implements IUser {
    public id: string;
    public email: string;
    public password: string;
}
