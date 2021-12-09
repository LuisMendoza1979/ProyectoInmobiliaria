
import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Comentario} from './comentario.model';
import {Inmuebles} from './inmuebles.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_Asesor_Adm_Id: {
        name: 'fk_Asesor_Adm_Id',
        entity: 'Administrador',
        entityKey: 'Adm_Id',
        foreignKey: 'Adm_Id',
      },
    },
  },
})
export class Asesor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Ase_Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Ase_Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Ase_Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Ase_Cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  Ase_Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Ase_Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Ase_Email: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaInicio: string;

  @belongsTo(() => Administrador, {name: 'jefe'})
  Adm_Id: number;

  @hasMany(() => Solicitud, {keyTo: 'Ase_Id'})
  solicitudes: Solicitud[];

  @hasMany(() => Comentario, {keyTo: 'Ase_Id'})
  comentario_de: Comentario[];

  @hasMany(() => Inmuebles, {keyTo: 'Ase_Id'})
  inmuebles_encargados: Inmuebles[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
