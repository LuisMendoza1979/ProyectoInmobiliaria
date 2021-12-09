import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataDataSource} from '../datasources';
import {Administrador, AdministradorRelations} from '../models';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.Adm_Id,
  AdministradorRelations
> {
  constructor(
    @inject('datasources.data') dataSource: DataDataSource,
  ) {
    super(Administrador, dataSource);
  }
}
