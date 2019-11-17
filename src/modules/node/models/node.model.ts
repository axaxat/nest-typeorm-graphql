import { Field, Int, ObjectType } from 'type-graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Node {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field()
  role: string;

  @Field(type => Int)
  directChildrenCount: number;

  @Field(type => Int)
  allChildrenCount: number;

  @Field(type => User, { nullable: true })
  user?: User;

  @Field(type => Node, { nullable: true })
  parent?: Node;

  @Field(type => [Node], { nullable: true })
  children?: Node;
}
