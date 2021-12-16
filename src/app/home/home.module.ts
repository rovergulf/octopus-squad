import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TeamComponent } from './team/team.component';
import { FaqComponent } from './faq/faq.component';
import { StoryComponent } from './story/story.component';
import { AboutComponent } from './about/about.component';
import { RoadmapComponent } from './roadmap/roadmap.component';


@NgModule({
    declarations: [
        HomeComponent,
        TeamComponent,
        FaqComponent,
        StoryComponent,
        AboutComponent,
        RoadmapComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class HomeModule {
}
