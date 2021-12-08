import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Comentario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Com_Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Com_Asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  Com_Descripcion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
