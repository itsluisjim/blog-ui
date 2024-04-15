import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-blogs',
  templateUrl: './no-blogs.component.html',
  styleUrls: ['./no-blogs.component.scss']
})
export class NoBlogsComponent {
  @Input() message1: string;
  @Input() message2: string;
}