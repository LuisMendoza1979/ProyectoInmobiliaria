import {Entity, model, property} from '@loopback/repository';

@model()
export class Contrato extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Con_Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Con_Numero: string;


  constructor(data?: Partial<Contrato>) {
    super(data);
  }
}

export interface ContratoRelations {
  // describe navigational properties here
}

export type ContratoWithRelations = Contrato & ContratoRelations;
