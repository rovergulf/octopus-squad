import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WalletConnectService {

    private $currentAccount: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private $connector: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

    get wc(): WalletConnect {
        return this.$connector.getValue();
    }

    set wc(walletConnector: WalletConnect) {
        this.$connector.next(walletConnector);
    }

    public get currentAccount(): string {
        return this.$currentAccount.getValue();
    }

    public set currentAccount(address: string) {
        this.$currentAccount.next(address);
    }

    constructor() {
    }

    get provider(): ethers.providers.Web3Provider {
        const provider = new WalletConnectProvider({
            qrcodeModal: QRCodeModal,
            chainId: 137,
            infuraId: environment.infuraId,
            rpc: {
                137: 'https://polygon-rpc.com'
            }
        });
        provider.enable().then(() => {
            return new ethers.providers.Web3Provider(provider);
        }).catch((err: any) => {
            throw err;
        });
        return new ethers.providers.Web3Provider(provider);
    }

    get signer(): ethers.providers.JsonRpcSigner {
        return this.provider.getSigner();
    }

    // create wallet connect instance
    public installWalletConnect(): void {
        this.wc = new WalletConnect({
            bridge: 'https://bridge.walletconnect.org',
            qrcodeModal: QRCodeModal,
        });
    }

    // execute QRCode connection dialog
    public connect(chainId: number = 137): Observable<any> {
        return new Observable<any>(subscriber => {
            this.wc.connect({chainId})
                .then((res: any) => {
                    subscriber.next(res);
                    subscriber.complete();
                })
                .catch((err: any) => subscriber.error(err));
        });
    }

    // handle connect event as Observable
    public onConnect(): Observable<any> {
        return new Observable<any>(subscriber => {
            this.wc.on('connect', (err: any, payload: any) => {
                if (payload) {
                    subscriber.next(payload);
                    subscriber.complete();
                } else {
                    subscriber.error(err);
                }
            });
        });
    }

    // handle connect event as Observable
    public onSessionUpdate(): Observable<any> {
        return new Observable<any>(subscriber => {
            this.wc.on('session_update', (err: any, payload: any) => {
                if (payload) {
                    subscriber.next(payload);
                    subscriber.complete();
                } else {
                    subscriber.error(err);
                }
            });
        });
    }

    // handle connect event as Observable
    public onDisconnect(): Observable<any> {
        return new Observable<any>(subscriber => {
            this.wc.on('disconnect', (err: any, payload: any) => {
                if (payload) {
                    subscriber.next(payload);
                    subscriber.complete();
                } else {
                    subscriber.error(err);
                }
            });
        });
    }

    public getBalance(): Observable<any> {
        return new Observable<any>(subscriber => {
            this.signer.getBalance().then((res: any) => {
                subscriber.next(res);
                subscriber.complete();
            }).catch((err: any) => {
                subscriber.error(err);
            });
        });
    }

}
