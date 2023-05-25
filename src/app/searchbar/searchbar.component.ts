import { Component, Output, EventEmitter, Input} from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @Input('fullName')
  fullName: string | null |'';
@Output()
searchValueChanging: EventEmitter<string>= new EventEmitter<string>();
onSearchValueChanged(){
  this.searchValueChanging.emit(this.fullName);
  console.log("FirstName: ", this.fullName);
}


}
