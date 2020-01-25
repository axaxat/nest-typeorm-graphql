import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUser {
  @Field({ nullable: true }) readonly name?: string;
  @Field({ nullable: true }) readonly surname?: string;
  @Field({ nullable: true }) readonly avatarUrl?: string;
}
