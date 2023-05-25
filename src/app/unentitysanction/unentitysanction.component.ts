import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataModel } from '../model/DataModel';
import { SanctionListService } from '../services/sanction-list.service';
import { NameAlias } from '../model/eu/NameAlias';

@Component({
  selector: 'app-unentitysanction',
  templateUrl: './unentitysanction.component.html',
  styleUrls: ['./unentitysanction.component.scss']
})
export class UnentitysanctionComponent {
  fullName: string='';
  public sanctionData = [];
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
  console.log( Object.keys(this.dataModel).length);
  this.sanctionData = [...Array(Object.keys(this.dataModel).length).keys()]
    console.log("User: ", this.sanctionData)
   })
    console.log("SearchValue: "+this.searchValue);
  }
}

