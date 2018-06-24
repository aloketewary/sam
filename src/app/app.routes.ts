import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { FourZeroFourComponent } from './common/components/four-zero-four/four-zero-four.component';
import { AuthenticationGuard } from './common/guards/authentication.guard';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { TeacherInfoComponent } from './userInfo/components/teacher-info/teacher-info.component';
import { ViewEditTeacherInfoComponent } from './userInfo/components/view-edit-teacher-info/view-edit-teacher-info.component';

export const AppRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    // {
    //     path: '**',
    //     component: FourZeroFourComponent
    // },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
    {
        path: 'userinfo', canActivate: [AuthenticationGuard],
        children: [
            { path: '', redirectTo: 'teacherinfo', pathMatch: 'full' },
            { path: 'teacherinfo', component: TeacherInfoComponent },
            { path: 'vieweditteacherinfo', component: ViewEditTeacherInfoComponent },
            { path: 'vieweditteacherinfo/:maildId', component: ViewEditTeacherInfoComponent },
            { path: 'vieweditteacherinfo/:maildId/:schoolId', component: ViewEditTeacherInfoComponent }
        ]
    }
];
