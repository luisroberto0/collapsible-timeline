import {
  Component,
  OnInit,
  Input,
  Output,
  ContentChild,
  TemplateRef,
  ElementRef,
  ViewChild,
  QueryList,
  ContentChildren,
  forwardRef,
  EventEmitter
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  sequence
} from "@angular/animations";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import {
  CollapsibleTimelineColumn,
  CollapsibleTimelineBody
} from "./../shared";

@Component({
  selector: "collapsible-timeline",
  templateUrl: "./collapsible-timeline.component.html",
  styleUrls: ["./collapsible-timeline.component.css"],
  animations: [
    // Define animation here

    trigger("myfirstanimation", [
      transition("* => void", [
        style({
          height: "*",
          opacity: "1",
          transform: "translateY(0)",
          "box-shadow": "0 1px 4px 0 rgba(0, 0, 0, 0.3)"
        }),
        sequence([
          animate(
            ".25s ease",
            style({
              height: "*",
              opacity: ".2",
              transform: "translateY(20px)",
              "box-shadow": "none"
            })
          ),
          animate(
            ".1s ease",
            style({
              height: "0",
              opacity: 0,
              transform: "translateY(20px)",
              "box-shadow": "none"
            })
          )
        ])
      ]),
      transition("void => active", [
        style({
          height: "0",
          opacity: "0",
          transform: "translateY(20px)",
          "box-shadow": "none"
        }),
        sequence([
          animate(
            ".1s ease",
            style({
              height: "*",
              opacity: ".2",
              transform: "translateY(20px)",
              "box-shadow": "none"
            })
          ),
          animate(
            ".35s ease",
            style({
              height: "*",
              opacity: 1,
              transform: "translateY(0)"
            })
          )
        ])
      ])
    ])
  ]
})
export class CollapsibleTimelineComponent implements OnInit {
  @ViewChild("timeline", { static: false }) timeline: ElementRef;

  @ContentChild(TemplateRef, { static: false })
  @Input()
  layoutTemplate: TemplateRef<any>;

  @ContentChildren(CollapsibleTimelineColumn) columns: QueryList<
    CollapsibleTimelineColumn
  >;

  @ContentChildren(CollapsibleTimelineBody) bodies: QueryList<
    CollapsibleTimelineBody
  >;

  _data: any;

  @Input()
  get data(): any {
    return this._data;
  }
  set data(data: any) {
    this._data = data;
    this.dataChange.emit(this._data);
  }

  @Output()
  dataChange = new EventEmitter<any>();

  @Output() change: EventEmitter<any> = new EventEmitter();

  indexClicked: number;

  revert: any = "reverse";

  constructor() {}

  ngOnInit() {}

  animateMe(index: number, data: any) {
    if (this.indexClicked === index) return;
    this.indexClicked = index;
    this.change.emit(data);
    this._data.map(item => {
      item.state = "";
    });
    data.state = "active";
    this._data.splice(index, 1);
    this._data.splice(index, 0, data);
  }

  /**
   * Returns selected item name
   * @returns The name item
   */
  getValue(item: any, field) {
    const value = this.getWithProps(item, field, "");
    if (value !== null) {
      return value;
    } else {
      return "";
    }
  }

  /**
   * @param obj The object json processed
   * @param prop json's path
   * @param defval value default
   * @returns The valeu of prop in json
   */
  private getWithProps(obj: any, prop: string, defval: string): any {
    if (defval === undefined) {
      defval = null;
    }

    let props = prop.split(".");
    for (let i = 0; i < props.length; i++) {
      if (obj[props[i]] === undefined) {
        return defval;
      }
      obj = obj[props[i]];
    }
    return obj;
  }
}
