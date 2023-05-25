import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataModel } from '../model/DataModel';
import { SanctionListService } from '../services/sanction-list.service';
import { NgForm } from '@angular/forms';
import { PepResponseDetail } from '../model/pep/PepResponseDetail';

@Component({
  selector: 'app-pepsanction',
  templateUrl: './pepsanction.component.html',
  styleUrls: ['./pepsanction.component.scss']
})
export class PepsanctionComponent {

  // fullName: string;
  // searchValue: string='';
  // dataModel!: DataModel;
  // search(searchForm:NgForm){
  //   this.sanctionListService.getSearchResult(this.fullName).subscribe((response:any)=>{
  //     console.log("Response Content: ", response);
  //     this.dataModel=response;
  //   },
  //   (error)=>{
  //     console.log("Error: ", error);
  //   });
  // }
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
  dataModel!: PepResponseDetail[];
  onSearchValueEntered(searchResult: string){

    this.searchValue =searchResult;
   this.sanctionListService.getPEPSearchResult(this.searchValue).subscribe(data=>{
  this.dataModel =data;

    console.log("User: ", data)
   })
    console.log("SearchValue: "+this.searchValue);
  }
}
