import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Sol_Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Sol_TipoSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  Sol_FechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  Sol_Estado: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
