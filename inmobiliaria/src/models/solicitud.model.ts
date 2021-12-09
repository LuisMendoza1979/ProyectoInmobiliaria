import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Inmuebles} from './inmuebles.model';


@model({
  settings: {
    strict: true,
    foreignKeys: {
      fk_Solicitud_Ase_Id: {
        name: 'fk_Solicitud_Ase_Id',
        entity: 'Asesor',
        entityKey: 'Ase_Id',
        foreignKey: 'Ase_Id',
      },
      fk_Solicitud_Cli_Id: {
        name: 'fk_Solicitud_Cli_Id',
        entity: 'Cliente',
        entityKey: 'Cli_Id',
        foreignKey: 'Cli_Id',
      },
      fk_Solicitud_In_Id: {
        name: 'fk_Solicitud_In_Id',
        entity: 'Inmuebles',
        entityKey: 'In_Id',
        foreignKey: 'In_Id',
      }
    },
  },
})
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

  @belongsTo(() => Asesor, {name: 'solicitud_encargado'})
  Ase_Id: number;

  @belongsTo(() => Cliente, {name: 'solicitud_cliente'})
  Cli_Id: number;

  @belongsTo(() => Inmuebles, {name: 'solicitud_inmueble'})
  In_Id: number;
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
