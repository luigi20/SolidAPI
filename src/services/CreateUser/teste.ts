import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

export class UserController {
    constructor(
        private CreateUserService: CreateUserService,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            await this.CreateUserService.execute({
                name,
                email,
                password
            })

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            })
        }
    }
}