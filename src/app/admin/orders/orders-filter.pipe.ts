import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "ordersFilter"
})
export class OrdersFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.client_name.indexOf(query) > -1);
        }
        return array;
    }
}