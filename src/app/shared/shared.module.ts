import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliceKitModule } from 'ngx-slice-kit';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MinterComponent } from './minter/minter.component';
import { GetTokensComponent } from './components/get-tokens/get-tokens.component';
import { SelectWalletComponent } from './components/select-wallet/select-wallet.component';

const moduleDeclarations = [
    HeaderComponent,
    FooterComponent,
    MinterComponent,
    GetTokensComponent,
    SelectWalletComponent,
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
