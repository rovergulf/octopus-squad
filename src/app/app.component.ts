import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AlertService } from 'ngx-slice-kit';
import { Web3Service } from './shared/services/web3.service';
import { GtagService } from './shared/services/gtag.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public web3: Web3Service,
        private alerts: AlertService,
        private gtag: GtagService,
    ) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.web3.eth) {
                this.web3.getAccounts().subscribe({
                    next: (res: any) => {
                        this.alerts.success({
                            message: `You are authorized to Octopus Squad!`,
                            positionX: 'center',
                            positionY: 'bottom',
                        });
                    },
                    error: (err: any) => {
                        this.alerts.error({
                            message: 'Failed to authorize using Web3',
                            positionX: 'center',
                            positionY: 'bottom',
                        });
                    }
                });
            }

            this.gtag.initGTag();
        }
    }

}
