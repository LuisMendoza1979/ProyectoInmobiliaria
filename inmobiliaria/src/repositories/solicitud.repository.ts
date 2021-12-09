import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DataDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Asesor, Cliente, Inmuebles} from '../models';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';
import {InmueblesRepository} from './inmuebles.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.Sol_Id,
  SolicitudRelations
> {

  public readonly solicitud_encargado: BelongsToAccessor<Asesor, typeof Solicitud.prototype.Sol_Id>;

  public readonly solicitud_cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.Sol_Id>;

  public readonly solicitud_inmueble: BelongsToAccessor<Inmuebles, typeof Solicitud.prototype.Sol_Id>;

  constructor(
    @inject('datasources.data') dataSource: DataDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>,
  ) {
    super(Solicitud, dataSource);
    this.solicitud_inmueble = this.createBelongsToAccessorFor('solicitud_inmueble', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('solicitud_inmueble', this.solicitud_inmueble.inclusionResolver);
    this.solicitud_cliente = this.createBelongsToAccessorFor('solicitud_cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('solicitud_cliente', this.solicitud_cliente.inclusionResolver);
    this.solicitud_encargado = this.createBelongsToAccessorFor('solicitud_encargado', asesorRepositoryGetter,);
    this.registerInclusionResolver('solicitud_encargado', this.solicitud_encargado.inclusionResolver);
  }
}
