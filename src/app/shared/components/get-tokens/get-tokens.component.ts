import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AlertService, PopupService } from 'ngx-slice-kit';
import { ethers } from 'ethers';
import { Web3Service } from '../../services/web3.service';
import { environment } from '../../../../environments/environment';

const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentTokenId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];

@Component({
    selector: 'app-get-tokens',
    templateUrl: './get-tokens.component.html',
    styleUrls: ['./get-tokens.component.scss']
})
export class GetTokensComponent implements OnInit, OnDestroy {

    @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

    loading: boolean = false;
    tx: any;
    amount: number = 1;
    ethValue: number = 0;
    contract: any;
    currentTokenId: number = 0;

    constructor(
        public web3: Web3Service,
        private popup: PopupService,
        private alerts: AlertService,
    ) {
    }

    get factoryImage(): string {
        return this.amount > 5 ? '/assets/images/egg10.png' :
            this.amount > 1 ? '/assets/images/egg3.png' : '/assets/images/egg1.png';
    }

    get txUrl(): string {
        const networkPrefix = this.web3.network === `0x4` ? 'rinkeby.etherscan.io' : 'polygonscan.com';
        return `https://${networkPrefix}/tx/${this.tx.hash}`;
    }

    async contractCall(recipient: string, amount: number, rewrite?: any) {
        return await this.contract.mint(recipient, amount, rewrite);
    }

    mint(): void {
        if (this.loading) {
            return;
        }

        this.loading = true;

        // this amount is added due not enough ether sent error, seems it not
        // const ethValue = this.ethValue + 0.00000000000000001;
        const value = ethers.utils.parseEther(this.ethValue.toString());
        this.contractCall(this.web3.currentAccount, this.amount, {value}).then((tx: any) => {
            this.alerts.success({message: `Tx '${tx.hash}' sent!`});
            this.tx = tx;
            this.loading = false;
        }).catch((err: any) => {
            this.alerts.error({message: err.message.substring(0, err.message.indexOf('(')) || err.message});
            this.loading = false;
        });
    }

    get discountPrice(): number {
        return this.web3.network === '0x4' ? 0.01 : 20;
    }

    get normalPrice(): number {
        return this.web3.network === '0x4' ? 0.02 : 40;
    }

    get minEthValue(): number {
        return this.amount * (this.web3.network === '0x4' ? 0.02 : 40);
    }

    get canIncrease(): boolean {
        return this.amount >= 10;
    }

    get canDecrease(): boolean {
        return this.amount <= 1;
    }

    priceCaption(): string {
        return `Each token costs ${this.web3.network === '0x4' ? '0.02 Ether' : '40 Matic'} per mint`;
    }

    increase(): void {
        this.amount++;
        this.ethValue = this.countPrice();
    }

    decrease(): void {
        this.amount--;
        this.ethValue = this.countPrice();
    }

    private countPrice(): number {
        const discountLimit = this.web3.network === '0x4' ? 50 : 1000;
        if (this.currentTokenId + this.amount > discountLimit) {
            const discountPrice = (discountLimit - this.currentTokenId) * this.discountPrice;
            const normalPrice = (this.currentTokenId + this.amount - discountLimit) * this.normalPrice;
            return discountPrice + normalPrice;
        } else {
            return this.amount * (this.currentTokenId < discountLimit ? this.discountPrice : this.normalPrice);
        }
    }

    close(): void {
        this.resultEvent.emit();
    }

    ngOnInit(): void {
        const addresses: any = environment.contracts;
        this.contract = new ethers.Contract(addresses[this.web3.network], abi, this.web3.signer);
        this.contract.currentTokenId().then((res: any) => {
            this.currentTokenId = ethers.BigNumber.from(res).toNumber();
            this.ethValue = this.countPrice();
        }).catch((err: any) => {
            this.alerts.error({
                message: err.message || err
            });
        });
    }

    ngOnDestroy(): void {
    }

}
