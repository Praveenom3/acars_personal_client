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
           (adminuser.username.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (adminuser.is_active.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (adminuser.phone_extension.indexOf(filter) !== -1) ||
           (adminuser.mobile.indexOf(filter) !== -1) 
          
        ) :
        value;
   }

}