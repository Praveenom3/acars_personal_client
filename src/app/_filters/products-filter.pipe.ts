import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
import { Products } from "app/_models/products";

@Pipe({
    name: "productsFilter"
})

export class ProductsFilterPipe implements PipeTransform {
  status: number;
  transform(value: Products[], filter: string): Products[] {
      filter = filter ? filter.toLocaleLowerCase() : '';
      return filter && value ?
        value.filter(product =>
           (product.product_name.toLocaleLowerCase().indexOf(filter) !== -1)
          /* (product.terms_conditions_url.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (product.support_email.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (product.support_phone.indexOf(filter) !== -1) */
          // (product.product_status.indexOf(filter) !== -1)
        ) :
        value;
   }

}