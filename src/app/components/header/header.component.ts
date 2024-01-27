import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm: any;
  @Output() 
  searchChanged: EventEmitter<number>= new EventEmitter<number>();

  onSearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
