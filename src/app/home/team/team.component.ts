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
            alt: 'Xoma image'
        },
        {
            name: 'CaptainDisorder',
            position: 'Dev',
            avatar: '/assets/images/OctoDima.png',
            alt: 'CaptainDisorder image'
        },
        {
            name: 'Acdvlr',
            position: 'Design',
            avatar: '/assets/images/OctoAmir.png',
            alt: 'Acdvlr image'
        },
        {
            name: 'MugenKirk',
            position: 'Artist',
            avatar: '/assets/images/OctoMisha.png',
            alt: 'MugenKirk image'
        }
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
