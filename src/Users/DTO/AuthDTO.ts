class Auth {
    private _emailorPhone: string | number;
    private _password: string
    constructor(
        emailorPhone: string | number,
        password: string
    ) {
        this._emailorPhone = emailorPhone;
        this._password = password;
    }

    get emailorPhone(): string | number  {
        return this._emailorPhone;
    }

    get password(): string {
        return this._password;
    }

    set emailorPhone(emailorPhone: string | number) {
        this._emailorPhone = emailorPhone;
    }

    set password(contraseña: string) {
        this._password = contraseña;
    }

}

export default Auth;