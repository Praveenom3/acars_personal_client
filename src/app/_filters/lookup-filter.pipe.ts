import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
import { Lookup } from "app/_models/lookup";

@Pipe({
    name: "lookupFilter"
})   

export class LookupFilterPipe implements PipeTransform {
  status: number;
  transform(value: Lookup[], filter: string): Lookup[] {
      filter = filter ? filter.toLocaleLowerCase() : '';
      return filter && value ?
        value.filter(lookup =>
           (lookup.lookup_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (lookup.lookup_option.toLocaleLowerCase().indexOf(filter) !== -1)
          /* (product.terms_conditions_url.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (product.support_email.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (product.support_phone.indexOf(filter) !== -1) */
          // (product.product_status.indexOf(filter) !== -1)
        ) :
        value;
   }

}