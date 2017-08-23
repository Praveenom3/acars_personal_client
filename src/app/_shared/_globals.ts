'use strict';

//used in orders and purchases
export const admin_permissions:any = { 
    1 : "Financials",
    3 : "System Admin",
    5 : "Master Data"
};

export const route_permissions:any = { 
    1 : [
            '/admin/summary'
        ],
    3 : [
            '/admin/jobs',
            '/admin/error-log',
            '/admin/activity-log'
        ],
    5 : ['admin/master-data']
};

export const vht_product_keyword: string="VHT";
export const aca16_product_keyword: string="ACA Reporting 2016";
export const aca17_product_keyword: string="ACA Reporting 2017";

//used in orders and purchases
export const products_keywords:any = [
    "VHT","ACA Reporting 2016","ACA Reporting 2017"
];