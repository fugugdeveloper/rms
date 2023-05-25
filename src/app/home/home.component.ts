import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../auth/user-auth.service';
import { Name } from '../model/uk/Name';
import { ResponseDetail } from '../model/uk/ResponseDetail';
import { ModalService } from '../services';
import { SanctionListService } from '../services/sanction-list.service';
import { data, map } from 'jquery';
import { NameAlias } from '../model/eu/NameAlias';
import { combineLatest, combineLatestAll, combineLatestWith, debounce, debounceTime, filter, forkJoin } from 'rxjs';
import { DataModel } from '../model/DataModel';
import { PepResponseDetail } from '../model/pep/PepResponseDetail';
import { UnIndividualResponseDetail } from '../model/un/UnIndividualResponse';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { faSquare, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { AdverserResponseDetail } from '../model/adverser/AdverserResponseDetail';
import { NbeBlackList } from '../model/nbeblacklist/NbeBlackList';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  faCirclePlus = faSquarePlus;
  faMagnifyingGlass = faMagnifyingGlass
  faShield = faShieldHalved
  fullName: string = '';
  nameList: Name[];
  len: number;
  detailRetrieved: boolean = false;
  responseDetail: ResponseDetail;
  nameAliasList!: NameAlias[];

  visible: boolean;

  constructor(private router: Router, private userAuthService: UserAuthService, public modalService: ModalService, private sanctionListService: SanctionListService) { }
  ngOnInit(): void {

  }

  title = 'rms';
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
  public logout() {
    this.userAuthService.authLogout();
    this.userAuthService.clear();
    this.router.navigate(['/'])

  }
  reset() { }
  dataset: [];
  public sanctionData = [];
  searchValue: string = '';
  names: Name[];
  dataUkChecker: number = -1;
  dataEuChecker: number = -1;
  dataModel: DataModel;
  dataModelList: DataModel[];
  dataPepChecker: number = -1;
  dataUnIndividualChecker: number= -1;
  pepResponseDetailList: PepResponseDetail[];
  pepResponseDetails: PepResponseDetail[];
  pepData: any[];
  unIndividualResponseDetailList : UnIndividualResponseDetail[];
  unIndividualResponses: UnIndividualResponseDetail[];
  dataAdverserChecker:number= -1
  adverserResponseDetailList: AdverserResponseDetail[];
  adverserResponses: AdverserResponseDetail[];
  dataNbeChecker: number =-1;
  nbeBlackListList: NbeBlackList[];
  public getSearchResult(searchResult: string){
combineLatestWith([
  this.sanctionListService.getNbeBlackListSearchResult(searchResult).pipe(debounceTime(500)).subscribe(data=>{
    this.nbeBlackListList = data;
    if (this.nbeBlackListList?.length > 0) {

      this.dataNbeChecker = 1;
      this.sanctionData = [...Array(Object.keys(data).length).keys()]
      console.log("Data Nbe List", this.nbeBlackListList[0].name);
      console.log("Nbe Data Length: ", this.dataNbeChecker)
    } else {
      this.dataNbeChecker = 0;
      console.log("Data From Nbe Is Not Found");
    }
  }, (error:HttpErrorResponse) => {
    if(error.status ===403){
      this.nbeBlackListList = [];
      this.dataNbeChecker= -1;
    }
    this.nbeBlackListList = [];
    this.dataNbeChecker= -1;
  }),
  this.sanctionListService.getAdverserSearchResult(searchResult).pipe(debounceTime(500)).subscribe(data=>{
    this.adverserResponseDetailList = data;
    if (this.adverserResponseDetailList?.length > 0) {

      this.dataAdverserChecker = 1;
      this.sanctionData = [...Array(Object.keys(data).length).keys()]
      console.log("Data adverser List", this.adverserResponseDetailList[0].name);
      console.log("Adverser Data Length: ", this.dataAdverserChecker)
    } else {
      this.dataAdverserChecker = 0;
      console.log("Data From Adverser Is Not Found");
    }
  }, (error:HttpErrorResponse) => {
    if(error.status===403){
      this.adverserResponseDetailList = [];
      this.dataAdverserChecker= -1;
    }
    this.adverserResponseDetailList = [];
    this.dataAdverserChecker= -1;
  }),
  this.sanctionListService.getEUSearchResult(searchResult).pipe(debounceTime(500)).subscribe(data=>{
    this.nameAliasList = data;
    if (this.nameAliasList?.length > 0) {

      this.dataEuChecker = 1;
      this.sanctionData = [...Array(Object.keys(data).length).keys()]
      console.log("Data EU List", this.nameAliasList[0].wholeName);
      console.log("EU Data Length: ", this.dataEuChecker)
    } else {
      this.dataEuChecker = 0;
      console.log("Data From EU Is Not Found");
    }
  }, (error:HttpErrorResponse) => {
    this.nameAliasList = [];
    this.dataEuChecker= -1;
  }),
      //UK Sanction Service Call
      this.sanctionListService.getUkSearchResult(searchResult).pipe(debounceTime(500)).subscribe(data=>{
        this.nameList = data;
        if (this.nameList?.length > 0) {
          this.dataUkChecker = 1;
          this.sanctionData = [...Array(Object.keys(data[1]).length).keys()]
          console.log("UK Data Length: ", this.dataUkChecker)
          console.log("Data UK List", this.nameList);
        } else {
          this.dataUkChecker = 0;
  
          console.log("Data From UK Is Not Found");
        }
      }, (error:HttpErrorResponse) => {
        this.nameList = []
        this.dataUkChecker =-1;
      }
      ),
            // UNited Nation Individual Search
            this.sanctionListService.getUNIndividualSearchResult(searchResult).pipe(debounceTime(500)).subscribe(data=>{
              this.unIndividualResponseDetailList = data;
        
              if (this.unIndividualResponseDetailList?.length > 0) {
                this.dataUnIndividualChecker = 1;
                console.log("UN Individual Data Length: ", this.dataUnIndividualChecker)
                console.log("Data UN Individual List", this.unIndividualResponseDetailList);
              } else {
                this.dataUnIndividualChecker = 0;
        
                console.log("Data From UN Is Not Found");
              }
            },
            (error:HttpErrorResponse) => {
              if (error.status===403) {
                this.unIndividualResponseDetailList = [];
              this.dataUnIndividualChecker=-1;
              }
              this.unIndividualResponseDetailList = [];
              this.dataUnIndividualChecker=-1;
             }),
      //Politically Exposed People
      this.sanctionListService.getPEPSearchResult(searchResult).pipe(debounceTime(500)).subscribe(data=>{
        this.pepResponseDetailList = data;
        if (this.pepResponseDetailList?.length >0) {
          this.dataPepChecker = 1;
          console.log("PEP Data Length: ", this.dataPepChecker)
          console.log("Data PEP List", this.pepResponseDetailList);
        } else {
          this.dataPepChecker = 0;
  
          console.log("Data From PEP Is Not Found");
        }
      }, (error:HttpErrorResponse) => {
        this.pepResponseDetailList = [];
        this.dataPepChecker = -1;
      })
])
  }
  public getAllSearchResult(searchResult: string) {

    combineLatest(
      [
        //EU Sanction Service Call
        this.sanctionListService.getEUSearchResult(searchResult),
        //UK Sanction Service Call
        this.sanctionListService.getUkSearchResult(searchResult),
        //Politically Exposed People
        this.sanctionListService.getPEPSearchResult(searchResult),
        this.sanctionListService.getUNIndividualSearchResult(searchResult)


      ]
    ).subscribe((data: [NameAlias[], Name[], PepResponseDetail[], UnIndividualResponseDetail[]]) => {
      this.nameAliasList = data[0];
      this.nameList = data[1];
      this.pepResponseDetailList = data[2];
      this.unIndividualResponseDetailList = data[3];
    
      if (this.unIndividualResponseDetailList?.length > 0) {
        this.dataUnIndividualChecker = 1;
        console.log("UN Individual Data Length: ", this.dataUnIndividualChecker)
        console.log("Data UN Individual List", this.unIndividualResponseDetailList);
      } else {
        this.dataUnIndividualChecker = 0;

        console.log("Data From UN Is Not Found");
      }
      if (this.pepResponseDetailList?.length >0) {
        this.dataPepChecker = 1;
        console.log("PEP Data Length: ", this.dataPepChecker)
        console.log("Data PEP List", this.pepResponseDetailList);
      } else {
        this.dataPepChecker = 0;

        console.log("Data From PEP Is Not Found");
      }
      if (this.nameAliasList?.length > 0) {

        this.dataEuChecker = 1;
        this.sanctionData = [...Array(Object.keys(data).length).keys()]
        console.log("Data EU List", this.nameAliasList[0].wholeName);
        console.log("EU Data Length: ", this.dataEuChecker)
      } else {
        this.dataEuChecker = 0;
        console.log("Data From EU Is Not Found");
      }

      if (this.nameList?.length > 0) {
        this.dataUkChecker = 1;
        this.sanctionData = [...Array(Object.keys(data[1]).length).keys()]
        console.log("UK Data Length: ", this.dataUkChecker)
        console.log("Data UK List", this.nameList);
      } else {
        this.dataUkChecker = 0;

        console.log("Data From UK Is Not Found");
      }

      console.log("NameAlias: ", this.nameAliasList);
      console.log("Name: ", this.nameList);
      console.log("PepResponseList: ", this.pepResponseDetailList);
      console.log("UNIndividual: ", this.unIndividualResponseDetailList)

    })

  }

  public getCustomerEuDetail(Id: any) {
    this.modalService.open(Id);
    this.detailRetrieved = true;
    this.visible = true;
    console.log("Id from Arg: ", Id)
    this.sanctionListService.userEUDetail(Id).subscribe(data => {
      this.dataModelList = data;
      console.log("Data: ", data);
    });
  }
  public getCustomerUkDetail(Id: any) {
    console.log("Id In CustomerDetail: ", Id);
    this.modalService.open(Id + "-or");
    console.log("Id from Arg: ", Id as string)
    this.sanctionListService.userUkDetail(Id).subscribe(data => {

      console.log("Names IN Details: ", data.names)
      console.log("Id from Arg After call: ", Id)
      this.responseDetail = data;
      this.names = this.responseDetail.names;
      this.detailRetrieved = true;
      console.log("ResponseDetail.Names: ", data.names)


      console.log("Data: ", data);
    });
  }
  public getPepCustomerDetail(Id: any) {
    console.log("Id In CustomerDetail: ", Id);
    this.modalService.open(Id + "-or");
    console.log("Id from Arg: ", Id as string)
    this.sanctionListService.userPEPDetail(Id).subscribe(data => {
      this.pepResponseDetails = data;
      console.log("PEP IN Details: ", this.pepResponseDetails)
      console.log("Id from Arg After call: ", Id)
      this.detailRetrieved = true;
      console.log("PepResponseDetail: ", this.pepResponseDetails)
      console.log("Data: ", data);
    });
  }
  public getUnIndividualCustomerDetail(Id: any){
    console.log("Id in UN CustomerDetail: ", Id);
    this.modalService.open(Id + "-or");
    console.log("Id from Arg: ", Id as string)
    this.sanctionListService.userUnIndividualDetail(Id).subscribe(data => {
      this.unIndividualResponses = data;
      console.log("UN Individual IN Details: ", this.unIndividualResponses)
      console.log("Id from Arg After call: ", Id)
      this.detailRetrieved = true;
      console.log(": ", this.unIndividualResponses)
      console.log("Data: ", data);
    });
  }
}
