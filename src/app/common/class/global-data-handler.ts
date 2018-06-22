import { IGlobalDataHandler } from '../models/iglobal-data-handler';
import { Constants } from './constants';
import { UserProfile } from './user-profile';
import { LanguagesForApp } from './languages-for-app';
export class GlobalDataHandler implements IGlobalDataHandler {
    public isLogin: boolean;
    public currentUserRole: string;
    public rootURL: string;
    public isError: boolean;
    public projectName: string;
    public isLoginError: boolean;
    public authtoken: string;
    public userProfile: UserProfile;
    public availableLanguages: Array<LanguagesForApp>;
}
