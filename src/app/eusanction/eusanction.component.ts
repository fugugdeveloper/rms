import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SanctionListService } from '../services/sanction-list.service';
import { NameAlias } from '../model/eu/NameAlias';
import { DataModel } from '../model/DataModel';
import { ModalService } from '../services';

@Component({
  selector: 'app-eusanction',
  templateUrl: './eusanction.component.html',
  styleUrls: ['./eusanction.component.scss']
})
export class EusanctionComponent {
  nameAliasList!: NameAlias[];
  fullName: string='';
  len: number; 

  visible: boolean;
  detailRetrieved: boolean=false;
  @Output()
  searchValueChanging: EventEmitter<string>= new EventEmitter<string>();
  onSearchValueChanged(){
    this.searchValueChanging.emit(this.fullName);
    console.log("FirstName: ", this.fullName);
  }
  constructor(public modalService: ModalService, private sanctionListService: SanctionListService, private router: Router){

  }
  ngOnInit(): void {

  }
 reset()
{
  
}

  searchValue: string='';
 
  dataModelList!: DataModel[];
  public sanctionData = [];
  public getEuSearch(searchResult: string){

    this.searchValue =searchResult;
   this.sanctionListService.getEUSearchResult(this.searchValue).subscribe(data=>{
  this.nameAliasList =data;

  this.sanctionData = [...Array(Object.keys(this.nameAliasList).length).keys()]
  this.len =this.sanctionData.length;
  console.log("Len: ", this.len)
  console.log("NameAlias: ", this.nameAliasList)
    console.log("User: ", this.sanctionData.length)
   });
    console.log("SearchValue: "+this.searchValue);
  }
  public getCustomerEuDetail(Id: any){
    this.modalService.open(Id);
    this.detailRetrieved =true;
    this.visible = true;
  console.log("Id from Arg: ", Id)
   this.sanctionListService.userEUDetail(Id).subscribe(data=>{
    this.dataModelList =data;
    console.log("Data: ", data);
  });
}
}

