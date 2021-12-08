import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Inmuebles>) {
    super(data);
  }
}

export interface InmueblesRelations {
  // describe navigational properties here
}

export type InmueblesWithRelations = Inmuebles & InmueblesRelations;
