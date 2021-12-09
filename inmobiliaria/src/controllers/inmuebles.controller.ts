import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Inmuebles} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesController {
  constructor(
    @repository(InmueblesRepository)
    public inmueblesRepository : InmueblesRepository,
  ) {}

  @post('/inmuebles')
  @response(200, {
    description: 'Inmuebles model instance',
    content: {'application/json': {schema: getModelSchemaRef(Inmuebles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {
            title: 'NewInmuebles',
            exclude: ['In_Id'],
          }),
        },
      },
    })
    inmuebles: Omit<Inmuebles, 'In_Id'>,
  ): Promise<Inmuebles> {
    return this.inmueblesRepository.create(inmuebles);
  }

  @get('/inmuebles/count')
  @response(200, {
    description: 'Inmuebles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Inmuebles) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.inmueblesRepository.count(where);
  }

  @get('/inmuebles')
  @response(200, {
    description: 'Array of Inmuebles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inmuebles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Inmuebles) filter?: Filter<Inmuebles>,
  ): Promise<Inmuebles[]> {
    return this.inmueblesRepository.find(filter);
  }

  @patch('/inmuebles')
  @response(200, {
    description: 'Inmuebles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Inmuebles,
    @param.where(Inmuebles) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.inmueblesRepository.updateAll(inmuebles, where);
  }

  @get('/inmuebles/{id}')
  @response(200, {
    description: 'Inmuebles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inmuebles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Inmuebles, {exclude: 'where'}) filter?: FilterExcludingWhere<Inmuebles>
  ): Promise<Inmuebles> {
    return this.inmueblesRepository.findById(id, filter);
  }

  @patch('/inmuebles/{id}')
  @response(204, {
    description: 'Inmuebles PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Inmuebles,
  ): Promise<void> {
    await this.inmueblesRepository.updateById(id, inmuebles);
  }

  @put('/inmuebles/{id}')
  @response(204, {
    description: 'Inmuebles PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() inmuebles: Inmuebles,
  ): Promise<void> {
    await this.inmueblesRepository.replaceById(id, inmuebles);
  }

  @del('/inmuebles/{id}')
  @response(204, {
    description: 'Inmuebles DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.inmueblesRepository.deleteById(id);
  }
}
