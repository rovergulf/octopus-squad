import { Component } from '@angular/core';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

    public faq = [
        {
            id: 1,
            question: 'What is the Octopus Squad?',
            answer: `This is a collection of 10,000 unique NFT Octopus Squads on a Polygon Blockchain. Each of them is thought out, specially selected and has its own value.`,
            active: false
        },
        {
            id: 2,
            question: 'How was the Octopus Squad created ?',
            answer: `Each Octopus has constructed algorithmically by mixing a variety of properties with different possibilities.`,
            active: false
        },
        {
            id: 3,
            question: 'What is the smart contract address of the Octopus Squad?',
            answer: `a1b2c3d4g5h6j7k8`,
            active: false
        },
        {
            id: 4,
            question: 'When does minting begin?',
            answer: `Minting will start...`,
            active: false
        },
        {
            id: 5,
            question: 'How many Octopus will be minted?',
            answer: `There’re a total 10k unique octopuses to be minted`,
            active: false
        },
        {
            id: 6,
            question: 'How much do they cost to mint?',
            answer: `Minting one unique octopus will cost ....`,
            active: false
        },
        {
            id: 7,
            question: 'Is there a limit to the number of octopuses I can mint?',
            answer: `There’s a limit of 10 Octopus per transaction `,
            active: false
        },
        {
            id: 8,
            question: 'What does possession of an octopus give?',
            answer: `Ownership of NFT OS gives the right to vote to choose where funds from the treasury will be directed.
            OS members will have access to a private Discord channel where they can post offers to channel funds.
            The team will vote for the best proposals and then implement it!
            + airdrops for NFT owners.`,
            active: false
        },
        {
            id: 9,
            question: 'Fundraising directions',
            answer: `Projects for the cleaning of reservoirs, rescue of marine life, financing  of animal rehabilitation centers`,
            active: false
        },
        {
            id: 10,
            question: 'Why Polygon?',
            answer: `We don't have time for gas wars when our main war on ocean pollution is at the door! That is why we chose the Polygon network and we hope you will not remain indifferent and give space to octopuses in your wallet`,
            active: false
        },
        {
            id: 11,
            question: 'How will the funds be transferred to funds?',
            answer: `Through The Giving Block, we will arrange for donations to be transferred  to community-selected foundations.`,
            active: false
        }
    ];

    constructor() {
    }

    public toggle(id: number) {
        const currentItem = this.faq.find((item: any) => item.id === id);

        if (currentItem) {
            currentItem.active = !currentItem.active;
        }
    }
}
