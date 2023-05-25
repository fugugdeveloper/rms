import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { SanctionListService } from '../services/sanction-list.service';
import { Name } from '../model/uk/Name';
import { ModalService } from '../services';
import { ResponseDetail } from '../model/uk/ResponseDetail';

@Component({
  selector: 'app-uksanction',
  templateUrl: './uksanction.component.html',
  styleUrls: ['./uksanction.component.scss']
})
export class UksanctionComponent {
  fullName: string='';
  nameList: Name[];
  ukchecking: boolean= false;
  euchecking: boolean= false;
  unchecking: boolean= false;
  checking: boolean= false;
  checked: boolean=false;
  len: number;
  detailRetrieved: boolean=false;
  responseDetail: ResponseDetail ;
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
  dataset: [];
  public sanctionData = [];
  searchValue: string=''; 
  names: Name[];
  public getUkSearch(searchResult: string){

    this.searchValue =searchResult;
   this.sanctionListService.getUkSearchResult(this.searchValue).subscribe(data=>{
  this.nameList =data;
  console.log("namesId: ",this.nameList[0].id);

  this.sanctionData = [...Array(Object.keys(this.nameList).length).keys()]
  this.len =this.sanctionData.length;
  console.log("Len: ", this.len)
  console.log("Data: ", this.nameList);
   
   })
   
  
  }
  public getCustomerUkDetail(Id: any){
    console.log("Id In CustomerDetail: ", Id);
    this.modalService.open(Id+"-or");
  console.log("Id from Arg: ", Id as string)
   this.sanctionListService.userUkDetail(Id).subscribe(data=>{

    console.log("Names IN Details: ", data.names)
    console.log("Id from Arg After call: ", Id)
    this.responseDetail =data;
    this.names = this.responseDetail.names;
    this.detailRetrieved = true;
    console.log("ResponseDetail.Names: ", data.names)


    console.log("Data: ", data);
  });
}
 
}


