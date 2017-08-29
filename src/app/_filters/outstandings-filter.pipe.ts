import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "outstadingInvoicesFilter"
})

export class OutstandingsFilterPipe implements PipeTransform {
    transform(value: any[], filter: string): any[] {

        filter = filter ? filter.toLocaleLowerCase() : '';

        return filter && value ?
            value.filter(outstandingInvoice =>
                (outstandingInvoice.invoice_created_at.indexOf(filter) !== -1) ||
                (outstandingInvoice.client_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
                (outstandingInvoice.brand_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
                (outstandingInvoice.product_name.toLocaleLowerCase().indexOf(filter) !== -1) ||
                (outstandingInvoice.invoice_no.indexOf(filter) !== -1) ||
                (outstandingInvoice.amount.indexOf(filter) !== -1) ||
                (outstandingInvoice.purchase_date.indexOf(filter) !== -1) ||
                (outstandingInvoice.account_manager.toLocaleLowerCase().indexOf(filter) !== -1)
            ) :
            value;
    }

}