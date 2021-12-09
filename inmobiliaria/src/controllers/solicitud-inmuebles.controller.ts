import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Inmuebles,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudInmueblesController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Inmuebles belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async getInmuebles(
    @param.path.number('id') id: typeof Solicitud.prototype.Sol_Id,
  ): Promise<Inmuebles> {
    return this.solicitudRepository.solicitud_inmueble(id);
  }
}
