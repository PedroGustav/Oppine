import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository{
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User | undefined>;
    listAll(): Promise<User[]>
    save(user: User): Promise<User>;
    delete(id: string): Promise<object>;
}