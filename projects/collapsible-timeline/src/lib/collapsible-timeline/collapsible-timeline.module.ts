import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CollapsibleTimelineComponent } from "./collapsible-timeline/collapsible-timeline.component";
import { CollapsibleTimelineSharedModule } from "./shared";
import { ReversePipe } from "./reverse.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    CollapsibleTimelineSharedModule
  ],
  declarations: [CollapsibleTimelineComponent, ReversePipe],
  exports: [
    CollapsibleTimelineComponent,
    CollapsibleTimelineSharedModule,
    ReversePipe
  ]
})
export class CollapsibleTimelineModule {}
