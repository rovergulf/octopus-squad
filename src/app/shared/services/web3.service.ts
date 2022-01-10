import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ethers } from 'ethers';

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private $eth: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)

    get eth(): any {
        return this.$eth.getValue();
    }

    set eth(ethereum: any) {
        this.$eth.next(ethereum);
    }

    public get currentAccount(): string {
        return this.eth.selectedAddress;
    }

    constructor() {
    }

    public get network(): string {
        return this.eth.chainId;
    }

    public get provider(): ethers.providers.Web3Provider {
        return this.newProvider(this.eth);
    }

    public get signer(): ethers.Signer {
        return this.provider.getSigner();
    }

    private newProvider(provider: any = this.eth): ethers.providers.Web3Provider {
        return new ethers.providers.Web3Provider(provider);
    }

    public checkAndInstallWeb3 = () => {
        // Checking if Web3 has been injected by the browser (MetaMask)
        if (typeof window.ethereum !== 'undefined') {
            this.eth = window.ethereum;
            console.info('Successfully installed Web3 provider');
        } else {
            console.warn('No supported web3 provider detected.');
        }
    };

    public getAccounts(chainId: string = '0x89'): Observable<any> {
        return new Observable<any>(subscriber => {
            this.eth.request({
                method: 'eth_requestAccounts',
                chainId,
                params: {
                    message: 'It requires nothing, but your acceptance'
                }
            }).then((res: any) => {
                subscriber.next(res);
                subscriber.complete();
            }).catch((err: any) => {
                subscriber.error(err);
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
