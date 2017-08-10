import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
import { AdminUser } from "app/_models/admin-user";

@Pipe({
    name: "dataFilter"
})

export class AdminUserFilterPipe implements PipeTransform {
     transform(value: AdminUser[], filter: string): AdminUser[] {
      filter = filter ? filter.toLocaleLowerCase() : '';
      return filter && value ?
        value.filter(adminuser =>
           (adminuser.first_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (adminuser.last_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (adminuser.email_address.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (adminuser.status.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (adminuser.extension.indexOf(filter) !== -1) ||
           (adminuser.phone.indexOf(filter) !== -1) 
          
        ) :
        value;
   }

}