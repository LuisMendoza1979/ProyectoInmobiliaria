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
  Cliente,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioClienteController {
  constructor(
    @repository(ComentarioRepository)
    public comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Comentario.prototype.Com_Id,
  ): Promise<Cliente> {
    return this.comentarioRepository.comentario_para(id);
  }
}
