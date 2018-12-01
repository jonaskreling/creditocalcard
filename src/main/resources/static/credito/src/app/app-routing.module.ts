import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CreditoComponent } from './credito/credito.component';
import { CreditosComponent } from './creditos/creditos.component';
import { CidadeComponent } from './cidade/cidade.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{ 
		path: 'cidade/:id',      
		component: CidadeComponent 
	},
	{ 
		path: 'cidades', 
		component: CidadeComponent 
	},
	{ 
		path: 'cliente/:id',      
		component: ClienteComponent 
	},
	{ 
		path: 'clientes', 
		component: ClientesComponent 
	},
	{ 
		path: 'credito/:id',      
		component: CreditoComponent 
	},
	{
		path: 'creditos',
		component: CreditosComponent,
		data: { title: 'Crédito List' }
	},
	{ 
		path: '',
		redirectTo: '',
		pathMatch: 'full'
	},
	{ 
		path: '**', 
		component: PagenotfoundComponent 
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
