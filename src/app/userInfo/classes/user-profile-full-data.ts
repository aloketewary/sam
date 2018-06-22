import { UserPermissions } from './user-permissions';

export class UserProfileFullData {
    lastName: string;
    role: string;
    notes: {
        transportationCounselor: string;
        schoolCounselor: string;
    };
    gender: string;
    emailId: string;
    joiningDate: Date;
    phoneNo: string;
    userpermissions: UserPermissions;
    password: string;
    isDeleted: boolean;
    countryCode: string;
    schoolId: number;
    staffPin: number;
    deviceTokenId: string;
    id: string;
    department: string;
    qualificationDetails: {};
    address: string;
    profilePic: string;
    geopoint: string;
    pickPoint: string;
    physicianDetails: {
        firstName: string;
        lastName: string;
        country: string;
        address: string;
        city: string;
        phone: string;
        state: string;
        fax: string;
        email: string;
    };
    requiresTransportation: boolean;
    firstName: string;
    createdDate: Date;
    dob: Date;
    modifiedDate: Date;
    experienceDetails: {};
    files: any[];
    emergencyDetails: {
        firstName: string;
        lastName: string;
        education: string;
        occupation: string;
        address: string;
        dob: Date;
        emailId: string;
        phoneNo: string;
        relation: string;
    };
    position: string;
    userType: string;
    maritalStatus: string;
}
