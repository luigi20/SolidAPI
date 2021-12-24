import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUser {

    private userRepository: IUserRepository;

    constructor(
        userRepository: IUserRepository
    ) {
        this.userRepository = userRepository;
    }
    async execute() {
        const userAlreadyExists = await this.userRepository.findByEmail();
    }
}