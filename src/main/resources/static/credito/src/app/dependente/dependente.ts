import { Cliente } from '../cliente/cliente';

export interface Dependente {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  sexo: string;
  estadoCivil: string;
  cliente: Cliente;
  status: string;
  dateCreate: string;
}