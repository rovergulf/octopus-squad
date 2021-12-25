import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ethers } from 'ethers';

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    constructor() {
    }

    get eth(): any {
        return window.ethereum;
    }

    public get currentAccount(): string {
        return this.eth?.selectedAddress;
    }

    public get network(): string {
        return this.eth.chainId;
    }

    get provider(): any {
        return this.newProvider(this.eth);
    }

    get signer(): any {
        return this.provider.getSigner(this.currentAccount);
    }

    public newProvider(provider: any = this.eth): any {
        return new ethers.providers.Web3Provider(provider);
    }

    public checkAndInstallWeb3 = () => {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof this.eth !== 'undefined') {
            // Use Mist/MetaMask's provider
        } else {
            console.warn('No supported web3 provider detected.');
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            // this.eth = new Web3(
            //     new Web3.providers.HttpProvider('http://localhost:8545');
            // );
        }
    };

    public getAccounts(): Observable<any> {
        return new Observable<any>(subscriber => {
            this.eth.request({
                method: 'eth_requestAccounts',
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

    public getBalance(address: string): Observable<any> {
        return new Observable<any>(subscriber => {
            this.eth.request({
                method: 'eth_getBalance',
                params: [address],
            }).then((res: any) => {
                subscriber.next(res);
                subscriber.complete();
            }).catch((err: any) => {
                subscriber.error(err);
            });
        });
    }

}
