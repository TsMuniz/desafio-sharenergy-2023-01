interface IUser {
    name: string
    email: string
    password: string
}

export class User {
    name: string;
    email: string;
    password: string

    constructor(client: IUser) {
        const {name, email,password} = client
        this.name = name;
        this.email = email;
        this.password = password
    }
}
