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
                '50% of profits go to the community wallet',
                'Choosing a fund for donation by voting in discord',
                'We are improving Discord and social media management',
                'Drawing 20 OS among the community',
            ]
        },
        {
            image: '/assets/images/25.svg',
            points: [
                '50% of profits go to the community wallet',
                'Choosing a fund for donation by voting in discord',
                'Drawing 20 OS among the community',
            ]
        },
        {
            image: '/assets/images/50.svg',
            points: [
                '50% of profits go to the community wallet',
                'Voting for the fund for donations',
                'Distribution 20 OS + 2ETH for nft holders and subscribers',
            ]
        },
        {
            image: '/assets/images/75.svg',
            points: [
                '50% of profits go to the community wallet',
                'Voting for the fund for donations',
                'Development of exclusive OS merch',
                'Drawing 20 OS among the community',
            ]
        },
        {
            image: '/assets/images/100.svg',
            points: [
                '50% of profits go to the community wallet',
                '10% profit is raffled among holders  OS NFT',
                '20% development of a new project',
                `3 ETH will be raffled among OS NFT holders with unique features.
                (There are only 3 such octopuses, items will be announced when passing 50% of roadmap)`,
            ]
        },
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
