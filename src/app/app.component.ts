import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AlertService } from 'ngx-slice-kit';
import { Web3Service, GtagService, WalletConnectService } from './shared/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private web3: Web3Service,
        private wc: WalletConnectService,
        private alerts: AlertService,
        private gtag: GtagService,
    ) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.web3.checkAndInstallWeb3();
            this.wc.installWalletConnect();
            this.gtag.initGTag();
        }
    }

}
