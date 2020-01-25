import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeResolver } from './node.resolver';
import { NodeEntity } from './node.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([NodeEntity]), UserModule],
  providers: [NodeService, NodeResolver],
})
export class NodeModule {}
