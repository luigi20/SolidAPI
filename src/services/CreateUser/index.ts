import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserService } from "./CreateUserService";
import { UserController } from "../../controllers/UserController";

const postgresUsersRepository = new PostgresUsersRepository()
const mailtrapMailProvider = new MailTrapMailProvider()

const createUserService = new CreateUserService(
    postgresUsersRepository,
    mailtrapMailProvider
)

const createUserController = new UserController(
    createUserService
)

export { createUserService, createUserController }