import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GtagService {

    private $gtag: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

    private get gtag(): any {
        return this.$gtag.getValue();
    }

    private set gtag(ref: any) {
        this.$gtag.next(ref);
    }

    constructor() {
    }

    public initGTag(): void {
        if (window['gtag']) {
            this.gtag = window['gtag'];
            console.info('gtag manager installed');
        } else {
            console.info('No google tag manager detected');
        }
    }

    public trackEvent(action: string, value: number = 1): void {
        this.gtag('event', action, {value});
    }

}
