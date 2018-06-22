import { ITeacherData } from '../models/iteacher-data';
import { UserPermissions } from './user-permissions';

export class TeacherData implements ITeacherData {
    public userpermissions: UserPermissions;
    public lastName: string;
    public firstName: string;
    public role: string;
    public gender: string;
    public profilePic: string;
    public emailId: string;
    public deviceTokenId: string;
    public userType: string;
    public id: string;
    public phoneNo: string;
    public schoolId: number;
    public qrcode: any;
}
