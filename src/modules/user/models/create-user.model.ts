import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUser {
    @Field() readonly name: string;
    @Field() readonly surname: string;
    @Field() readonly avatarUrl: string;
}
