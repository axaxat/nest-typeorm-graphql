import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateNode {
  @Field(type => Int, { nullable: true })
  readonly parentId?: number;
  @Field(type => Int, { nullable: true })
  readonly userId?: number;
  @Field() readonly role: string;
  @Field() readonly title: string;
}
