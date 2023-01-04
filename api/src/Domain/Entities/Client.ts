export interface IClient {
    name: string
    email: string
    address: string
    phoneNumber: string
    cpf: string
}


export class Client {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    cpf: string;

    constructor(client: IClient) {
        const {name, email,address, phoneNumber, cpf} = client
        this.name = name;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.cpf = cpf;
    }
}
