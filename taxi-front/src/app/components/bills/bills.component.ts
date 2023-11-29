import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {BillDTO} from "../../interfaces";
import {BillService} from "../../services/bill.service";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: BillDTO[] = [];
  pageSize = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.getAllBills();
  }

  getAllBills(): void {
    this.billService.getAllBills().subscribe(bills => {
      this.bills = bills;
      this.paginator.length = bills.length;
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.pageSize;
      this.paginator.page.subscribe(page => {
        const startIndex = page.pageIndex * page.pageSize;
        const endIndex = startIndex + page.pageSize;
        this.bills = bills.slice(startIndex, endIndex);
      });
    });
  }

  displayedColumns: string[] = ['amount', 'startLocation', 'endLocation', 'driverName','actions'];

}
