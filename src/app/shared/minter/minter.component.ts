import { Component, ContentChild, ContentChildren, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-minter',
    templateUrl: './minter.component.html',
    styleUrls: ['./minter.component.scss']
})
export class MinterComponent implements OnInit {

    constructor(
        @Inject(DOCUMENT) private document: any,
    ) {
    }

    ngOnInit(): void {
        const elem = this.document.getElementById('video');
        elem.play();
    }

}
