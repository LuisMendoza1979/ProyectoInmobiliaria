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
  Cliente,
  Comentario,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteComentarioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Comentario',
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
    return this.clienteRepository.comentario_cliente(id).find(filter);
  }

  @post('/clientes/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.Cli_Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentarioInCliente',
            exclude: ['Com_Id'],
            optional: ['Cli_Id']
          }),
        },
      },
    }) comentario: Omit<Comentario, 'Com_Id'>,
  ): Promise<Comentario> {
    return this.clienteRepository.comentario_cliente(id).create(comentario);
  }

  @patch('/clientes/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Cliente.Comentario PATCH success count',
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
    return this.clienteRepository.comentario_cliente(id).patch(comentario, where);
  }

  @del('/clientes/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Cliente.Comentario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.clienteRepository.comentario_cliente(id).delete(where);
  }
}
