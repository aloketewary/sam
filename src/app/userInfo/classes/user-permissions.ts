import { TeacherModulePermission } from './teacher-module-permission';
import { AdminModulePermission } from './admin-module-permission';
import { DriverModulePermission } from './driver-module-permission';

export class UserPermissions {
    teachermodules: TeacherModulePermission;
    adminmodules: AdminModulePermission;
    drivermodules: DriverModulePermission;
}
