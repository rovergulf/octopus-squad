import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-minter',
    templateUrl: './minter.component.html',
    styleUrls: ['./minter.component.scss']
})
export class MinterComponent implements OnInit {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private document: any,
    ) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const elem = this.document.getElementById('video');
            elem.play();
        }
    }

}
