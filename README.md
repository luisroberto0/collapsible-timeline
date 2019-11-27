# Collapsible Timeline Component for Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Getting Started

```
npm install --save collapsible-timeline
```

## Demo

[Live Demo](https://collapsible-timeline.stackblitz.io/)

## Configuration

##### Angular cli

After installation, no additional configuration is needed. Import the `CollapsibleTimelineModule` and define it as one of the imports of your application module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CollapsibleTimelineModule} from "collapsible-timeline";
 
import {AppComponent} from './app.component';
 
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CollapsibleTimelineModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
```

## Examples

### Basic

```html
<collapsible-timeline [(data)]="items" (change)="consoles($event)">
	<collapsible-timeline-column styleClass="col-md-5">
		<ng-template let-col let-data="rowData" collapsibleTimelineTemplate="header">
			<span>{{data.title}}</span>
		</ng-template>
	</collapsible-timeline-column>
  <collapsible-timeline-column>
		<ng-template let-col let-data="rowData" collapsibleTimelineTemplate="header">
			<span>{{data.title2}}</span>
		</ng-template>
	</collapsible-timeline-column>
	<collapsible-timeline-body >
		<ng-template let-body let-data="rowData" collapsibleTimelineTemplate="body">
      		<p style="padding: 10px">{{data.text}}</p>
		</ng-template>
	</collapsible-timeline-body>
</collapsible-timeline>
```



## Input properties

| Name       | Type   | Default    | Description                      |
| :--------- | :----- | :--------- | :------------------------------- |
| data       | array  | null       | An array of collapsibletimeline. |
| style      | string | null       | Inline style of the component.   |
| styleClass | string | 'col-md-1' | Style class of the component.    |

## Events

| Name   | Parameters                     | Description                                 |
| :----- | :----------------------------- | :------------------------------------------ |
| change | event: Selected node instance. | Callback to invoke when a node is selected. |

## Keywords

- [angular](https://www.npmjs.com/search?q=keywords:angular)
- [angular8](https://www.npmjs.com/search?q=keywords:angular8)
- [angular 8](https://www.npmjs.com/search?q=keywords:angular8)
- [angular timeline](https://www.npmjs.com/search?q=keywords:angulartimeline)
- [timeline](https://www.npmjs.com/search?q=keywords:timeline)
- [timeline](https://www.npmjs.com/search?q=keywords:timeline)
- [ng](https://www.npmjs.com/search?q=keywords:ng)
