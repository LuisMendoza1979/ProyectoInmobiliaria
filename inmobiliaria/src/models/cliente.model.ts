import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Comentario} from './comentario.model';

@model({settings: {strict: true}})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Cli_Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Cli_Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Cli_Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Cli_Cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  Cli_Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Cli_Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Cli_Direccion: string;

  @hasMany(() => Solicitud, {keyTo: 'Cli_Id'})
  solicitudes_cliente: Solicitud[];

  @hasMany(() => Comentario, {keyTo: 'Cli_Id'})
  comentario_cliente: Comentario[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
