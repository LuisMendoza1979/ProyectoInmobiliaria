import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
