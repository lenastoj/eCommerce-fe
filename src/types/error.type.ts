export interface ErrorRegister {
    success: boolean;
    errors: ErrorReg[];
}

interface ErrorReg {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

export interface ErrorLogin {
    success: boolean;
    errors: ErrorLog;
}

interface ErrorLog {
    message: string;
}
