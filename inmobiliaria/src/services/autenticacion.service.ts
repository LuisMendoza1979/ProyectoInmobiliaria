import { service } from '@loopback/core';
import { ClienteRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { Cliente,Asesor,Administrador } from '../models';
import { Llaves } from '../configuracion/Llaves';
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("password-generator");
const cryptoJs = require("crypto-js");
const jwt =require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    /* Add @inject to inject parameters */
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    ) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave =generador(8,false);
    return clave;
  }
  CifrarClave(clave: string){
    let claveCifrada=cryptoJs.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarCliente(usuario:string, clave:string)
  {
    try{
      let c = this.clienteRepository.findOne({where:{Cli_Email:usuario, Cli_Clave:clave}});
      if(c){
        return c
      }
      return false;
    }catch
    {
      return false;
    }
  }

  GenerarTokenJWT(cliente : Cliente){
    let token = jwt.sign({
      data:{
        id: cliente.Cli_Id,
        NombreCompleto: cliente.Cli_Nombres + " "+ cliente.Cli_Apellidos
      }
    },
    Llaves.Clavejwt);
    return token;
  }
  validarToken(token : string){
    try{
      let datos = jwt.verify(token,Llaves.Clavejwt)
      return datos;
    }catch{
      return false;
    }
  }
}
