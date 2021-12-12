import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors
} from '@loopback/rest';
import {Cliente,Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import { AutenticacionService } from '../services';
import { service } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import { Llaves } from '../configuracion/Llaves';
import fetch from 'node-fetch';
///@authenticate('admin')
export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService,
  ) {}
//
@authenticate.skip()
@post('/identificarCliente', {
  responses: {
    '200': {
      descripcion: 'identificacion de clientes'
    }
  }
})
async identificarCliente(
  @requestBody() credenciales: Credenciales
) {
  let p = await this.servicioAutenticacion.IdentificarCliente(credenciales.Usuario, credenciales.Clave);
  if (p) {
    let token = this.servicioAutenticacion.GenerarTokenJWT(p);
    return {
      datos: {
        nombres: p.Cli_Nombres,
        email: p.Cli_Email,
        id: p.Cli_Id
      },
      tk: token
    }
  } else {
    throw new HttpErrors[401]("Datos invalidos")
  }
}
  /// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJOb21icmVDb21wbGV0byI6Im1hcmlhIGFuZHJhZGUifSwiaWF0IjoxNjM5MzM1MTI2fQ.v7wN1yRuQBsImfBuEpe84Nk0izAWQgEctYxUJrLz0-0
 
  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['Cli_Id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'Cli_Id'>,
  ): Promise<Cliente> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let cifrarClave = this.servicioAutenticacion.CifrarClave(clave);
    cliente.Cli_Clave = cifrarClave;
    let p = await this.clienteRepository.create(cliente);
    // Notificar al usuario
    let destino = cliente.Cli_Email;
    let asunto = "Registro al Bando Novembrino";
    let contenido = `Hola participante:${cliente.Cli_Nombres} ${cliente.Cli_Apellidos} has sido registrado exitosamente en la inmobiliaria Hogar Colombia, su clave asignada es:${clave}`;
    fetch(`${Llaves.UrlServicioNotificacion}/enviocorreo?destino=${destino}&asunto=${asunto}&mensaje=${contenido}`)
    .then((data: any) => { console.log(data); })
    return p;
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
