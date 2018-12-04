import { Cliente } from '../cliente/cliente';

export interface Credito {
  id: number;
  aprovado: string;
  motivo: string;
  limite: number;
  dateCreate: string;
  cliente: Cliente;
}