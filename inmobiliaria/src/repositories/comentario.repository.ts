import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DataDataSource} from '../datasources';
import {Comentario, ComentarioRelations, Asesor, Cliente} from '../models';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.Com_Id,
  ComentarioRelations
> {

  public readonly comentario_de: BelongsToAccessor<Asesor, typeof Comentario.prototype.Com_Id>;

  public readonly comentario_para: BelongsToAccessor<Cliente, typeof Comentario.prototype.Com_Id>;

  constructor(
    @inject('datasources.data') dataSource: DataDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Comentario, dataSource);
    this.comentario_para = this.createBelongsToAccessorFor('comentario_para', clienteRepositoryGetter,);
    this.registerInclusionResolver('comentario_para', this.comentario_para.inclusionResolver);
    this.comentario_de = this.createBelongsToAccessorFor('comentario_de', asesorRepositoryGetter,);
    this.registerInclusionResolver('comentario_de', this.comentario_de.inclusionResolver);
  }
}
