import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "ordersFilter"
})
export class OrdersFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        query = query ? query.toLocaleLowerCase() : '';
        return query && array ?
        array.filter(client =>
           (client.client_number.toLocaleLowerCase().indexOf(query) !== -1) ||
           (client.client_name.toLocaleLowerCase().indexOf(query) !== -1)
        ) :
        array;
    }
}
