import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-roadmap',
    templateUrl: './roadmap.component.html',
    styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

    roadmap: any[] = [
        {
            image: '/assets/images/10.svg',
            points: [
                'We are improving Discord and social media management',
                'Drawing 10 OS among the community',
            ]
        },
        {
            image: '/assets/images/25.svg',
            points: [
                '3 ETH goes to the community wallet',
                'Choosing a fund for donation by voting in discord',
                'Drawing 20 OS for nft holders and subscribers',
            ]
        },
        {
            image: '/assets/images/50.svg',
            points: [
                '5 ETH goes to the community wallet',
                'Voting for the fund for donations',
                'Distribution 20 OS + 1ETH for nft holders and subscribers',
            ]
        },
        {
            image: '/assets/images/75.svg',
            points: [
                '8 ETH goes to the community wallet',
                'Voting for the fund for donations',
                'Development of exclusive OS merch',
                'Exclusive Rare NFT giveaways',
            ]
        },
        {
            image: '/assets/images/100.svg',
            points: [
                '10 ETH goes to the community wallet',
                'Voting for the fund for donations',
                'Drawing 3 ETH for Rare NFT holders',
                'Development of a new project.',
                'Hooray we made this world cleaner!',
            ]
        },
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
