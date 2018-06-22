export class Constants {
    public static ROLE_ADMIN = 'ADMIN';
    public static ROLE_STAFF = 'staff';
    // Toast Config
    public static TOAST_CONFIG = {
        // Toast Config
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        THEME: 'default', // Possible values: default, bootstrap, material
        TIMEOUT: 4000, // in sec
        SHOW_CLOSE: true,
        POSITION: 'top-right' // Possible values: {top/bottom}-{left/right}
    };
    public static readonly MAIN_ROOT_URL = 'http://ec2-13-127-166-221.ap-south-1.compute.amazonaws.com';
    private static readonly API_VERSION = '1.0.0';
    public static ROOT_URL = Constants.MAIN_ROOT_URL + '/SchoolRegistrationServices/' + Constants.API_VERSION;
    public static LOGIN_URL = '/api/login/';
    public static TEACHER_LIST_URL = '/api/teacherlist/';
    public static FORGOT_PASSWORD_URL = '/api/forgotpassword/';
    public static GET_USER_INFO_URL = '/api/getuserinfo/';
    public static LOGIN_PERSISTENCE_NAME = 'userToken';
    public static USER_PROFILE_DATA = 'userProfileData';
    public static SEARCH_URL = Constants.MAIN_ROOT_URL;
}
