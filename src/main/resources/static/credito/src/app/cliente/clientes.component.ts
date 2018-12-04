import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Cliente } from './cliente';
import { Endereco } from '../endereco/endereco';
import { Cidade } from '../cidade/cidade';
import { Dependente } from '../dependente/dependente';
import { Credito } from '../credito/credito';
import { ClienteService } from './cliente.service';
import { EnderecoService } from '../endereco/endereco.service';
import { CidadeService } from '../cidade/cidade.service';
import { DependenteService } from '../dependente/dependente.service';
import { CreditoService } from '../credito/credito.service';

@Component({
  selector: 'app-root',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ ClienteService, 
  				EnderecoService, 
  				CidadeService, 
  				DependenteService,
  				CreditoService, 
  				DatePipe  ]
})
export class ClientesComponent implements OnInit {
	clientes: Cliente[];
	dependentes: Dependente[];
	creditos: Credito[];
	endereco: Endereco;
	editCliente: Cliente;
	clienteSelected: Cliente;
	enderecoEdit: Endereco;
	dependenteEdit: Dependente;
	listaStatus: Array<Object> = [{id: 'ATIVO', descricao: 'Ativo'}, {id: 'INATIVO', descricao: 'Inativo'}];
	listaSexo: Array<Object> = [{id: 'MASCULINO', descricao: 'Masculino'}, {id: 'FEMININO', descricao: 'Feminino'}];
	listaEstadoCivil: Array<Object> = [{id: 'CASADO', descricao: 'Casado'}, {id: 'SOLTEIRO', descricao: 'Solteiro'}, {id: 'DIVORCIADO', descricao: 'Divorciado'}, {id: 'VIUVO', descricao: 'Viúvo'}];
	listaCidade: Cidade[];

	constructor(private clienteService: ClienteService, 
				private enderecoService: EnderecoService,
				private cidadeService: CidadeService, 
				private dependenteService: DependenteService,
				private creditoService: CreditoService,
				private datepipe: DatePipe,
				private modalService: NgbModal) { }

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
	
	saveDependente(dependente): void {
		let nome = (dependente.nome? dependente.nome.trim():undefined);
		let cpf = (dependente.cpf? dependente.cpf.trim().match(/\d+/gi).join('').substring(0, 11):undefined);
		let idade = dependente.idade;
		let sexo = (dependente.sexo? dependente.sexo.trim():undefined);
		let estadoCivil = (dependente.estadoCivil? dependente.estadoCivil.trim():undefined);
		let status = (dependente.status? dependente.status.trim():undefined);
		if (!nome || !cpf || !idade || !sexo || !estadoCivil || !status ) { return; }
		
		let dateCreate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd hh:mm:ss');
		let cliente = dependente.cliente;
		
		this.cancelEditDependente();
		const newDependente: Dependente = { nome,cpf,idade,sexo,estadoCivil,status,dateCreate,cliente } as Dependente;
		this.dependenteService.addDependente(newDependente)
			.subscribe(dependente => {
				this.cancelNovoDependente();
				this.dependentes.push(dependente)
			});
	}
	
	cancel(): void {
		this.editCliente = undefined;
		this.clientes.shift();
	}
	
	cancelDependente(modal): void {
		modal.close();
		this.dependenteEdit = undefined;
	}
	
	cancelNovoDependente(): void {
		this.dependenteEdit = undefined;
		this.dependentes.shift();
	}
	
	cancelEdit(): void {
		this.editCliente = undefined;
	}
	
	cancelEndereco(modal): void {
		modal.close();
		this.enderecoEdit = undefined;
	}
	
	cancelEditEndereco(): void {
		this.enderecoEdit = undefined;
	}
	
	cancelEditDependente(): void {
		this.dependenteEdit = undefined;
	}
	
	editEndereco(endereco): void {
		this.enderecoEdit = endereco;
	}
	
