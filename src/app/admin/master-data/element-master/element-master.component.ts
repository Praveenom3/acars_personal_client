import { Component, OnInit } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ElementMasterService } from "app/_services/_element-master.service";
import { CustomToastrService } from "app/toaster/toaster-service";
import { Http } from "@angular/http";
import { Elements } from "app/_models/elements";

@Component({
    selector: 'app-element-master',
    templateUrl: './element-master.component.html',
    styleUrls: ['./element-master.component.css']
})
export class ElementMasterComponent implements OnInit {

    section_id: any;
    _submitted: boolean;
    elementSelected: Elements;

    public product_id: any;
    public elements: any;
    _errorMessage: any;
    public selectedSectionElements: Array<any> = [];

    public filterQuery = "";
    public rowsOnPage = 10;

    public products: any[] = [
        { id: 1, product_name: 'ACA 2016' },
        { id: 2, product_name: 'ACA 2017' }
    ];

    public selectedProduct = '';
    public selectedSection='';
    public isSelectSection = true;

    public sections: any[] = [
        { id: 1, section: 'Basic Information' },
        { id: 2, section: 'Large Emplpoyee Status' },
        { id: 3, section: 'Plan Offering Criteria' },
        { id: 4, section: 'Designed Government Entity' },
        { id: 5, section: 'Aggregated Group' },
        { id: 6, section: 'Anything Else to Tell Us' },
        { id: 7, section: 'General Plan Information' },
        { id: 8, section: 'MEC Coverage' },
        { id: 9, section: 'Coverage Type and Waiting Period' },
        { id: 10, section: 'Type of coverage offered' },
        { id: 11, section: 'Employee Contribution' },
    ];


    constructor(private elementMasterService: ElementMasterService,
        private toastrService: CustomToastrService) {

    }

    /*calls when page on load*/
    ngOnInit() {
        this.elementSelected = this.createNewElement();
        this.getElementData();
    }

    createNewElement() {
        // Create a new Element
        let newElement: Elements = {
            element_id: 0,
            product_id: '',
            section_id: '',
            element_serial_id: '',
            element_label: '',
            created_by: '',
            created_at: '',
            updated_at: '',
            updated_by: '',
            is_deleted: ''
        }
        return newElement;
    }

    /*getting elements from service*/
    public getElementData() {
        this.elementMasterService.getElementData()
            .subscribe((elements) => {
                if (elements) {
                    this.elements = elements;
                }
            },
            error => { this._errorMessage = error.data }
            );
    }


    onChangeSection(section_id) {
        this.section_id = section_id;
        this.selectedSectionElements = [];
        if (this.product_id && section_id) {
            for (let element of this.elements) {
                if (element.section_id == section_id && element.product_id == this.product_id) {
                    this.selectedSectionElements.push(element);
                }
            }
        }
    }

    onChangeProduct(product_id) {
        if (product_id !== "") {
            this.isSelectSection = false;
        }else{
            this.isSelectSection = true;
        }
        this.selectedSectionElements = [];
        this.selectedSection = '';
        this.product_id = product_id;
    }

    private _setFormErrors(errorFields: any): void {
        for (let key in errorFields) {
            let message = errorFields[key];
            this.toastrService.error(message);
        }
    }

    updateProduct(element) {
        this.elementSelected = this.createNewElement();
        this.elementSelected = Object.assign({}, element);
        this.elementMasterService.updateElement(this.elementSelected).subscribe(
            result => {
                if (result.success) {
                    this.toastrService.success('Element Label Updated Succesfully.');
                } else {
                    this.onChangeSection(this.section_id);
                    this._errorMessage = 'Not Updated.';
                    this._submitted = false;
                }
            },
            error => {
                this.onChangeSection(this.section_id);
                this._submitted = false;
                if (error.status == 422) {
                    let errorFields = JSON.parse(error.data.message);
                    this._setFormErrors(errorFields);
                } else {
                    this._errorMessage = error.data;
                }
            });
    }

}
