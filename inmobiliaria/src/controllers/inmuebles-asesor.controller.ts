import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmuebles,
  Asesor,
} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesAsesorController {
  constructor(
    @repository(InmueblesRepository)
    public inmueblesRepository: InmueblesRepository,
  ) { }

  @get('/inmuebles/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.number('id') id: typeof Inmuebles.prototype.In_Id,
  ): Promise<Asesor> {
    return this.inmueblesRepository.asesor_encargado(id);
  }
}
