import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
import { Brands } from "app/_models/brands";

@Pipe({
    name: "dataFilter"
})

export class DataFilterPipe implements PipeTransform {
     transform(value: Brands[], filter: string): Brands[] {
     // filter = filter ? filter.toLocaleLowerCase() : '';
      return filter && value ?
        value.filter(brand =>
           (brand.brand_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (brand.terms_conditions_url.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (brand.support_email.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (brand.support_phone.indexOf(filter) !== -1) 
          // (brand.brand_status.indexOf(filter) !== -1)
        ) :
        value;
   }

}