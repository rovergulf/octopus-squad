import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    public team = [
        {
            name: 'Mikola',
            position: 'Social Media',
            avatar: '../../../assets/images/OctoKolya.png',
            alt: 'Mikola octopus'
        },
        {
            name: 'CaptainDisorder',
            position: 'Dev',
            avatar: '../../../assets/images/OctoDima.png',
            alt: 'CaptainDisorder octopus'
        },
        {
            name: 'Acdvlr',
            position: 'Design',
            avatar: '../../../assets/images/OctoAmir.png',
            alt: 'Acdvlr octopus'
        },
        {
            name: 'MugenKirk',
            position: 'Artist',
            avatar: '../../../assets/images/OctoMisha.png',
            alt: 'MugenKirk octopus'
        }
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
