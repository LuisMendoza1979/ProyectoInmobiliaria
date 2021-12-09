import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';

@model({settings: {strict: true}})
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

  @belongsTo(() => Asesor, {name: 'comentario_de'})
  Ase_Id: number;

  @belongsTo(() => Cliente, {name: 'comentario_para'})
  Cli_Id: number;
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
