import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";
import { Products } from "app/_models/products";

@Pipe({
  name: "productsFilter"
})

export class ProductsFilterPipe implements PipeTransform {
  status: number;
  transform(value: Products[], filter: string): Products[] {

    /*converting integer values to text of value object*/
    if (value) {
      value.forEach((element, index) => {
        if (element.product_type == 1) {
          element.product_type = 'Full Service';
        } else if (element.product_type == 2) {
          element.product_type = 'Self Service';
        } else if (element.product_type == 3) {
          element.product_type = 'Enhanced';
        }
        if (element.applicable_year == 2016) {
          element.applicable_year = "2016";
        } else if (element.applicable_year == 2017) {
          element.applicable_year = "2017";
        }
      });
    }

    filter = (typeof filter !== 'number') ? filter.toLocaleLowerCase() : filter;

    let result = filter && value ?
      value.filter(product =>
        (product.product_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
        (product.applicable_year.indexOf(filter) !== -1) ||
        (product.product_type.toLocaleLowerCase().indexOf(filter) !== -1) ||
        (product.product_full_name.toLocaleLowerCase().indexOf(filter) !== -1)
      ) :
      value;

    /*converting text values to integer of value object*/
    if (value) {
      value.forEach((element, index) => {
        if (element.product_type == "Full Service") {
          element.product_type = 1;
        } else if (element.product_type == "Self Service") {
          element.product_type = 2;
        } else if (element.product_type == "Enhanced") {
          element.product_type = 3;
        }
        if (element.applicable_year == "2016") {
          element.applicable_year = 2016;
        } else if (element.applicable_year == "2017") {
          element.applicable_year = 2017;
        }

      });
    }

    return result;
  }
}