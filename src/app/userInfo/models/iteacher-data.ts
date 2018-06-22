import { UserPermissions } from '../classes/user-permissions';

export interface ITeacherData {
    userpermissions: UserPermissions;
    lastName: string;
    firstName: string;
    role: string;
    gender: string;
    profilePic: string;
    emailId: string;
    deviceTokenId: string;
    userType: string;
    id: string;
    phoneNo: string;
    schoolId: number;
    qrcode: any;
}
