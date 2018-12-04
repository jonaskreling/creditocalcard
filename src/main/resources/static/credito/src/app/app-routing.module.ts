import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './cliente/clientes.component';
import { CidadeComponent } from './cidade/cidade.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{ 
		path: 'cidades', 
		component: CidadeComponent 
	},
	{ 
		path: 'clientes', 
		component: ClientesComponent 
	},
	{ 
		path: '',
		redirectTo: '/clientes',
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
