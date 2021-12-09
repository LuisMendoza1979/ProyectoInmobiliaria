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
  Inmuebles,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorInmueblesController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Asesor has many Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inmuebles>,
  ): Promise<Inmuebles[]> {
    return this.asesorRepository.inmuebles_encargados(id).find(filter);
  }

  @post('/asesors/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmuebles)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Asesor.prototype.Ase_Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {
            title: 'NewInmueblesInAsesor',
            exclude: ['In_Id'],
            optional: ['Ase_Id']
          }),
        },
      },
    }) inmuebles: Omit<Inmuebles, 'In_Id'>,
  ): Promise<Inmuebles> {
    return this.asesorRepository.inmuebles_encargados(id).create(inmuebles);
  }

  @patch('/asesors/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Asesor.Inmuebles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Partial<Inmuebles>,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.asesorRepository.inmuebles_encargados(id).patch(inmuebles, where);
  }

  @del('/asesors/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Asesor.Inmuebles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.asesorRepository.inmuebles_encargados(id).delete(where);
  }
}
