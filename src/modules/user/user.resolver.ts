import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { UserService } from './user.service';
import { CreateUser } from './models/create-user.model';
import { UpdateUser } from './models/update-user.model';
import { User } from './models/user.model';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async users() {
    return await this.userService.findAll();
  }

  @Query(returns => User)
  async user(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') user: CreateUser) {
    return await this.userService.create(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('data') user: UpdateUser,
  ) {
    return await this.userService.update(id, user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.userService.delete(id);
  }
}
