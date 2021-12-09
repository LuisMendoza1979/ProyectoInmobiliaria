import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Asesor,
  Comentario,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorComentarioController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Asesor has many Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comentario>,
  ): Promise<Comentario[]> {
    return this.asesorRepository.comentario_de(id).find(filter);
  }

  @post('/asesors/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Asesor.prototype.Ase_Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentarioInAsesor',
            exclude: ['Com_Id'],
            optional: ['Ase_Id']
          }),
        },
      },
    }) comentario: Omit<Comentario, 'Com_Id'>,
  ): Promise<Comentario> {
    return this.asesorRepository.comentario_de(id).create(comentario);
  }

  @patch('/asesors/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Asesor.Comentario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Partial<Comentario>,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.asesorRepository.comentario_de(id).patch(comentario, where);
  }

  @del('/asesors/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Asesor.Comentario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.asesorRepository.comentario_de(id).delete(where);
  }
}
