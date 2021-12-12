import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Rol} from './rol.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Usu_Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Usu_Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Usu_Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Usu_Celular: string;

  @property({
    type: 'string',
    required: true,
  })
  Usu_Clave: string;

  @belongsTo(() => Rol, {name: 'usuario_con_rol'})
  Rol_Id: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
