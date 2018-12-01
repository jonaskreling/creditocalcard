import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente.component';
import { ClientesComponent } from './clientes.component';
import { CreditoComponent } from './credito.component';
import { CreditosComponent } from './creditos.component';
import { PagenotfoundComponent } from './pagenotfound.component';

const routes: Routes = [
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
