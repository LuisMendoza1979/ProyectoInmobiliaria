import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Rol_Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Rol_Nombre: string;

  @hasMany(() => Usuario, {keyTo: 'Rol_Id'})
  usuarios: Usuario[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
