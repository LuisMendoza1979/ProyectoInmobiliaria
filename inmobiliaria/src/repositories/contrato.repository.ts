import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataDataSource} from '../datasources';
import {Contrato, ContratoRelations} from '../models';

export class ContratoRepository extends DefaultCrudRepository<
  Contrato,
  typeof Contrato.prototype.Con_Id,
  ContratoRelations
> {
  constructor(
    @inject('datasources.data') dataSource: DataDataSource,
  ) {
    super(Contrato, dataSource);
  }
}
