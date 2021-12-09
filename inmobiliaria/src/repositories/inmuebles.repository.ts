import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DataDataSource} from '../datasources';
import {Inmuebles, InmueblesRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class InmueblesRepository extends DefaultCrudRepository<
  Inmuebles,
  typeof Inmuebles.prototype.In_Id,
  InmueblesRelations
> {

  public readonly asesor_encargado: BelongsToAccessor<Asesor, typeof Inmuebles.prototype.In_Id>;

  constructor(
    @inject('datasources.data') dataSource: DataDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Inmuebles, dataSource);
    this.asesor_encargado = this.createBelongsToAccessorFor('asesor_encargado', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor_encargado', this.asesor_encargado.inclusionResolver);
  }
}
