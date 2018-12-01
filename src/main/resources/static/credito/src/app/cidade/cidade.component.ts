import { Component, OnInit } from '@angular/core';

import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  providers: [ CidadeService ],
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {
  cidades: Cidade[];
  editCidade: Cidade; 

  constructor(private cidadeService: CidadeService) { }

  ngOnInit() {
    this.getCidades();
  }

  getCidades(): void {
    this.cidadeService.getCidades()
      .subscribe(cidades => this.cidades = cidades);
  }

  add(nome: string): void {
    this.editCidade = undefined;
    nome = nome.trim();
    if (!nome) { return; }

    const newCidade: Cidade = { nome } as Cidade;
    this.cidadeService.addCidade(newCidade)
      .subscribe(cidade => this.cidades.push(cidade));
  }

  delete(cidade: Cidade): void {
    this.cidades = this.cidades.filter(h => h !== cidade);
    this.cidadeService.deleteCidade(cidade.id).subscribe();
  }

  edit(cidade) {
    this.editCidade = cidade;
  }

  search(searchTerm: string) {
    this.editCidade = undefined;
    if (searchTerm) {
      this.cidadeService.searchCidades(searchTerm)
        .subscribe(cidades => this.cidades = cidades);
    }
  }

  update() {
    if (this.editCidade) {
      this.cidadeService.updateCidade(this.editCidade)
        .subscribe(cidade => {
          const ix = cidade ? this.cidades.findIndex(h => h.id === cidade.id) : -1;
          if (ix > -1) { this.cidades[ix] = cidade; }
        });
      this.editCidade = undefined;
    }
  }
}