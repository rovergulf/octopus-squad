import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { timer } from 'rxjs';
import { AlertService, DialogService } from 'ngx-slice-kit';
import { Web3Service } from '../services/web3.service';
import { GetTokensComponent } from '../components/get-tokens/get-tokens.component';

@Component({
    selector: 'app-minter',
    templateUrl: './minter.component.html',
    styleUrls: ['./minter.component.scss']
})
export class MinterComponent implements OnInit {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private document: any,
        private web3: Web3Service,
        private alerts: AlertService,
        private dialog: DialogService,
    ) {
    }

    mint(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.web3.eth) {
                this.alerts.error({
                    title: `Eth wallet is required`,
                    message: `Install MetaMask browser extension at first`,
                    positionX: 'center',
                });
            } else {
                const isRinkeby = this.web3.network === '0x4';
                const isPolygon = this.web3.network === '0x89';
                console.log(this.web3.network)
                if (isRinkeby || isPolygon) {
                    this.dialog.showDialog(GetTokensComponent).subscribe({
                        next: (res: any) => {
                            // ...
                        }
                    });
                } else {
                    this.alerts.error({
                        title: `Wrong network`,
                        message: `Select Polygon network in your MetaMask wallet`
                    });
                }
            }
        }
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            timer(100).subscribe({
                next: () => {
                    const elem = this.document.getElementById('video');
                    elem.play();
                }
            });
        }
    }

}
