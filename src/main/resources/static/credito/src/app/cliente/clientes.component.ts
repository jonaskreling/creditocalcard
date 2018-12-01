import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ ClienteService, DatePipe ]
})
export class ClientesComponent implements OnInit {
	clientes: Cliente[];
	editCliente: Cliente;
	listaStatus: Array<Object> = [{id: 'ATIVO', descricao: 'Ativo'}, {id: 'INATIVO', descricao: 'Inativo'}];
	listaSexo: Array<Object> = [{id: 'MASCULINO', descricao: 'Masculino'}, {id: 'FEMININO', descricao: 'Feminino'}];
	listaEstadoCivil: Array<Object> = [{id: 'CASADO', descricao: 'Casado'}, {id: 'SOLTEIRO', descricao: 'Solteiro'}, {id: 'DIVORCIADO', descricao: 'Divorciado'}, {id: 'VIUVO', descricao: 'Viúvo'}];

	constructor(private clienteService: ClienteService, private datepipe: DatePipe) { }

	ngOnInit() {
		this.getClientes();
	}

	getClientes(): void {
		this.clienteService.getClientes()
			.subscribe(clientes => this.clientes = clientes);
	}

	add(nome: string): void {
		this.editCliente = undefined;
		nome = nome.trim();
		if (!nome) { return; }

		const newCliente: Cliente = { nome } as Cliente;
		this.editCliente = newCliente; 
		this.clientes.unshift(newCliente);
	}
	
	save(cliente): void {
		let nome = cliente.nome.trim();
		let cpf = cliente.cpf.trim().match(/\d+/gi).join('').substring(0, 11);
		let idade = cliente.idade;
		let sexo = cliente.sexo.trim();
		let estadoCivil = cliente.estadoCivil.trim();
		let status = cliente.status.trim();
		let renda = cliente.renda;
		if (!nome || !cpf || !idade || !sexo || !estadoCivil || !status || !renda) { return; }
		
		let dateCreate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd hh:mm:ss');
		
		this.cancel();
		const newCliente: Cliente = { nome,cpf,idade,sexo,estadoCivil,status,renda,dateCreate } as Cliente;
		this.clienteService.addCliente(newCliente)
			.subscribe(cliente => this.clientes.push(cliente));
	}
	
	cancel(): void {
		this.editCliente = undefined;
		this.clientes.shift();
	}

	delete(cliente: Cliente): void {
		this.clientes = this.clientes.filter(h => h !== cliente);
		this.clienteService.deleteCliente(cliente.id).subscribe();
	}

	edit(cliente) {
		this.editCliente = cliente;
	}

	search(searchTerm: string) {
		this.editCliente = undefined;
		if (searchTerm) {
			this.clienteService.searchClientes(searchTerm)
				.subscribe(clientes => this.clientes = clientes);
		}
	}

	update() {
		if (this.editCliente && this.editCliente.id !== undefined) {
			this.editCliente.cpf = this.editCliente.cpf.trim().match(/\d+/gi).join('').substring(0, 11);
			this.clienteService.updateCliente(this.editCliente)
				.subscribe(cliente => {
					const ix = cliente ? this.clientes.findIndex(h => h.id === cliente.id) : -1;
					if (ix > -1) { this.clientes[ix] = cliente; }
				});
			this.editCliente = undefined;
		}else{
			this.save(this.editCliente);
		}
	}
}
