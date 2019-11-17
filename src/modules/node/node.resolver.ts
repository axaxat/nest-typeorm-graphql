import { Resolver, ResolveProperty, Parent, Query, Mutation, Args } from '@nestjs/graphql';
import { Int } from 'type-graphql';

import { NodeEntity } from './node.entity';

import { NodeService } from './node.service';
import { UserService } from '../user/user.service';

import { User } from '../user/models/user.model';
import { Node } from './models/node.model';
import { CreateNode } from './models/create-node.model';
import { UpdateNode } from './models/update-node.model';

@Resolver(of => Node)
export class NodeResolver {
    constructor(
        private readonly nodeService: NodeService,
        private readonly userService: UserService,
    ) { }

    @Query(returns => Node)
    async node(@Args({ name: 'id', type: () => Int }) id: number) {
        const nodeEntity = await this.nodeService.findById(id);
        const node = await this.mapEntityToViewModel(nodeEntity);

        return node;
    }

    @Query(returns => Node)
    async rootNode() {
        const nodeEntity = await this.nodeService.findRootNode();
        const node = await this.mapEntityToViewModel(nodeEntity);

        return node;
    }

    @Query(returns => [Node])
    async nodes() {
        const nodeEntities = await this.nodeService.findAll();
        const nodes = await this.mapEntitiesToViewModels(nodeEntities);

        return nodes;
    }

    @ResolveProperty('user')
    async user(@Parent() nodeEntity) {
        const { userId } = nodeEntity;
        const userEntity = await this.userService.findById(userId);
        const user: User = {
            id: userEntity.id,
            name: userEntity.name,
            surname: userEntity.surname,
            avatarUrl: userEntity.surname,
        };

        return user;
    }

    @ResolveProperty('children')
    async children(@Parent() nodeEntity) {
        const { id } = nodeEntity;
        const childrenEntities = await this.nodeService.findChildrenById(id);
        const nodes = await this.mapEntitiesToViewModels(childrenEntities);

        return nodes;
    }

    @ResolveProperty('parent')
    async parent(@Parent() nodeEntity) {
        const { parentId } = nodeEntity;

        if (!parentId) {
            return null;
        }

        const parentEntity = await this.nodeService.findById(parentId);
        const node = await this.mapEntityToViewModel(parentEntity);

        return node;

    }

    @Mutation(returns => Node)
    async createNode(@Args('data') data: CreateNode) {

        const nodeEntity = await this.nodeService.create(data);
        const node = await this.mapEntityToViewModel(nodeEntity);
        return node;
    }

    @Mutation(returns => Node)
    async updateNode(
        @Args({ name: 'id', type: () => Int }) id: number,
        @Args('data') data: UpdateNode,
    ) {

        const nodeEntity = await this.nodeService.update(id, data);
        const node = await this.mapEntityToViewModel(nodeEntity);
        return node;
    }

    @Mutation(returns => Boolean)
    async deleteNode(@Args({ name: 'id', type: () => Int }) id: number) {

        return await this.nodeService.delete(id);
    }

    private async mapEntityToViewModel(entity: NodeEntity): Promise<Node> {
        const childrenCounts = await this.nodeService.getChildrenCounts(entity.id);
        const viewModel: Node = {
            ...entity,
            allChildrenCount: childrenCounts.all,
            directChildrenCount: childrenCounts.direct,
        };
        return viewModel;
    }

    private async mapEntitiesToViewModels(entities: NodeEntity[]): Promise<Node[]> {
        const nodes = [];

        for (const nodeEntity of entities) {
            const node = await this.mapEntityToViewModel(nodeEntity);
            nodes.push(node);
        }

        return nodes;
    }
}
