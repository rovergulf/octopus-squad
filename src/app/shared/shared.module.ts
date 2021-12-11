import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

const moduleDeclarations = [
    HeaderComponent,
    FooterComponent,
];

@NgModule({
    declarations: moduleDeclarations,
    exports: [
        ...moduleDeclarations,
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}