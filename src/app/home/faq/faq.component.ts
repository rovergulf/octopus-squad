import { Component } from '@angular/core';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

    public faq = [
        {
            question: 'What is the Octopus Squad?',
            answer: `This is collection of 10,000 unique NFT Octopus Squads on the Polygon Blockchain. Each of them is thought out, specially selected and has its own value.`,
            active: false
        },
        {
            question: 'How was the Octopus Squad created?',
            answer: `Each Octopus has constructed algorithmically by mixing a variety of properties with different possibilities.`,
            active: false
        },
        {
            question: 'What is the smart contract address of the Octopus Squad?',
            answer: `0x0000000000000000000000000000000000000000`,
            active: false
        },
        {
            question: 'When does minting begin?',
            answer: `Minting will start at 24 December 2021`,
            active: false
        },
        {
            question: 'How many Octopus will be minted?',
            answer: `There’re a total 10k unique octopuses to be minted.`,
            active: false
        },
        {
            question: 'How much do they cost to mint?',
            answer: `Minting one unique octopus will cost 40 Matic`,
            active: false
        },
        {
            question: 'Is there a limit to the number of octopuses I can mint?',
            answer: `There’s a limit of 10 Octopus per transaction.`,
            active: false
        },
        {
            question: 'What does possession of an octopus give?',
            answer: `Ownership of NFT OS gives the right to vote to choose where funds from the treasury will be directed.
            OS owners will have access to a private Discord channel where they can post offers to channel funds.
            The team will vote for the best proposals and then implement it!
            + airdrops for NFT owners.`,
            active: false
        },
        {
            question: 'Fundraising directions',
            answer: `Projects for the cleaning of reservoirs, rescue of marine life, financing of animal rehabilitation centers`,
            active: false
        },
        {
            question: 'Why Polygon?',
            answer: `We don't have time for gas wars when our main war on ocean pollution is at the door! That is why we chose the
            Polygon network and we hope you will not remain indifferent and give space to octopuses in your wallet.`,
            active: false
        },
        {
            question: 'How will the funds be transferred to funds?',
            answer: `Through The Giving Block, we will arrange for donations to be transferred to community-selected foundations.`,
            active: false
        }
    ];

    constructor() {
    }

    public toggle(ind: number) {
        this.faq[ind].active = !this.faq[ind].active;
    }
}
