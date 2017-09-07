import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SearchScreenService } from 'app/_services/_search-screen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';
import { GlobalService } from 'app/_services/_global.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-search',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchResultsComponent implements OnInit {
  key: any;
  _errorMessage: any;
  searchResults: any[] = [];

  searchData: any;

  constructor(private adminUserService: SearchScreenService,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: ClientDashBoardService,
    private globalService: GlobalService,
    private toastrService: ToastrService,
  ) {

    route.queryParams.subscribe(
      data => {
        this.key = data['key'];
        this.getSerachResults(this.key);
      }
    );

  }

  ngOnInit() {

  }

  getSerachResults(key) {
    this.adminUserService.getAdminSearchDetails(key)
      .subscribe((searchResults) => {
        if (searchResults) {
          this.searchResults = [];
          this.searchResults = searchResults;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }


  /**
   * redirectToClientDashBoard
   */
  public redirectToClientDashBoard(client: any) {
    if (client.client_id) {
      this.dashboardService.getClientDashBoardData(client.client_id)
        .subscribe((result) => {
          if (result.success) {
            localStorage.setItem('productsAndClients', JSON.stringify(result.data))
            let products = result.data;
            if (products && products != null && products != 'null' && products != '') {
              let productsList = Object.keys(products).map(function (key) {
                return products[key]
              })
              let product;
              let maxApplicableYear = 0;
              productsList.forEach(element => {
                if (element.applicable_year > maxApplicableYear) {
                  maxApplicableYear = element.applicable_year
                  product = element;
                }
              });

              let clientKeys: any[] = Object.keys(product.clients);
              let client = product['clients'][clientKeys[0]];

              let clientId: any = this.globalService.encode(client['client_id']);
              let productId: any = this.globalService.encode(product.product_id);
              this.dashboardService.setBrandData(product.product_id, client['client_id'])
              this.router.navigate(['/client/' + productId + '/' + clientId + '/dashboard']);
            } else {
              this.router.navigate(['/products-not-exists']);
            }
          } else {
            this.toastrService.error(result.data);
          }
        },
        error => {
          this._errorMessage = error.data;
          this.toastrService.error(error.data);
        }
        );
    } else {
      this.toastrService.error("Client id not exists");
    }
  }
}