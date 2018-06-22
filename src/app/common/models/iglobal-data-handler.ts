import { UserProfile } from '../class/user-profile';
import { LanguagesForApp } from '../class/languages-for-app';

export interface IGlobalDataHandler {
    isLogin: boolean;
    currentUserRole: string;
    rootURL: string;
    isError: boolean;
    projectName: string;
    isLoginError: boolean;
    authtoken: string;
    userProfile: UserProfile;
    availableLanguages: Array<LanguagesForApp>;
}
