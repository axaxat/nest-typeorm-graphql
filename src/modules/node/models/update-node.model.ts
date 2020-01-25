import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateNode {
  @Field(type => Int, { nullable: true })
  readonly parentId?: number;
  @Field(type => Int, { nullable: true })
  readonly userId?: number;
  @Field({ nullable: true })
  readonly role: string;
  @Field({ nullable: true })
  readonly title: string;
}
