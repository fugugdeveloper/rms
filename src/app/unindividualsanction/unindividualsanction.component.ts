import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataModel } from '../model/DataModel';
import { SanctionListService } from '../services/sanction-list.service';
import { UnIndividualResponseDetail } from '../model/un/UnIndividualResponse';

@Component({
  selector: 'app-unindividualsanction',
  templateUrl: './unindividualsanction.component.html',
  styleUrls: ['./unindividualsanction.component.scss']
})
export class UnindividualsanctionComponent {
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
  dataModel!: UnIndividualResponseDetail[];
  onSearchValueEntered(searchResult: string){

    this.searchValue =searchResult;
   this.sanctionListService.getUNIndividualSearchResult(this.searchValue).subscribe(data=>{
  this.dataModel =data;

    console.log("User: ", data)
   })
    console.log("SearchValue: "+this.searchValue);
  }
}
