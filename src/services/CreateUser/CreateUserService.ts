import { ICreateUserDTO } from "../../DTO/CreateUserDTO";
import { User } from "../../entities/User";
import { EmailProvider } from "../../providers/EmailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUserService {

    private userRepository: IUserRepository;
    private emailProvider: EmailProvider;

    constructor(
        userRepository: IUserRepository,
        emailProvider: EmailProvider
    ) {
        this.userRepository = userRepository;
        this.emailProvider = emailProvider;
    }

    async execute(data: ICreateUserDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = new User(data);
        await this.userRepository.save(user);
        await this.emailProvider.sendMail({
            to: {
                email: data.email,
                name: data.name,
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'equipe@meuapp.com',
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        })
    }
}