import {Entity, model, property} from '@loopback/repository';

@model()
export class Administrador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Adm_Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Adm_Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Adm_Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Adm_Cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  Adm_Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Adm_Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Adm_Email: string;


  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
