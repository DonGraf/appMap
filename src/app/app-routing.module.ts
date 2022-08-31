import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //Sistema de rutas principal
  {
    path: 'mapas',
    //carga
    loadChildren:()=>import('./mapas/mapas.module').then(m=> m.MapasModule)
  },
  {
    path: '**',
    redirectTo: 'mapas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
