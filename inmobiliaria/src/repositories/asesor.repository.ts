import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DataDataSource} from '../datasources';
import {Asesor, AsesorRelations, Administrador, Solicitud, Comentario, Inmuebles} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {SolicitudRepository} from './solicitud.repository';
import {ComentarioRepository} from './comentario.repository';
import {InmueblesRepository} from './inmuebles.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.Ase_Id,
  AsesorRelations
> {

  public readonly jefe: BelongsToAccessor<Administrador, typeof Asesor.prototype.Ase_Id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.Ase_Id>;

  public readonly comentario_de: HasManyRepositoryFactory<Comentario, typeof Asesor.prototype.Ase_Id>;

  public readonly inmuebles_encargados: HasManyRepositoryFactory<Inmuebles, typeof Asesor.prototype.Ase_Id>;

  constructor(
    @inject('datasources.data') dataSource: DataDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>,
  ) {
    super(Asesor, dataSource);
    this.inmuebles_encargados = this.createHasManyRepositoryFactoryFor('inmuebles_encargados', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('inmuebles_encargados', this.inmuebles_encargados.inclusionResolver);
    this.comentario_de = this.createHasManyRepositoryFactoryFor('comentario_de', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentario_de', this.comentario_de.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.jefe = this.createBelongsToAccessorFor('jefe', administradorRepositoryGetter,);
    this.registerInclusionResolver('jefe', this.jefe.inclusionResolver);
  }
}
