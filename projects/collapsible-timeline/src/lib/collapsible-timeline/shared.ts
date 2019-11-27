import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EmbeddedViewRef,
  ViewContainerRef,
  NgModule,
  ContentChildren,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  QueryList,
  Directive,
  AfterContentInit
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor } from "@angular/forms";

@Directive({
  selector: "[collapsibleTimelineTemplate]",
  host: {}
})
export class CollapsibleTimelineTemplate {
  @Input() type: string;

  @Input("collapsibleTimelineTemplate") name: string;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    if (this.type) {
      console.log(
        'Defining a collapsibleTimelineTemplate with type property is deprecated use collapsibleTimelineTemplate="type" instead.'
      );
      return this.type;
    } else {
      return this.name;
    }
  }
}

@Component({
  selector: "collapsible-timeline-column",
  template: ``
})
export class CollapsibleTimelineColumn implements AfterContentInit {
  @Input() field: string;
  @Input() sortField: boolean;
  @Input() header: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() hidden: boolean;
  @Input() dateFormat: string;
  @Input() limitText = 121;
  @Output() sortFunction: EventEmitter<any> = new EventEmitter();
  @ContentChildren(CollapsibleTimelineTemplate) templates: QueryList<any>;
  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

  orderDown: boolean;
  orderUp: boolean;

  public headerTemplate: TemplateRef<any>;
  public bodyTemplate: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.templates.forEach(item => {
      switch (item.getType()) {
        case "header":
          this.headerTemplate = item.template;
          break;

        case "body":
          this.bodyTemplate = item.template;
          break;

        default:
          this.bodyTemplate = item.template;
          break;
      }
    });
  }
}

@Component({
  selector: "collapsible-timeline-body",
  template: ``
})
export class CollapsibleTimelineBody implements AfterContentInit {
  @Input() field: string;
  @Input() sortField: boolean;
  @Input() header: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() hidden: boolean;
  @Input() dateFormat: string;
  @Input() limitText = 121;
  @Output() sortFunction: EventEmitter<any> = new EventEmitter();
  @ContentChildren(CollapsibleTimelineTemplate) templates: QueryList<any>;
  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

  orderDown: boolean;
  orderUp: boolean;

  public bodyTemplate: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.templates.forEach(item => {
      switch (item.getType()) {
        case "body":
          this.bodyTemplate = item.template;
          break;

        default:
          this.bodyTemplate = item.template;
          break;
      }
    });
  }
}

@Component({
  selector: "columnBodyCollapsibleTimelineTemplateLoader",
  template: ``
})
export class ColumnBodyCollapsibleTimelineTemplateLoader
  implements OnInit, OnDestroy {
  @Input() body: any;

  @Input() rowData: any;

  @Input() rowIndex: number;

  view: EmbeddedViewRef<any>;

  constructor(public viewContainer: ViewContainerRef) {}

  ngOnInit() {
    if (this.body.bodyTemplate !== undefined) {
      this.view = this.viewContainer.createEmbeddedView(
        this.body.bodyTemplate,
        {
          $implicit: this.body,
          rowData: this.rowData,
          rowIndex: this.rowIndex
        }
      );
    }
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}

@Component({
  selector: "columnHeaderCollapsibleTimelineTemplateLoader",
  template: ``
})
export class ColumnHeaderCollapsibleTimelineTemplateLoader
  implements OnInit, OnDestroy {
  @Input() column: any;

  @Input() rowData: any;

  @Input() rowIndex: number;

  view: EmbeddedViewRef<any>;

  constructor(public viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(
      this.column.headerTemplate,
      {
        $implicit: this.column,
        rowData: this.rowData,
        rowIndex: this.rowIndex
      }
    );
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}

@Component({
  selector: "collapsibleTimelineTemplateLoader",
  template: ``
})
export class CollapsibleTimelineTemplateLoader implements OnInit, OnDestroy {
  @Input() template: TemplateRef<any>;

  @Input() data: any;

  view: EmbeddedViewRef<any>;

  constructor(public viewContainer: ViewContainerRef) {}

  ngOnInit() {
    if (this.template) {
      this.view = this.viewContainer.createEmbeddedView(this.template, {
        $implicit: this.data
      });
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [
    ColumnBodyCollapsibleTimelineTemplateLoader,
    CollapsibleTimelineTemplate,
    CollapsibleTimelineColumn,
    CollapsibleTimelineBody,
    CollapsibleTimelineTemplateLoader,
    ColumnHeaderCollapsibleTimelineTemplateLoader
  ],
  declarations: [
    ColumnBodyCollapsibleTimelineTemplateLoader,
    CollapsibleTimelineTemplate,
    CollapsibleTimelineColumn,
    CollapsibleTimelineBody,
    CollapsibleTimelineTemplateLoader,
    ColumnHeaderCollapsibleTimelineTemplateLoader
  ]
})
export class CollapsibleTimelineSharedModule {}
