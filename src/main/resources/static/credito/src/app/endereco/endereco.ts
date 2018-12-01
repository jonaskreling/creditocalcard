import { Cidade } from '../cidade/cidade';
import { Cliente } from '../cliente/cliente';

export interface Endereco {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: Cidade;
  estado: string;
  pais: string;
  cep: string;
  cliente: Cliente;
}