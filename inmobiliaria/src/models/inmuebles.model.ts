import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model({
  settings: {
    foreignKeys: {
      fk_Inmuebles_Ase_Id: {
        name: 'fk_Inmuebles_Ase_Id',
        entity: 'Asesor',
        entityKey: 'Ase_Id',
        foreignKey: 'Ase_Id',
      },
    },
  },
})
export class Inmuebles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  In_Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  In_TipoInmueble: string;

  @property({
    type: 'string',
    required: true,
  })
  In_Depto: string;

  @property({
    type: 'string',
    required: true,
  })
  In_Ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  In_Direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  In_Valor: number;

  @property({
    type: 'string',
    required: true,
  })
  In_TipoOferta: string;

  @property({
    type: 'string',
    required: true,
  })
  In_TelefonoAse: string;

  @belongsTo(() => Asesor, {name: 'asesor_encargado'})
  Ase_Id: number;

  constructor(data?: Partial<Inmuebles>) {
    super(data);
  }
}

export interface InmueblesRelations {
  // describe navigational properties here
}

export type InmueblesWithRelations = Inmuebles & InmueblesRelations;
