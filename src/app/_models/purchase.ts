
/**
 *  Purchase Interface
 */
export interface Purchase{
    purchase_id:number;
    purchase_date:Date;
    purchaser_first_name:any;
    purchaser_last_name:any;
    purchaser_email:any;
    purchaser_mobile:any;
    product_name:any;
    is_invoice_paid:boolean;    
}