	abrirEndereco(cliente, enderecomodal): void {
		this.modalService.open(enderecomodal);
		this.cidadeService.getCidades()
			.subscribe(cidades => this.listaCidade = cidades);
		this.enderecoService.searchEnderecos(cliente)
				.subscribe(enderecos => {
					if(enderecos.length == 0){
						this.enderecoEdit = { cliente } as Endereco;
					}else{
						this.endereco = enderecos[0];
					}
				});
	}
	
	abrirDependente(cliente, dependentemodal): void {
		this.clienteSelected = cliente;
		this.modalService.open(dependentemodal, { size: 'lg' });
		this.dependenteService.searchDependentes(cliente)
				.subscribe(dependentes => this.dependentes = dependentes);
	}
	
	abrirCredito(cliente, creditomodal): void {
		this.clienteSelected = cliente;
		this.modalService.open(creditomodal, { size: 'lg' });
		this.creditoService.searchCreditos(cliente)
				.subscribe(creditos => this.creditos = creditos);
	}
	
	saveEndereco(endereco, modal): void {
		let cep = (endereco.cep? endereco.cep.trim():undefined);
		let rua = (endereco.rua? endereco.rua.trim(): undefined);
		let numero = (endereco.numero? endereco.numero.trim():undefined);
		let bairro = (endereco.bairro? endereco.bairro.trim():undefined);
		let cidade = endereco.cidade;
		let estado = (endereco.estado? endereco.estado.trim():undefined);
		let pais = (endereco.pais? endereco.pais.trim():undefined);
		let idCliente = endereco.cliente.id;
		if (!cep || !rua || !numero || !bairro || !cidade || !estado || !pais || !idCliente) { return; }
		
		let cliente = endereco.cliente;
		let id = endereco.id;
		
		if(!id){
			const newEndereco: Endereco = { cep,rua,numero,bairro,cidade,estado,pais,cliente } as Endereco;
			this.enderecoService.addEndereco(newEndereco)
				.subscribe(endereco => {
					this.enderecoEdit = undefined;
					modal.close();
				});
		}else{
			const updateEndereco: Endereco = { id,cep,rua,numero,bairro,cidade,estado,pais,cliente } as Endereco;
			this.enderecoService.updateEndereco(updateEndereco)
				.subscribe(endereco => {
					this.enderecoEdit = undefined;
					modal.close();
				});
		}
	}
	
	novoDependente(): void {
		this.dependenteEdit = undefined;
		let cliente = this.clienteSelected;
		const newDependente: Dependente = { cliente } as Dependente;
		this.dependenteEdit = newDependente;
		if(this.dependentes === undefined){
			this.dependentes = [newDependente];
		}else{
			this.dependentes.unshift(newDependente);
		} 
	}
	
	novoCredito(): void {
		let cliente = this.clienteSelected;
		let dateCreate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd hh:mm:ss');
		const newCredito: Credito = { cliente,dateCreate } as Credito;
		this.creditoService.addCredito(newCredito)
			.subscribe(credito => {
				this.creditoService.searchCreditos(cliente)
					.subscribe(creditos => this.creditos = creditos);
			});
	}

	delete(cliente: Cliente): void {
		this.clientes = this.clientes.filter(h => h !== cliente);
		this.clienteService.deleteCliente(cliente.id).subscribe();
	}
	
	deleteDependente(dependente: Dependente): void {
		this.dependentes = this.dependentes.filter(h => h !== dependente);
		this.dependenteService.deleteDependente(dependente.id).subscribe();
	}

	edit(cliente) {
		this.editCliente = cliente;
	}
	
	editDependente(dependente) {
		this.dependenteEdit = dependente;
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
	
	updateDependente() {
		if (this.dependenteEdit && this.dependenteEdit.id !== undefined) {
			this.dependenteEdit.cpf = this.dependenteEdit.cpf.trim().match(/\d+/gi).join('').substring(0, 11);
			this.dependenteService.updateDependente(this.dependenteEdit)
				.subscribe(dependente => {
					const ix = dependente ? this.dependentes.findIndex(h => h.id === dependente.id) : -1;
					if (ix > -1) { this.dependentes[ix] = dependente; }
				});
			this.dependenteEdit = undefined;
		}else{
			this.saveDependente(this.dependenteEdit);
		}
	}
}
