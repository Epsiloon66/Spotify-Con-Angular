import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-section',
  templateUrl: './generic-section.component.html',
  styleUrl: './generic-section.component.css'
})
export class GenericSectionComponent {
  @Input() title:string = ''
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<any> = []


}
