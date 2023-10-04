import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Page404Component } from 'src/app/core/page404/page404.component';



const routes: Routes = [
    { path: '**',pathMatch: 'full',component: Page404Component},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportesRoutingModule {}
