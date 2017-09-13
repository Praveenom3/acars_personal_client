import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { GlobalService } from "app/_services/_global.service";
import { CustomToastrService } from "app/toaster/toaster-service";
import { SettingsService } from "app/_services/_setting.service";
import { Http } from "@angular/http";

import { Setting } from "app/_models/setting";
declare var $: any;

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.css']
})
/**
 * 
 */
export class AccountSettingsComponent implements OnInit {


    public settings: Setting[];
    private _errorMessage: string;

    public settingChangeValue: any[];

    public todayDate: any;
    INPUT_TYPE_TEXT: string = "text";
    INPUT_TYPE_TEXTAREA: string = "textarea";
    INPUT_TYPE_SELECT: string = "select";
    INPUT_TYPE_DATE: string = "date";

    /**
     * 
     * @param _globalService 
     * @param _settingsService 
     * @param _http 
     */

    constructor(
        private _globalService: GlobalService,
        private settingsService: SettingsService,
        private toastrService: CustomToastrService,
        private _http: Http) {
    }

    ngOnInit() {
        this.getSettings();
        this.todayDate = new Date().toJSON().split('T')[0];
    }
    /**
     *  Getting Settings
     */
    public getSettings() {
        this.settingsService.getSettings()
            .subscribe((settings) => {
                this.settings = settings;
            },
            error => { this._errorMessage = error.data }
            );
    }

    /**
     * 
     * @param setting 
     */
    public updateSettings(setting: Setting) {
        if (setting.setting_revised_value == '' || typeof setting.setting_revised_value == 'undefined') {
            return false;
        } else {
            let validationStatus: boolean = this.validateSettings(setting);
            if (validationStatus) {
                this.settingsService.saveSettings(setting)
                    .subscribe((response) => {
                        if (response.success) {
                            this.toastrService.success('Settings Updated Successfully.');
                            this.getSettings();
                        } else {
                            this._errorMessage = 'Record not Updated';
                        }
                    },
                    error => { this._errorMessage = error.data }
                    );
            } else {
                return false;
            }

        }
    }
    /**
     * Account Setting validations instead of form validation used custom validation as setting to do as dynamic
     * 
     * @param setting 
     */
    protected validateSettings(setting) {
        let value = setting.setting_revised_value;
        let status = false;
        switch (setting.setting_validation) {
            case 'email':
                let EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/i;
                if (EMAIL_REGEXP.test(value)) {
                    status = true;
                }
            case 'date':
                let datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
                if (value.match(datePattern)) {
                    status = true;
                }
        }
        return status;
    }
    /**
     * 
     * @param setting 
     */
    public getMinDate(setting: any) {
        if (setting.setting_validation == 'min') {
            return new Date().toJSON().split('T')[0];
        }
        return false;
    }
}
