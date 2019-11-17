import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './models/create-user.model';
import { UpdateUser } from './models/update-user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne(id);
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async create(data: CreateUser): Promise<UserEntity> {
        const { name, surname, avatarUrl } = data;

        const user = new UserEntity();
        user.name = name;
        user.surname = surname;
        user.avatarUrl = avatarUrl;

        await this.userRepository.save(user);

        return user;
    }

    async update(id: number, data: UpdateUser): Promise<UserEntity> {
        const { name, surname, avatarUrl } = data;

        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new Error(`User with id=${id} not found`);
        }

        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.avatarUrl = avatarUrl || user.avatarUrl;

        await this.userRepository.save(user);

        return user;
    }

    async delete(id): Promise<boolean> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new Error(`User with id=${id} not found`);
        }

        return !!(await this.userRepository.remove(user));
    }
}
