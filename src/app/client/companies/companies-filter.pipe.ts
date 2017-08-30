import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "companiesFilter"
})
export class CompaniesFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        query = query ? query.toLocaleLowerCase() : '';
        return query && array ?
            array.filter(company =>
                (company.company_client_number.toLocaleLowerCase().indexOf(query) !== -1) || 
                (company.client_name.toLocaleLowerCase().indexOf(query) !== -1)
            ) :
            array;
    }
}
