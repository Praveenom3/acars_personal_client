import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { GlobalService } from "app/_services/_global.service";
import { ToastrService } from "ngx-toastr";
import { SettingsService } from "app/_services/_setting.service";
import { Http } from "@angular/http";

import { Setting } from "app/_models/setting";
declare var $:any;

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

    public settingChangeValue:any[];

    INPUT_TYPE_TEXT:string = "text";
    INPUT_TYPE_TEXTAREA:string = "textarea";
    INPUT_TYPE_SELECT:string = "select";
    INPUT_TYPE_DATE:string = "date";

    /**
     * 
     * @param _globalService 
     * @param _settingsService 
     * @param _http 
     */
    
    constructor(
        private _globalService: GlobalService,
        private settingsService: SettingsService,
        private toastrService: ToastrService,
        private _http: Http) {
    }

  ngOnInit() {
      this.getSettings();
  }
  /**
   *  Getting Settings
   */
    public getSettings()
    {
      this.settingsService.getSettings()
          .subscribe((settings)=>{
              this.settings = settings;
          },
          error=>{ this._errorMessage = error.data}
          );
  }
  /* 
   //Todo Need to create Directives individually for single input type.
  public getInputFieldForSettings(setting : Setting)
  {
    let fieldType = setting.setting_field_type;
    let inputField:string;
    switch(fieldType){
      case this.INPUT_TYPE_TEXT:
            inputField = '<input type="text" class="form-control" id="changed_value_'+ setting.setting_id +'" maxlength="60" value="">';
      break;
      case this.INPUT_TYPE_TEXTAREA:
      break;
      case this.INPUT_TYPE_SELECT:
      break;
      case this.INPUT_TYPE_DATE:
      break;
      default:
      break;
    }
    return inputField;
  } */

/**
 * 
 * @param setting 
 */
  public updateSettings(setting:Setting)
  {
      if(setting.setting_revised_value == '' || typeof setting.setting_revised_value == 'undefined')
        {
            return false;
        }else{

            this.settingsService.saveSettings(setting)
                        .subscribe((response) => {
                              if (response.success) {
                                  this.toastrService.success('Settings Updated Successfully.');
                                  this.getSettings();
                              } else {
                                  this._errorMessage = 'Record not Updated';
                              }
                          },
                        error=>{this._errorMessage = error.data}
                      );
        }
  }
}
