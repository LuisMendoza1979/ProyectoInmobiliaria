import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comentario,
  Asesor,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioAsesorController {
  constructor(
    @repository(ComentarioRepository)
    public comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.number('id') id: typeof Comentario.prototype.Com_Id,
  ): Promise<Asesor> {
    return this.comentarioRepository.comentario_de(id);
  }
}
