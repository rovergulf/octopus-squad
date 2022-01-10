import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { GtagService, WalletConnectService, Web3Service } from '../../services';
import { Subscription } from 'rxjs';
import { AlertService } from 'ngx-slice-kit';

@Component({
    selector: 'app-select-wallet',
    templateUrl: './select-wallet.component.html',
    styleUrls: ['./select-wallet.component.scss']
})
export class SelectWalletComponent implements OnInit, OnDestroy {

    @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

    private sub?: Subscription;

    constructor(
        private web3: Web3Service,
        private wc: WalletConnectService,
        private alerts: AlertService,
        private gtag: GtagService,
    ) {
    }

    selectWC(): void {
        this.wc.installWalletConnect();
        this.sub = this.wc.connect().subscribe({
            next: (res: any) => {
                const {accounts, chainId} = res;
                if (accounts?.length) {
                    this.wc.currentAccount = accounts[0].toString();
                }
                this.resultEvent.emit({
                    provider: 'WalletConnect',
                    accounts, chainId
                });
            },
            error: (err: any) => {
                this.alerts.error({
                    message: err,
                });
            }
        });
    }

    selectEth(): void {
        this.web3.checkAndInstallWeb3();
        if (this.web3.eth) {
            this.sub = this.web3.getAccounts().subscribe({
                next: (res: any) => {
                    this.wc.currentAccount = res[0];
                    this.alerts.success({
                        message: `You are authorized to Chubby Pops!`,
                        positionX: 'center',
                        positionY: 'bottom',
                    });
                    this.resultEvent.emit({
                        provider: 'Ethereum',
                        currentAccount: res[0],
                    });
                },
                error: (err: any) => {
                    this.alerts.error({
                        message: 'Failed to authorize using Web3',
                        positionX: 'center',
                        positionY: 'bottom',
                    });
                    this.resultEvent.emit();
                }
            });
        } else {
            this.alerts.error({
                title: 'MetaMask connection failed',
                message: 'No MetaMask extension provider detected',
            });
        }
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}
