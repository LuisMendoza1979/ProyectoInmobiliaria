import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.Usu_Id,
  UsuarioRelations
> {

  public readonly usuario_con_rol: BelongsToAccessor<Rol, typeof Usuario.prototype.Usu_Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.usuario_con_rol = this.createBelongsToAccessorFor('usuario_con_rol', rolRepositoryGetter,);
    this.registerInclusionResolver('usuario_con_rol', this.usuario_con_rol.inclusionResolver);
  }
}
