import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CurrencyPipe} from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tax-filing',
  templateUrl: './tax-filing.component.html',
  styleUrls: ['./tax-filing.component.css']
})
export class TaxFilingComponent implements OnInit {
  data : any ={};
  completed: boolean = false;
  state: string="";
  step=0;
  isEditable = false;
  mobileQueryMax : boolean =false;
  filingType:string="0";
  filingName: string ="";
  radioType= [{"value" : "0", "name" : "Ordinary Filing", "namedesc": "type of income earned by an organization"},{"value" : "1" , "name" : "Additional Filing" , "namedesc": "an exemption that can be made to either individual"}];
  month = [{"value": "01" , "month": "January"} , {"value":"02", "month" :"February"},{ "value" : "03" , "month":"March"}, {"value": "04" , "month":"April"},{"value":  "05" , "month":"May"},{"value":  "06" , "month":"June"},
  {"value": "07" , "month" :"July"},{"value": "08","month":"August"},{"value":  "09" , "month":"September"},{"value":  "10" , "month":"October"},{"value":  "11" , "month":"November"}
  ,{"value":  "12" , "month":"December"}];
  monthFilter : any = this.month;
  year = ["2020", "2021", "2022", "2023"];
  saleAmount : number = 0.00;
  taxAmount  : number = 0.00;
  surcharge: number = 0.00;
  penalty : number = 0.00;
  totalAmount: number = 0.00;
  InvalidTax : boolean = false;
  taxData : any ={};
constructor(private _formBuilder: FormBuilder, public breakpointObserver: BreakpointObserver, private  CurrencyPipe: CurrencyPipe) {
    this.breakpointObserver
    .observe(['(max-width: 767px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.mobileQueryMax = true
      } else {
        this.mobileQueryMax = false
      }
    });
  }
  ngOnInit(): void {
    //Date
    this.data.ToDay =  new Date()
    //set data default
    const d = new Date();
    let month = d.getMonth();
    this.data.currentMonth  = month +1;
    this.month.forEach(item => {
      if(parseInt(item.value) == this.data.currentMonth){
        this.data.Month  = item.month;
      }
    });
    let year = d.getFullYear();
    this.data.currentYear  = year;
    this.data.Year  = year;
    this.data.Type = 'On-Time';
  };
  onBlur(event : any){
    const string = event.target.value;
    const substring = ",";
    var check = string.includes(substring)
    if (event.target.value !== '' && !check){
      event.target.value = new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(event.target.value.replace(',', ''))
    }else{
      event.target.value = new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(event.target.value.replace(',', ''))
    }
  };
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }
    return true;
  };
  changefilingType(){
    this.surcharge =0;
    this.penalty =0;
    this.saleAmount = 0.00;
    this.taxAmount   = 0.00;
    this.totalAmount= 0.00;
    this.InvalidTax= false;
  };
  changesaleAmount(data :any){
    var saleAmount : any = this.saleAmount;
    var stringNum = saleAmount.indexOf(',');
    var number =this.saleAmount;
    if(stringNum>=1){
      number = saleAmount.replace(',', '')
      this.saleAmount = number;
    }
    var sum : any =(number * 0.07)
    this.taxAmount = sum.toFixed(2);
    this.data.taxAmount = this.taxAmount;
    var num : any = this.taxAmount;
    var tax = parseFloat(num);
    if(this.filingType=='1'){
      var sum1 : any =  (this.taxAmount * 0.1)
      this.surcharge = sum1.toFixed(2);
      this.penalty = 2000.00;

      var num2 : any = this.surcharge

      var surcharge = parseFloat(num2);
      var sumtotal = (tax + surcharge + this.penalty)
      this.totalAmount = sumtotal;
    }else{
      this.totalAmount = tax;
    }
    this.InvalidTax =false;
  };
  changetaxAmount(data :any){
    var taxAmount : any = this.taxAmount;
    var stringNum = taxAmount.indexOf(',');
    var tax =this.taxAmount;
    if(stringNum>=1){
      tax = taxAmount.replace(',', '')
      this.taxAmount = tax;
    }
    var chk = false;
    if(parseFloat(this.data.taxAmount) - tax >=20){
      chk = true;
    }else if(tax - parseFloat(this.data.taxAmount) >=20){
      chk = true;
    };
    this.InvalidTax =chk;
    var sum : any =  (this.taxAmount * 0.1)
    this.surcharge = sum.toFixed(2);
    this.penalty = 2000.00;
    var num : any = this.taxAmount
    var num2 : any = this.surcharge
    var tax1 = parseFloat(num);
    var surcharge = parseFloat(num2);
    var sumtotal = (tax1 + surcharge + this.penalty);
    this.totalAmount = sumtotal;
  };
  checkMionthByYear(){
    if(this.data.currentYear == this.data.Year){
      this.monthFilter=[];
      this.month.forEach(item => {
        if(parseInt(item.value) <= this.data.currentMonth){
          this.monthFilter.push(item.value)
        }
      });
    }else{
      this.month.forEach(item => {
        this.monthFilter.push(item.value)
      });
    }
  }
  filterMonth(data:any){
    this.monthFilter=[];
    if(this.data.currentYear == this.data.Year){
      this.month.forEach(item => {
        if(parseInt(item.value) <= this.data.currentMonth){
          this.monthFilter.push(item)
        }
      });
    }else{
      this.month.forEach(item => {
        this.monthFilter.push(item)
      });
    }
    return this.monthFilter;
  };
  parseFloat(data: any){
    return parseFloat(data);
  };
  nextStep(){
    if(this.saleAmount <=0){
      Swal.fire({
        title: 'Plese fill total value',
        text: 'Total value must more than 0.00',
        confirmButtonColor: '#f0ad4e',
        icon: 'error',
        showCancelButton: false,
      });
    }else if(this.InvalidTax){
      Swal.fire({
        title: 'Invalid Data Total VAT more than/less than 70.00',
        text: 'Plese fill Total VAT more than/less than 70.00',
        confirmButtonColor: '#f0ad4e',
        icon: 'error',
        showCancelButton: false,
      });
    }else{
      this.step=1;
      var findname : any = this.radioType.find(x => x.value == this.filingType);
      this.filingName =  findname.name;
      var saleAmount:any = this.saleAmount
      var taxAmount :any = this.taxAmount
      var surcharge :any = this.surcharge
      var penalty :any = this.penalty
      var totalAmount :any = this.totalAmount
      //number
      var saleAmount1:any = parseFloat(saleAmount).toFixed(2)
      var taxAmount1 :any =  parseFloat(taxAmount).toFixed(2)
      var surcharge1 :any = parseFloat(surcharge).toFixed(2)
      var penalty1 :any = parseFloat(penalty).toFixed(2)
      var totalAmount1 :any = parseFloat(totalAmount).toFixed(2)
      this.taxData = {
        filingType:   findname.name,
        month: this.data.Month,
        year:  this.data.Year,
        saleAmount:   parseFloat(saleAmount1),
        taxAmount:  parseFloat(taxAmount1),
        surcharge: parseFloat(surcharge1),
        penalty: parseFloat(penalty1),
        totalAmount:  parseFloat(totalAmount1),
      }
    }
  }
}
