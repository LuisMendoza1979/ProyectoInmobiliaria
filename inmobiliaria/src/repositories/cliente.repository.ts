import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud, Comentario} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {ComentarioRepository} from './comentario.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Cli_Id,
  ClienteRelations
> {

  public readonly solicitudes_cliente: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.Cli_Id>;

  public readonly comentario_cliente: HasManyRepositoryFactory<Comentario, typeof Cliente.prototype.Cli_Id>;

  constructor(
    @inject('datasources.data') dataSource: DataDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>,
  ) {
    super(Cliente, dataSource);
    this.comentario_cliente = this.createHasManyRepositoryFactoryFor('comentario_cliente', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentario_cliente', this.comentario_cliente.inclusionResolver);
    this.solicitudes_cliente = this.createHasManyRepositoryFactoryFor('solicitudes_cliente', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes_cliente', this.solicitudes_cliente.inclusionResolver);
  }
}
