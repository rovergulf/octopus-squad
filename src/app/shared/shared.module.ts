import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SliceKitModule } from 'ngx-slice-kit';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MinterComponent } from './minter/minter.component';
import { GetTokensComponent } from './components/get-tokens/get-tokens.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const moduleDeclarations = [
    HeaderComponent,
    FooterComponent,
    MinterComponent,
    GetTokensComponent
];

@NgModule({
    declarations: moduleDeclarations,
    exports: [
        ...moduleDeclarations,
        SliceKitModule,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SliceKitModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class SharedModule {
}
