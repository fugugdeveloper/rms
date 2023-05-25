import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataModel } from '../model/DataModel';
import { SanctionListService } from '../services/sanction-list.service';

@Component({
  selector: 'app-unsanction',
  templateUrl: './unsanction.component.html',
  styleUrls: ['./unsanction.component.scss']
})
export class UnsanctionComponent {
  fullName: string='';
  @Output()
  searchValueChanging: EventEmitter<string>= new EventEmitter<string>();
  onSearchValueChanged(){
    this.searchValueChanging.emit(this.fullName);
    console.log("FirstName: ", this.fullName);
  }
  constructor(private sanctionListService: SanctionListService, private router: Router){


  }
  ngOnInit(): void {

  }
  searchValue: string='';
  dataModel!: DataModel;
  onSearchValueEntered(searchResult: string){

    this.searchValue =searchResult;
   this.sanctionListService.getUNEntitySearchResult(this.searchValue).subscribe(data=>{
  this.dataModel =data;

    console.log("User: ", data)
   })
    console.log("SearchValue: "+this.searchValue);
  }
}
