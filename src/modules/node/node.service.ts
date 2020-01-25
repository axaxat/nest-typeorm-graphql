import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodeEntity } from './node.entity';
import { UpdateNode } from './models/update-node.model';
import { CreateNode } from './models/create-node.model';
import { ChildrenCount } from './models/children-count.model';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(NodeEntity)
    private readonly nodeRepository: Repository<NodeEntity>,
  ) {}

  async findById(id: number): Promise<NodeEntity> {
    return await this.nodeRepository.findOne(id);
  }

  async findChildrenById(id: number): Promise<NodeEntity[]> {
    return await this.nodeRepository.find({ parentId: id });
  }

  async findAll(): Promise<NodeEntity[]> {
    return await this.nodeRepository.find();
  }

  async findRootNode(): Promise<NodeEntity> {
    return await this.nodeRepository.findOne({ parentId: null });
  }

  async create(data: CreateNode): Promise<NodeEntity> {
    const { title, userId, role, parentId } = data;

    // check is parent node exist
    if (parentId) {
      const parentNode = await this.nodeRepository.findOne({ id: parentId });
      if (!parentNode) {
        throw new Error('Parent node not exist');
      }
    } else {
      const rootNode = await this.findRootNode();
      if (rootNode) {
        throw new Error('Root node already exists');
      }
    }

    const node = new NodeEntity();
    node.title = title;
    node.userId = userId;
    node.role = role;
    node.parentId = parentId;

    await this.nodeRepository.save(node);

    return node;
  }

  async update(id: number, data: UpdateNode): Promise<NodeEntity> {
    const { title, userId, role, parentId } = data;

    if (id === parentId) {
      throw new Error('Node id can not be equal parentId');
    }

    const node = await this.nodeRepository.findOne(id);

    if (!node) {
      throw new Error(`Node with id: ${id} not found`);
    }

    if (parentId) {
      const allNodes = await this.nodeRepository.find();
      const childrenNodes = this.findAllChildren(id, allNodes);
      const parentNode = await this.nodeRepository.findOne(parentId);

      if (!parentNode) {
        throw new Error(`Node with id: ${parent} not found`);
      }

      childrenNodes.forEach(el => {
        if (el.id === parentId) {
          throw new Error('Recursive reference');
        }
      });
    }

    node.title = title || node.title;
    node.role = role || node.role;
    node.parentId = parentId || node.parentId;
    node.userId = userId === null ? userId : node.userId;

    await this.nodeRepository.save(node);

    return node;
  }

  async delete(id: number): Promise<boolean> {
    const node = await this.nodeRepository.findOne(id);

    if (!node) {
      throw new Error(`Node with id: ${id} not found`);
    }

    // cascade remove
    const allNodes = await this.nodeRepository.find();
    const nodesToDelete = this.findAllChildren(id, allNodes);
    nodesToDelete.push(node);

    return !!(await this.nodeRepository.remove(nodesToDelete));
  }

  async getChildrenCounts(id: number): Promise<ChildrenCount> {
    const entities = await this.nodeRepository.find();
    const directChildren = this.findDirectChildren(id, entities);
    const allChildren = this.findAllChildren(id, entities);

    return {
      direct: directChildren.length,
      all: allChildren.length,
    };
  }

  private findDirectChildren(
    nodeId: number,
    entities: NodeEntity[],
  ): NodeEntity[] {
    const children = entities.filter(node => node.parentId === nodeId);
    return children;
  }

  private findAllChildren(
    nodeId: number,
    entities: NodeEntity[],
  ): NodeEntity[] {
    const directChildren = this.findDirectChildren(nodeId, entities);
    const allChildren: NodeEntity[] = [];
    directChildren.forEach(node => {
      allChildren.push(...this.findAllChildren(node.id, entities));
      allChildren.push(node);
    });
    return allChildren;
  }
}
