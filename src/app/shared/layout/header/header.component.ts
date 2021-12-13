import {Component, OnDestroy, OnInit} from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public navBarActive: boolean = false;
    private sub = new Subscription();

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.sub = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.navBarActive = false;
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
