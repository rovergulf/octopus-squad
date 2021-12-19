import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    public team = [
        {
            name: 'Xoma',
            position: 'Social Media',
            avatar: '/assets/images/OctoKolya.png',
            alt: 'Xoma image',
            twitter: 'https://twitter.com/XomaBig',
            opensea: 'https://opensea.io/xo_ma',
            email: '',
        },
        {
            name: 'CaptainDisorder',
            position: 'Dev',
            avatar: '/assets/images/OctoDima.png',
            alt: 'CaptainDisorder image',
            twitter: 'https://twitter.com/rzkmonster',
            opensea: 'https://opensea.io/CaptainDisorder',
            email: 'd@rovergulf.net',
        },
        {
            name: 'Acdvlr',
            position: 'Design',
            avatar: '/assets/images/OctoAmir.png',
            alt: 'Acdvlr image',
            twitter: '',
            opensea: '',
            email: '',
        },
        {
            name: 'MugenKirk',
            position: 'Artist',
            avatar: '/assets/images/OctoMisha.png',
            alt: 'MugenKirk image',
            twitter: 'https://twitter.com/mk8artist',
            opensea: '',
            email: '',
            instagram: 'https://instagram.com/mk8.artist'
        }
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
