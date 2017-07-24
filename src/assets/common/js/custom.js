var url = document.URL;

var array = url.split("/");

var base = array[3];

if (array[2] == 'localhost') {
	var staticurl = '/' + base ;
	//var url_action = array[6].split("?")[0];
} else {
	var staticurl = '/';
	// var url_action = array[5].split("?")[0];
}


function shadowFirmlogin(){
	if(document.getElementById('example-firm-login').value == ''){
		toastr.error('Please Select A Firm to Login');
		document.getElementById("example-firm-login").style.borderColor = "red";
		document.getElementById("example-firm-login").focus();
	}else{
		url= staticurl + 'firm/dashboard'; 
		location = url;
	}
}

function shadowClientlogin(){
	if(document.getElementById('example-client-login').value == ''){
		toastr.error('Please Select A Client to Login');
		document.getElementById("example-client-login").style.borderColor = "red";
		document.getElementById("example-client-login").focus();
	}else{
		url= staticurl + 'client/dashboard'; 
		location = url;
	}
}


function showaddmodal()
{
	$('.field-systempricing-basic').removeClass('has-error');
	$('.field-systempricing-basic').find('div.help-block').html('');
	document.getElementById("systempricing-basic").value = '';
	//document.getElementById("systempricing-full_service").style.borderColor = "";
	$('.field-systempricing-full_service').removeClass('has-error');
	$('.field-systempricing-full_service').find('div.help-block').html('');
	document.getElementById("systempricing-full_service").value = '';
	//document.getElementById("systempricing-bulk").style.borderColor = "";
	$('.field-systempricing-bulk').removeClass('has-error');
	$('.field-systempricing-bulk').find('div.help-block').html('');
	document.getElementById("systempricing-bulk").value = '';
	
	$('#add_pricing_details').modal('show');
	
}



function validateaddpricing()
{
	
	if (document.getElementById("systempricing-basic").value == '') {
		//document.getElementById("systempricing-basic").style.borderColor = "red";
		$('.field-systempricing-basic').addClass('has-error');
		$('.field-systempricing-basic').find('div.help-block').html('Basic required');
		document.getElementById("systempricing-basic").focus();
		return false;
	} else {
		//document.getElementById("systempricing-basic").style.borderColor = "";
		$('.field-systempricing-basic').removeClass('has-error');
		$('.field-systempricing-basic').find('div.help-block').html('');
		
	}
	
	if (document.getElementById("systempricing-full_service").value == '') {
		//document.getElementById("systempricing-full_service").style.borderColor = "red";
		$('.field-systempricing-full_service').addClass('has-error');
		$('.field-systempricing-full_service').find('div.help-block').html('Full Service required');
		document.getElementById("systempricing-full_service").focus();
		return false;
	} else {
		//document.getElementById("systempricing-full_service").style.borderColor = "";
		$('.field-systempricing-full_service').removeClass('has-error');
		$('.field-systempricing-full_service').find('div.help-block').html('');
		
	}
	
	if (document.getElementById("systempricing-bulk").value == '') {
		//document.getElementById("systempricing-bulk").style.borderColor = "red";
		$('.field-systempricing-bulk').addClass('has-error');
		$('.field-systempricing-bulk').find('div.help-block').html('Bulk required');
		document.getElementById("systempricing-bulk").focus();
		return false;
	} else {
		//document.getElementById("systempricing-bulk").style.borderColor = "";
		$('.field-systempricing-bulk').removeClass('has-error');
		$('.field-systempricing-bulk').find('div.help-block').html('');
		
	}
	
}


function validateupdatepricing()
{
	
	if (document.getElementById("systempricing-update-basic").value == '') {
		//document.getElementById("systempricing-update-basic").style.borderColor = "red";
		$('.field-systempricing-update-basic').addClass('has-error');
		$('.field-systempricing-update-basic').find('div.help-block').html('Basic required');
		document.getElementById("systempricing-update-basic").focus();
		return false;
	} else {
		$('.field-systempricing-update-basic').removeClass('has-error')
		//document.getElementById("systempricing-update-basic").style.borderColor = "";
		$('.field-systempricing-update-basic').find('div.help-block').html('');
		
	}
	
	if (document.getElementById("systempricing-update-full_service").value == '') {
		//document.getElementById("systempricing-update-full_service").style.borderColor = "red";
		$('.field-systempricing-update-full_service').addClass('has-error');
		$('.field-systempricing-update-full_service').find('div.help-block').html('Full Service required');
		document.getElementById("systempricing-update-full_service").focus();
		return false;
	} else {
		$('.field-systempricing-update-full_service').removeClass('has-error');
		//document.getElementById("systempricing-update-full_service").style.borderColor = "";
		$('.field-systempricing-update-full_service').find('div.help-block').html('');
		
	}
	
	if (document.getElementById("systempricing-update-bulk").value == '') {
		//document.getElementById("systempricing-update-bulk").style.borderColor = "red";
		$('.field-systempricing-update-bulk').addClass('has-error');
		$('.field-systempricing-update-bulk').find('div.help-block').html('Bulk required');
		document.getElementById("systempricing-update-bulk").focus();
		return false;
	} else {
		//document.getElementById("systempricing-update-bulk").style.borderColor = "";
		$('.field-systempricing-update-bulk').removeClass('has-error');
		$('.field-systempricing-update-bulk').find('div.help-block').html('');
		
	}
	
}

function openFirmmodal(id){
	/*if(document.getElementById('firm_id').value == ''){
		toastr.error('Please Select A Firm to Login');
		document.getElementById("firm_id").style.borderColor = "red";
		document.getElementById("firm_id").focus();
	}else{
		//url= staticurl + 'firm/dashboard'; 
		//location = url;
		document.getElementById("firm_id").style.borderColor = "";
	}
	
	if(document.getElementById('client_id').value == ''){
		toastr.error('Please Select A Firm to Login');
		document.getElementById("client_id").style.borderColor = "red";
		document.getElementById("client_id").focus();
	}else{
		//url= staticurl + 'firm/dashboard'; 
		//location = url;
		document.getElementById("client_id").style.borderColor = "";
	}*/
	if(id== 1){
		$('a#modal_go_firmlist').attr('href', '/firm-list');
		$('#modal-firm-list').modal('show');
	}else{
		$('a#modal_go').attr('href', '/firm-plan/client-plan-years?id=1');
		$('#modal-firm-details').modal('show');
	}
	
}

 
					
function addNewplan(){
 
	var value = $('#selected_plan').val();
	if(value != ''){
		$('#add_new_plan').removeClass('cursor-nodrop');
	}else{
		$('#add_new_plan').addClass('cursor-nodrop');
	}
}

function cancelButton(id){
	/*	if(id== 1){
	    $('a#modal_go3').attr('href', '/search');
		$('#cancel_modal').modal('show');
		}else if(id == 2) {
	    $('a#modal_go3').attr('href', '/search');
		$('#cancel_modal').modal('show');
		}else{
		$('a#modal_go3').attr('href', '/search');
		$('#cancel_modal').modal('show');	
		}*/
	
}

function specificLasers(){
	var value = document.getElementById('specific_lasers').value
	
	if(value == 1){
		$('#laser_details').removeClass('hide');
	}else{
		$('#laser_details').addClass('hide');
	}
}

function specificContract(){
	var value = document.getElementById('specific_contract').value
	
	if(value == 1){
		$('#amount').removeClass('hide');
	}else{
		$('#amount').addClass('hide');
	}
}

function loopContribution(addCount,fieldsetcount){
	var divstoappend = '';
 
	 
	for (i=1, j=1; i<=addCount; i++ , j++){
		    divstoappend += '<fieldset class="fieldset-box">'
		+'<legend> Plan '+fieldsetcount+' Contribution </legend>'
		+'<div class="col-md-12 padding-0">' 
			+'<div class="col-md-3">'
			+'	<label> Contribution Name</label>'
		+	'</div>'
			+'<div class="col-md-5">'
			+	'<input class="form-control  placeholder-italics" onkeypress="return planscreenname(event);"/>'
			+'</div>'
			+	'<div class="col-md-12 padding-top-10">' 
			+	    '<table class="table table-hover table-backcolor" id="editable_contributions_track_'+fieldsetcount+'">'
				+	'<thead>'
				+	'<tr>' 
			+'<th class="width-10" id="contribution'+fieldsetcount+'-column-1">Tier No.</th>'
			+'<th class="width-18" id="contribution'+fieldsetcount+'-column-2">Tier Name</th>'
			+'<th class="width-24" id="contribution'+fieldsetcount+'-column-3">Monthly Rates</th>'
			+'<th class="width-22" id="contribution'+fieldsetcount+'-column-4">Monthly Enrollment</th>'
			+'<th class="width-22" id="contribution'+fieldsetcount+'-column-5">Add Row</th>'
			+'</tr>'
			+'</thead>'
			+'<tbody>'
			+'<tr  id="contribution-enrollment-row-1-'+fieldsetcount+'">'
			+'<td id="contribution'+fieldsetcount+'-left-header-1"> 1</td>'
			+'<td><select class="form-control reinsurance-rates-td" id="contribution'+fieldsetcount+'-2-1" class="form-control reinsurance-rates-td text-align-center">'
			+'<option>Employee</option>'
			+'<option>Employee + Spouse</option>'
			+'<option>Employee + Child</option>'
			+'<option>Employee + Child(ren)</option>'
			+'<option>Family</option>'
			+'<option>Employee + 1</option>'
			+'<option>Employee + 2</option>'
			+'<option>Employee + 3</option>'
			+'</select>'
			+'</td>'
			+'<td><div class="input-group">'
										+'<span class="input-group-addon">'
										+'	<i class="fa fa-usd  color-black"></i>'
									+'	</span><input type="text" id="contribution'+fieldsetcount+'-3-1" class="form-control reinsurance-rates-td text-align-center price" value="99.00">'
									+'	</div></td>'
+'<td><div class="input-group">'
										+'<span class="input-group-addon">'
										+'	<i class="fa fa-usd  color-black"></i>'
									+'	</span><input type="text" id="contribution'+fieldsetcount+'-4-1" class="form-control reinsurance-rates-td text-align-center price" value="68.00"></div></td>'
+' <td class="select_tiers" ><select class="form-control cursor-pointer  reinsurance-rates-td contribution-change-function" id="contribution_premium_tiers_1_'+fieldsetcount+'"  >'
																	+'<option selected value="1">1 tier</option>'
																		+'<option  value="2">2 tiers</option>'
																		+'<option value="3">3 tiers</option>'
																		+'<option value="4">4 tiers</option>'
																+'<option value="5">5 tiers</option>'
																	+'<option value="6">6 tiers</option>'
																+'	</select></td>'
+'</tr>' 
+'</tbody>'
+'</table> 	</div>'
+		'</div>'
+'</fieldset>'
		
                   fieldsetcount++;
}
	 
	 $('#contribution_strategies').append(divstoappend);
}

function employeeContribution(){
	var value_select = document.getElementById('select_employee_contribution').value
	
var fieldsetCount = $('#contribution_strategies fieldset').length ;
	var fieldCount = fieldsetCount+1;
	if(value_select > fieldsetCount){
		var count = value_select - fieldsetCount;
		loopContribution(count ,fieldCount);
	}else{
		
		$('a#alert-meassage-id-select').attr('onclick','addContribution('+value_select+','+fieldCount+');');
		$('#alert_message_select').modal('show');
	}
	

	/*if(value != null){
		
		$('#contribution_strategies').html('');
		loopContribution(value);
	}else{
		$('#contribution_strategies').addClass('hide');
	}*/
}

function addContribution(value_select,fieldCount){
	$('#contribution_strategies').html('');
	var fieldCount = 1;
	loopContribution(value_select,fieldCount);
	$('#alert_message_select').modal('hide');
}
function addrenewalContribution(value_select,fieldCount){
	$('#renewal_contribution_strategies').html('');
	var fieldCount = 1;
	looprenewalContribution(value_select,fieldCount);

	$('#alert_message_select').modal('hide');
}

function looprenewalContribution(addCount,fieldsetcount){
	var divstoappend = '';
	for (i=1; i<=addCount; i++){
		    divstoappend += '<fieldset class="fieldset-box">'
		+'<legend> Plan '+fieldsetcount+' Contribution </legend>'
		+'<div class="col-md-12 padding-0">' 
			+'<div class="col-md-3">'
			+'	<label> Contribution Name</label>'
		+	'</div>'
			+'<div class="col-md-5">'
			+	'<input class="form-control  placeholder-italics" onkeypress="return planscreenname(event);"/>'
			+'</div>'
			+	'<div class="col-md-12 padding-top-10">' 
			+	    '<table class="table table-hover table-backcolor" id="editable_contributions_track_copy_'+fieldsetcount+'">'
				+	'<thead>'
				+	'<tr>' 
			+'<th class="width-10" id="contributioncopy'+fieldsetcount+'-column-1">Tier No.</th>'
			+'<th class="width-18" id="contributioncopy'+fieldsetcount+'-column-2">Tier Name</th>'
			+'<th class="width-24" id="contributioncopy'+fieldsetcount+'-column-3">Monthly Rates</th>'
			+'<th class="width-22" id="contributioncopy'+fieldsetcount+'-column-4">Monthly Enrollment</th>'
			+'<th class="width-22" id="contributioncopy'+fieldsetcount+'-column-5">Add Row</th>'
			+'</tr>'
			+'</thead>'
			+'<tbody>'
			+'<tr  id="contribution-renewal-row-1-'+fieldsetcount+'">'
			+'<td id="contributioncopy'+fieldsetcount+'-left-header-1"> 1</td>'
			+'<td><select class="form-control reinsurance-rates-td" id="contributioncopy'+fieldsetcount+'-2-1" class="form-control reinsurance-rates-td text-align-center">'
			+'<option>Employee</option>'
			+'<option>Employee + Spouse</option>'
			+'<option>Employee + Child</option>'
			+'<option>Employee + Child(ren)</option>'
			+'<option>Family</option>'
			+'<option>Employee + 1</option>'
			+'<option>Employee + 2</option>'
			+'<option>Employee + 3</option>'
			+'</select>'
			+'</td>'
			+'<td><div class="input-group">'
										+'<span class="input-group-addon">'
										+'	<i class="fa fa-usd  color-black"></i>'
									+'	</span><input type="text" id="contributioncopy'+fieldsetcount+'-3-1" class="form-control reinsurance-rates-td text-align-center price" value="99.00">'
									+'	</div></td>'
+'<td><div class="input-group">'
										+'<span class="input-group-addon">'
										+'	<i class="fa fa-usd  color-black"></i>'
									+'	</span><input type="text" id="contributioncopy'+fieldsetcount+'-4-1" class="form-control reinsurance-rates-td text-align-center price" value="68.00"><div></td>'
+' <td class="select_tiers" ><select class="form-control cursor-pointer  reinsurance-rates-td renewal-contribution-change-function" id="contribution_renewal_tiers_1_'+fieldsetcount+'"  >'
+'<option selected value="1">1 tier</option>'
	+'<option  value="2">2 tiers</option>'
	+'<option value="3">3 tiers</option>'
	+'<option value="4">4 tiers</option>'
+'<option value="5">5 tiers</option>'
+'<option value="6">6 tiers</option>'
+'	</select></td>'
+'</tr>' 
+'</tbody>'
+'</table> 	</div>'
+		'</div>'
+'</fieldset>'
fieldsetcount++;
}
	 
	 $('#renewal_contribution_strategies').append(divstoappend);
}


function employeerenewalContribution(){
	var value_select = document.getElementById('select_renewal_employee_contribution').value
	
var fieldsetCount = $('#renewal_contribution_strategies fieldset').length ;
	var fieldCount = fieldsetCount+1;
	if(value_select > fieldsetCount){
		var count = value_select - fieldsetCount;
		looprenewalContribution(count ,fieldCount);
	}else{
		
		$('a#alert-meassage-id-select').attr('onclick','addrenewalContribution('+value_select+','+fieldCount+');');
		$('#alert_message_select').modal('show');
	}
	/*if(value != null){
		
		$('#contribution_strategies').html('');
		loopContribution(value);
	}else{
		$('#contribution_strategies').addClass('hide');
	}*/
}

function loop(addCount,rowCount){

	 for (i=1; i<=addCount; i++){
   var text = $('#editable_reinsurance_rate tr:last').after('<tr id="enter-reinsurance-details-row-'+parseInt(rowCount+i)+'">'
                              +'<td id="reinsurance-left-header-'+ parseInt(rowCount+i) +'">'+ parseInt(rowCount+i) +'</td>'
								 +'  <td class="column-1">'
								 + '<select class="form-control reinsurance-rates-td" id="reinsurance-2-'+ parseInt(rowCount+i) +'">'
								 +' <option>Select</option>'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								 +'<option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								+'  <option>Employee + 1</option>'
								+ '  <option>Employee + 2</option>'
								+ '   <option>Employee + 3</option>'
								+'	</select>'
								+'	</td>'
								+ '<td><div class="input-group"><span class="input-group-addon"><i class="fa fa-usd  color-black"></i></span><input type="text" id="reinsurance-3-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="290.00"></div></td>'
								 +' <td><div class="input-group"><span class="input-group-addon"><i class="fa fa-usd  color-black"></i></span><input type="text" id="reinsurance-4-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="9.00"></div></td>'
								 + '<td><div class="input-group"><span class="input-group-addon"><i class="fa fa-usd  color-black"></i></span><input type="text" id="reinsurance-5-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="925.00"></div></td>'
								 + '<td><div class="input-group"><span class="input-group-addon"><i class="fa fa-usd  color-black"></i></span><input type="text" id="reinsurance-6-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="1156.00"></div></td>'
								+ '<td class="select_tiers"><select class="form-control change-function" id="premium_tiers"  >'
								+' <option>Select</option>'
																	+	'<option value="1">1 tier</option>'
																	+	'<option value="2">2 tiers</option>'
																	+	'<option value="3">3 tiers</option>'
																	+	'<option value="4">4 tiers</option>'
																	+	'<option value="5">5 tiers</option>'
																	+	'<option value="6">6 tiers</option>'
																+'</select></td>'
																+'</tr>'
							);
							
							
	//$('#editable_reinsurance_rate tr:last').prev().find('.select_tiers').html('<div class="remove-icon"><span class="button-remove-premiums button-remove cursor-pointer" id="remove-icon-id-'+parseInt(i)+'" ><a class="color-red"><u>Remove</u></a></span></div>');
	$('#enter-reinsurance-details-row-'+parseInt(rowCount+i)).prev().find('.select_tiers').html('<div class="remove-icon"><span class="button-remove-premiums button-remove cursor-pointer" id="remove-icon-id-'+parseInt(rowCount+i-1)+'" ><a class="color-red"><u>Remove</u></a></span></div>');					
}

return text;

}

function loopinnercontribution(addCount,rowCount,id){

	 for (i=1; i<=addCount; i++){
   var text = $('#editable_contributions_track_'+id+' tr:last').after('<tr id="contribution-enrollment-row-'+parseInt(rowCount+i)+'-'+id+'">'
                              +'<td id="contribution'+id+'-left-header-'+ parseInt(rowCount+i) +'">'+ parseInt(rowCount+i) +'</td>'
								 +'  <td class="column-1">'
								 + '<select class="form-control reinsurance-rates-td" id="contribution'+id+'-2-'+ parseInt(rowCount+i) +'">'
								 +' <option>Select</option>'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								 +'<option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								+'  <option>Employee + 1</option>'
								+ '  <option>Employee + 2</option>'
								+ '   <option>Employee + 3</option>'
								+'	</select>'
								+'	</td>'
								+ '<td><div class="input-group"><span class="input-group-addon">	<i class="fa fa-usd  color-black"></i>	</span><input type="text" id="contribution'+id+'-3-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="99.00">	</div></td>'
								 +' <td><div class="input-group"><span class="input-group-addon">	<i class="fa fa-usd  color-black"></i>	</span><input type="text" id="contribution'+id+'-4-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="68.00"></div></td>'
								 + '<td class="select_tiers"><select class="form-control contribution-change-function" id="contribution_premium_tiers_'+i+'_'+id+'"  >'
								+' <option>Select</option>'
																	+	'<option value="1">1 tier</option>'
																	+	'<option value="2">2 tiers</option>'
																	+	'<option value="3">3 tiers</option>'
																	+	'<option value="4">4 tiers</option>'
																	+	'<option value="5">5 tiers</option>'
																	+	'<option value="6">6 tiers</option>'
																+'</select></td>'
																+'</tr>'
							);
							
							
	$('#editable_contributions_track_'+id+' tr:last').prev().find('.select_tiers').html('<div class="remove-icon"><span class="button-remove-premiums button-remove-contribution cursor-pointer" id="contribution-remove-icon-id-'+parseInt(rowCount+i-1)+'-'+id+'" ><a class="color-red"><u>Remove</u></a></span></div>');
					
}

return text;

}


function loopinnerrenewalcontribution(addCount,rowCount,id){

	 for (i=1; i<=addCount; i++){
   var text = $('#editable_contributions_track_copy_'+id+' tr:last').after('<tr id="contribution-renewal-row-'+parseInt(rowCount+i)+'-'+id+'">'
                              +'<td id="contributioncopy'+id+'-left-header-'+ parseInt(rowCount+i) +'">'+ parseInt(rowCount+i) +'</td>'
								 +'  <td class="column-1">'
								 + '<select class="form-control reinsurance-rates-td" id="contributioncopy'+id+'-2-'+ parseInt(rowCount+i) +'">'
								 +' <option>Select</option>'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								 +'<option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								+'  <option>Employee + 1</option>'
								+ '  <option>Employee + 2</option>'
								+ '   <option>Employee + 3</option>'
								+'	</select>'
								+'	</td>'
								+ '<td><div class="input-group"><span class="input-group-addon">	<i class="fa fa-usd  color-black"></i>	</span><input type="text" id="contributioncopy'+id+'-3-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="99.00">	</div></td>'
								 +' <td><div class="input-group"><span class="input-group-addon">	<i class="fa fa-usd  color-black"></i>	</span><input type="text" id="contributioncopy'+id+'-4-'+ parseInt(rowCount+i) +'" class="form-control reinsurance-rates-td text-align-center price" value="68.00"></div></td>'
								 + '<td class="select_tiers"><select class="form-control renewal-contribution-change-function" id="contribution_renewal_tiers_'+i+'_'+id+'"  >'
								+' <option>Select</option>'
																	+	'<option value="1">1 tier</option>'
																	+	'<option value="2">2 tiers</option>'
																	+	'<option value="3">3 tiers</option>'
																	+	'<option value="4">4 tiers</option>'
																	+	'<option value="5">5 tiers</option>'
																	+	'<option value="6">6 tiers</option>'
																+'</select></td>'
																+'</tr>'
							);
							
							
	$('#editable_contributions_track_copy_'+id+' tr:last').prev().find('.select_tiers').html('<div class="remove-icon"><span class="button-remove-premiums button-remove-contribution-renewal cursor-pointer" id="contributionrenewal-remove-icon-id-'+parseInt(rowCount+i-1)+'-'+id+'" ><a class="color-red"><u>Remove</u></a></span></div>');
							
}

return text;

}



function addReimbursementtrack(){
	
	var rowCount = $('#editable_reimbursementtrack tr').length - 1;
	
	//$('.add_icon_button').html('<div class="remove-icon"><span   class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '<tr><td><input type="text" id="adjustment-1-5" class="form-control reinsurance-rates-td text-align-center" onkeypress="return planscreenname(event);" value="Drug Debates"></td>'
								   +'<td> <select class="form-control reinsurance-rates-td" id="adjustment-2-5">'
									+' <option>Medical Claims</option>'
								+' <option>Dental Claims</option>'
								+' <option>Vision Claims</option>'
								+'	</select></td>'
									+'<td class="add_icon_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addReimbursementtrack();"><u>Add</u></span></div></td></tr>';
									
			
	$('#editable_reimbursementtrack tr:last').after(html
							);
							
								$('#editable_reimbursementtrack tr:last').prev().find('.add_icon_button').html('<div class="remove-icon"><span id="claim_adjustment_'+parseInt(rowCount)+'" class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}
 
function addCosttrack(){
	
	var rowCount = $('#editable_cost_track tr').length - 1;
	//	$('.add_costtrack_button').html('<div class="remove-icon"><span  class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = ' <tr>'
                                   + '<td><input type="text" id="cost-1-2" class="form-control reinsurance-rates-td text-align-center " onkeypress="return planscreenname(event);" value="Wellness Credit"></td>'
									+'<td class="add_costtrack_button"><div class="add-icon"><span class="button-add cursor-pointer"  onclick="addCosttrack();"><u>Add</u></span></div></td>'
                                 +' </tr>';
									
	$('#editable_cost_track tr:last').after(html
							);
							$('#editable_cost_track tr:last').prev().find('.add_costtrack_button').html('<div class="remove-icon"><span id="cost_items_'+parseInt(rowCount)+'" class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}

function addCostitems(){
	var rowCount = $('#editable_renewal_cost_items tr').length - 1;
		
		//$('.add_costitems_button').html('<div class="remove-icon"><span id="renewal_cost_items_'+rowCount+'" class="button-remove margin-0 cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
		
								 
	var html = ' <tr>'
                                   + '<td><input type="text" id="costitems-1-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center " onkeypress="return planscreenname(event);" value=""></td>'
								   + '<td><div class="input-group"><span class="input-group-addon"><i class="fa fa-usd  color-black"></i></span><input type="text" id="costitems-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td price" value=""></div></td>'
								    + '<td><input type="text" id="costitems-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" onkeypress="return planscreenname(event);" value=""></td>'
									+'<td class="add_costitems_button" align="center"><div class="add-icon cursor-pointer"><span onclick="addCostitems();"><u>Add</u></span></div></td>'
                                 +' </tr>';
									
	$('#editable_renewal_cost_items tr:last').after(html
							);
							
							$('#editable_renewal_cost_items tr:last').prev().find('.add_costitems_button').html('<div class="remove-icon"><span id="renewal_cost_items_'+parseInt(rowCount)+'" class="button-remove margin-0 cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}

 
function addEmployeecontribution(){
	
	var rowCount = $('#editable_contributions_track tr').length - 1;
		$('.add_contribution_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contribution-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contribution-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '<td><div class="input-group"><span class="input-group-addon"><i class="fa fa-usd  color-black"></i></span><input type="text" id="contribution-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="99.00"></div></td>'
								+	 '  <td><input type="text" id="contribution-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center price" value="68.00"></td>'
								+	'<td class="add_contribution_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontribution();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track tr:last').after(html
							);
							$('#editable_contributions_track tr:last').prev().find('.add_contribution_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}


function addEmployeecontributiontwo(){
	
	var rowCount = $('#editable_contributions_track_two tr').length - 1;
		$('.add_contributiontwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contributiontwo-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contributiontwo-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '  <td><div class="input-group"><span class="input-group-addon"><i class="fa fa-usd  color-black"></i></span><input type="text" id="contributiontwo-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center price" value="99.00"></div></td>'
								+	 '  <td><input type="text" id="contributiontwo-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="$68.00"></td>'
								+	'<td class="add_contributiontwo_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontributiontwo();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track_two tr:last').after(html
							);
									$('#editable_contributions_track_two tr:last').prev().find('.add_contributiontwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}


function addEmployeecontributiondental(){
	
	var rowCount = $('#editable_contributions_track_dental tr').length - 1;
		$('.add_contributiondental_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contributiondental-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contributiondental-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '  <td><input type="text" id="contributiondental-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="99.00"></td>'
								+	 '  <td><input type="text" id="contributiondental-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="$68.00"></td>'
								+	'<td class="add_contributiondental_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontributiondental();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track_dental tr:last').after(html
							);
							$('#editable_contributions_track_dental tr:last').prev().find('.add_contributiondental_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}

function addEmployeecontributiondentaltwo(){
	
	var rowCount = $('#editable_contributions_track_two_dental tr').length - 1;
		$('.add_contributiondentaltwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contributiondentaltwo-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contributiondentaltwo-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '  <td><input type="text" id="contributiondentaltwo-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="99.00"></td>'
								+	 '  <td><input type="text" id="contributiondentaltwo-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="$68.00"></td>'
								+	'<td class="add_contributiondentaltwo_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontributiondentaltwo();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track_two_dental tr:last').after(html
							);
							$('#editable_contributions_track_two_dental tr:last').prev().find('.add_contributiondentaltwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}
function addEmployeecontributionvision(){
	
	var rowCount = $('#editable_contributions_track_vision tr').length - 1;
		$('.add_contributionvision_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contributionvision-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contributionvision-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '  <td><input type="text" id="contributionvision-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="99.00"></td>'
								+	 '  <td><input type="text" id="contributionvision-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="$68.00"></td>'
								+	'<td class="add_contributionvision_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontributionvision();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track_vision tr:last').after(html
							);
			$('#editable_contributions_track_vision tr:last').prev().find('.add_contributionvision_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}

function addEmployeecontributionvisiontwo(){
	
	var rowCount = $('#editable_contributions_track_two_vision tr').length - 1;
		$('.add_contributionvisiontwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contributionvisiontwo-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contributionvisiontwo-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '  <td><input type="text" id="contributionvisiontwo-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="99.00"></td>'
								+	 '  <td><input type="text" id="contributionvisiontwo-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="$68.00"></td>'
								+	'<td class="add_contributionvisiontwo_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontributionvisiontwo();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track_two_vision tr:last').after(html
							);
							
								$('#editable_contributions_track_two_vision tr:last').prev().find('.add_contributionvisiontwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}
 
function addEmployeecontributioncopy(){
	
	var rowCount = $('#editable_contributions_track_copy tr').length - 1;
		$('.add_contributioncopy_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contributioncopy-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contributioncopy-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '  <td><input type="text" id="contributioncopy-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="99.00"></td>'
								+	 '  <td><input type="text" id="contributioncopy-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="$68.00"></td>'
								+	'<td class="add_contributioncopy_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontributioncopy();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track_copy tr:last').after(html
							);
							
								$('#editable_contributions_track_copy tr:last').prev().find('.add_contributioncopy_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}


function addEmployeecontributiontwocopy(){
	
	var rowCount = $('#editable_contributions_track_two_copy tr').length - 1;
		$('.add_contributioncopytwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
	var html = '  <tr>'
                               +  '   <td id="contributiontwocopy-left-header-'+parseInt(rowCount+1)+'">tier '+parseInt(rowCount+1)+'</td>'
								+'	 <td><select class="form-control reinsurance-rates-td" id="contributiontwocopy-2-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center">'
								+' <option>Employee</option>'
								+' <option>Employee + Spouse</option>'
								+' <option>Employee + Child</option>'
								+' <option>Employee + Child(ren)</option>'
								+' <option>Family</option>'
								 +' <option>Employee + 1</option>'
								  + '<option>Employee + 2</option>'
								 +'   <option>Employee + 3</option>'
									+'</select>'
								+'	</td>'
								+	 '  <td><input type="text" id="contributiontwocopy-3-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="99.00"></td>'
								+	 '  <td><input type="text" id="contributiontwocopy-4-'+parseInt(rowCount+1)+'" class="form-control reinsurance-rates-td text-align-center" value="$68.00"></td>'
								+	'<td class="add_contributioncopytwo_button"><div class="add-icon"><span class="button-add cursor-pointer" onclick="addEmployeecontributiontwocopy();"><u>Add</u></span></div></td>'
                                +'  </tr>';
									
	$('#editable_contributions_track_two_copy tr:last').after(html
							);
								$('#editable_contributions_track_two_copy tr:last').prev().find('.add_contributioncopytwo_button').html('<div class="remove-icon"><span class="button-remove cursor-pointer"  ><a class="color-red"><u>Remove</u></a></span></div>');
}
 
function back(e){
	
	 if (e.rowType == 'data') {
			e.rowElement[0].addEventListener("mouseover", function () {
			  e.rowElement.find("td").css('background', '#ddd');
			  e.rowElement.css("transition", "background-color 0.5s");
			});
			e.rowElement[0].addEventListener("mouseleave", function () {
			  e.rowElement.find("td").css('background', "");
			});
		  }
}

function addLocation(){
		$('#add_location').toggleClass('hide');
		
		$('#input_add_location').val('');
}
function showAddtionallocation(){
	val = $('#firms-firm_location').val();
	if(val != ""){
		$('#span_location_id').removeClass('hide');
		$('#input_location-id').addClass('hide');
		$('#label_additional_locations').removeClass('hide');
		 $('#firms-firm_location').val('');
		var newOption = "<option value='"+val+"' selected >"+val+"</option>"; 
		//$("#firm_locations").append(newOption);
		$("#firms-firm_locations").append(newOption);
	}else{
		$('#label_additional_locations').addClass('hide');
	}
 
}


function addLocationsearch(){
		$('#add_location_search').toggleClass('hide');
		$('#input_add_location').val('');
}

function addLaser(){
		$('#add_laser').toggleClass('hide');
		$('#input_add_laser').val('');
}
function addHasttag(id){
	switch (id){
		case 1:
		window.location.hash = "#home2";
		break;
		case 2:
		window.location.hash = "#profile2";
		break;
		case 3:
		window.location.hash = "#messages2";
		break;
		case 4:
		window.location.hash = "#settings2";
		break;
	} 
}
function changeColor(){
		$('#body_color').toggleClass('blue');
}

/*************new design function **************/


function openDesignfirmmodal(id){
	/*if(document.getElementById('firm_id').value == ''){
		toastr.error('Please Select A Firm to Login');
		document.getElementById("firm_id").style.borderColor = "red";
		document.getElementById("firm_id").focus();
	}else{
		//url= staticurl + 'firm/dashboard'; 
		//location = url;
		document.getElementById("firm_id").style.borderColor = "";
	}
	
	if(document.getElementById('client_id').value == ''){
		toastr.error('Please Select A Firm to Login');
		document.getElementById("client_id").style.borderColor = "red";
		document.getElementById("client_id").focus();
	}else{
		//url= staticurl + 'firm/dashboard'; 
		//location = url;
		document.getElementById("client_id").style.borderColor = "";
	}*/
	if(id== 1){
		$('a#modal_go_firmlist').attr('href', '/design/firm-list');
		$('#modal-firm-list').modal('show');
	}else{
		$('a#modal_go').attr('href', '/firm-plan/client-plan-years?id=1');
		$('#modal-firm-details').modal('show');
	}
	
}

 
/************* end new disign *******************/


function addReinsurancerates(removeCount,value){
	 
	 for (i=1; i<=removeCount; i++){ 
			//var result = arrange(); 
			
		//	if(result){
				$('#editable_reinsurance_rate ').find(' tbody tr:last').remove();
		//	}
			}
			
			$('#enter-reinsurance-details-row-'+value).find(' td:last').html('<select class="form-control change-function" id="premium_tiers"  >'
									+' <option>Select</option>'
																		+	'<option value="1">1 tier</option>'
																		+	'<option value="2">2 tiers</option>'
																		+	'<option value="3">3 tiers</option>'
																		+	'<option value="4">4 tiers</option>'
																		+	'<option value="5">5 tiers</option>'
																		+	'<option value="6">6 tiers</option>'
																	+'</select>');
			
			$('#alert_message_select').modal('hide');
			
}

function addContributiontiers(removeCount,value_select,table_id){
	 

	for (i=1; i<=removeCount; i++){ 
		 
		$('#editable_contributions_track_'+table_id).find(' tbody tr:last').remove();

	}

	$('#contribution-enrollment-row-'+value_select+'-'+table_id).find(' td:last').html('<select class="form-control contribution-change-function" id="contribution_premium_tiers_'+value_select+'_'+table_id+'"  >'
							+' <option>Select</option>'
																+	'<option value="1">1 tier</option>'
																+	'<option value="2">2 tiers</option>'
																+	'<option value="3">3 tiers</option>'
																+	'<option value="4">4 tiers</option>'
																+	'<option value="5">5 tiers</option>'
																+	'<option value="6">6 tiers</option>'
															+'</select>');
	$('#alert_message_select').modal('hide');
	}

function addrenewalContributiontiers(removeCount,value_select,table_id){
for (i=1; i<=removeCount; i++){ 
	 
	$('#editable_contributions_track_copy_'+table_id).find(' tbody tr:last').remove();

}

$('#contribution-renewal-row-'+value_select+'-'+table_id).find(' td:last').html('<select class="form-control renewal-contribution-change-function" id="contribution_renewal_tiers_'+value_select+'_'+table_id+'"  >'
						+' <option>Select</option>'
															+	'<option value="1">1 tier</option>'
															+	'<option value="2">2 tiers</option>'
															+	'<option value="3">3 tiers</option>'
															+	'<option value="4">4 tiers</option>'
															+	'<option value="5">5 tiers</option>'
															+	'<option value="6">6 tiers</option>'
														+'</select>');
$('#alert_message_select').modal('hide');

}
	$(document).ready(function() {
		
		
		 
	 
							
							$("#monthly_financials .dx-toolbar-before").html('<div class="form-group col-md-12 padding-0" style="min-width:402px;"><label class="font-16 col-xs-3 line-height-30 padding-0" style="color:black;">Plan Year: </label><label class=" col-xs-7 padding-0 font-16 line-height-30" style="color:black;">2016</label></div>');

		 $("#large_claims .dx-toolbar-before").html('<div class="form-group col-md-12 padding-0" style="min-width:402px;"><label class="font-16 col-xs-5 line-height-30 padding-0" style="color:black;">Plan Year Data As of: </label><span class=" col-xs-7 padding-0"><select class="form-control" id="plan_value">'
					+'<option value="Medical &amp; Rx">January 2017</option>'
					+'<option value="Dental">February 2017</option>'
					+'<option value="Vision">March 2017</option>'
					+'</select></span></div>');
	
		$("#pharmacy_performance .dx-toolbar-before").html('<div class="form-group col-md-12 padding-0" style="min-width:402px;"><label class="font-16 col-xs-5 line-height-30 padding-0" style="color:black;">Plan Year Data As of: </label><span class=" col-xs-7"><select class="form-control" id="plan_value">'
							+'<option value="Medical &amp; Rx">January 2017</option>'
							+'<option value="Dental">February 2017</option>'
							+'<option value="Vision">March 2017</option>'
							+'</select></span></div>');
					$("#network_performance .dx-toolbar-before").html('<div class="form-group col-md-12 padding-0" style="min-width:402px;"><label class="font-16 col-xs-6 line-height-30" style="color:black;">Plan Year Data As of: </label><span class=" col-xs-6"><select class="form-control" id="plan_value">'
							+'<option value="Medical &amp; Rx">January 2017</option>'
							+'<option value="Dental">February 2017</option>'
							+'<option value="Vision">March 2017</option>'
							+'</select></span></div>');			
		
		
			
			$('.dropify-firm').dropify({
                messages: {
        'default': 'Please Upload Firm Logo',
        'replace': 'Drag and drop or click to replace',
        'remove':  'Remove',
        'error':   'Ooops, something wrong happended.'
    }
            });

            // Used events
            var drEvent = $('#input-file-events').dropify();

            drEvent.on('dropify.beforeClear', function(event, element){
                return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
            });

            drEvent.on('dropify.afterClear', function(event, element){
                alert('File deleted');
            });

            drEvent.on('dropify.errors', function(event, element){
                console.log('Has Errors');
            });

            var drDestroy = $('#input-file-to-destroy').dropify();
            drDestroy = drDestroy.data('dropify')
            $('#toggleDropify').on('click', function(e){
                e.preventDefault();
                if (drDestroy.isDropified()) {
                    drDestroy.destroy();
                } else {
                    drDestroy.init();
                }
            });
			
		$('#main_tab li[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			
			
			
			
		  var target = $(e.target).attr("href") // activated tab
			switch (target){
				case '#account_setup_block':
						$(this).find( "img" ).attr("src","/images/design/account_setup_sel.png");
						$(this).next().children().attr("src","/images/design/cost_projectionsl.png");
						$(this).next().next().children().attr("src","/images/design/monthly_inputs.png");
						$(this).next().next().next().children().attr("src","/images/design/reports.png");
						break;
				case '#cost_projections_block':
						$(this).prev().children().attr("src","/images/design/account_setup_comp.png");
						$(this).find( "img" ).attr("src","/images/design/cost_projections_sel.png");
						$(this).next().children().attr("src","/images/design/monthly_inputs.png");
						$(this).next().next().children().attr("src","/images/design/reports.png");
						break;
				case '#input_monthly_block':
						$(this).prev().prev().children().attr("src","/images/design/account_setup_comp.png");
						$(this).prev().children().attr("src","/images/design/cost_projections_comp.png");
						$(this).find( "img" ).attr("src","/images/design/monthly_inputs_sel.png");
						$(this).next().children().attr("src","/images/design/reports.png");
						break;
				case '#generate_reports_block':
						$(this).prev().children().attr("src","/images/design/monthly_inputs_comp.png");
						$(this).prev().prev().children().attr("src","/images/design/cost_projections_comp.png");
						$(this).prev().prev().prev().children().attr("src","/images/design/account_setup_comp.png");
						$(this).find( "img" ).attr("src","/images/design/reports_sel.png");
						break;
				
			}
			
		});
		

		var hash = window.location.hash;
		switch (hash){
			case '#home2':
			$("#main-anchor-1").trigger('click');
			break;
			case '#profile2':
			$("#main-anchor-2").trigger('click');
			break;
			case '#messages2':
			$("#main-anchor-3").trigger('click');
			break;
			case '#settings2':
			$("#main-anchor-4").trigger('click');
			break;
		  default:
       $("#main-anchor-1").trigger('click');
	   break;
		}
$(".firm-check-all").change(function () {
							
							
						if($('.firm-check-all').is(':checked')){
							
							$(".firm-checkbox").prop("checked", true);
						}else{
							$(".firm-checkbox").attr("checked", false);
						}
							
						});
						
						 $(document).on('focus', '.reinsurance-rates-td', function () {
					//	$('.reinsurance-rates-td').on('focus', function () {
					//$( ".reinsurance-rates-td" ).focus(function() {
						
  var id = $(this).attr('id') ;
  var ret = id.split("-");
  var type = ret[0];
var columnid = ret[1];
var rowid = ret[2];

$("#"+type+"-column-"+columnid).addClass("font-weight-900");
$("#"+type+"-left-header-"+rowid).addClass("font-weight-900");
 
});
//$( ".reinsurance-rates-td" ).focusout(function() {
	 $(document).on('blur', '.reinsurance-rates-td', function () {
//	$('.reinsurance-rates-td').on('blur', function () {
  var id = $(this).attr('id') ;
   var ret = id.split("-");
   var type = ret[0];
var columnid = ret[1];
var rowid = ret[2];
   if ( $("#"+type+"-column-"+columnid).hasClass( "font-weight-900" ) ) {
	   $("#"+type+"-column-"+columnid).removeClass("font-weight-900");
   }
   if ( $("#"+type+"-left-header-"+rowid).hasClass( "font-weight-900" ) ) {
	   $("#"+type+"-left-header-"+rowid).removeClass("font-weight-900");
   }

});


	 $(document).on('change', '.change-function', function () {
 
 var value = document.getElementById('premium_tiers').value;
 
	var rowCount = $('#editable_reinsurance_rate tr').length - 1;
	
	if(value > rowCount){
		//$('.select_tiers').html('');
		addCount = value - rowCount ;
	//	var html =;
	var result = loop(addCount,rowCount);
	//console.log(result);
	
	}else{
		
		removeCount = rowCount - value ;
		$('a#alert-meassage-id-select').attr('onclick','addReinsurancerates('+removeCount+','+value+');');
		
		$('#alert_message_select').modal('show');
		
	//	$('#editable_reinsurance_rate tbody').html('');
		
		//loop(addCount,rowCount);
	}
	 
});
	

	 
	 //for enrollments and contributions
 $(document).on('change', '.contribution-change-function', function () {

  var item_id = this.id;
  var id = item_id.split("_");
   var id_val = id[3];
    var table_id = id[4];
 var value_select = document.getElementById('contribution_premium_tiers_'+id_val+'_'+table_id).value
 
	var rowCount = $('#editable_contributions_track_'+table_id+' tr').length - 1;
	
	if(value_select > rowCount){
		//$('.select_tiers').html('');
		addCount = value_select - rowCount ;
	//	var html =;
	var result = loopinnercontribution(addCount,rowCount,table_id);
	//console.log(result);
	
	}else{
			
		removeCount = rowCount - value_select ;
		
	$('a#alert-meassage-id-select').attr('onclick','addContributiontiers('+removeCount+','+value_select+','+table_id+');');
		
		$('#alert_message_select').modal('show');
		
		
	}
	 
});
//for renewal contributions
 
 $(document).on('change', '.renewal-contribution-change-function', function () {

	  var item_id = this.id;
	  var id = item_id.split("_");
	   var id_val = id[3];
	    var table_id = id[4];
	 var value_select = document.getElementById('contribution_renewal_tiers_'+id_val+'_'+table_id).value
	 
		var rowCount = $('#editable_contributions_track_copy_'+table_id+' tr').length - 1;
		
		if(value_select > rowCount){
			//$('.select_tiers').html('');
			addCount = value_select - rowCount ;
		//	var html =;
		var result = loopinnerrenewalcontribution(addCount,rowCount,table_id);
		//console.log(result);
		
		}else{
	 		
			removeCount = rowCount - value_select ;
			
			$('a#alert-meassage-id-select').attr('onclick','addrenewalContributiontiers('+removeCount+','+value_select+','+table_id+');');
			
			$('#alert_message_select').modal('show');
			
		
		}
		 
	});
 
 
 $(document).on('click', '.button-remove', function () { 
 var item_id = this.id;
 $('#alert-meassage-id').attr("iddata",item_id);
  $('#alert_message').modal('show'); 
});

 $(document).on('click', '.button-remove-modal', function () { 
	// var item_id = this.iddata;
	 var item_id = $("#alert-meassage-id").attr("iddata");
	 if(item_id != ''){
		 
		 var id = item_id.split("-");
			var id_val = id[3];
		 var rowCount = $('#editable_reinsurance_rate tr').length - 1;
		 //alert(rowCount);
		 j = +id_val + +1;
		 for(i=j; i<=rowCount; i++){
			var new_val =  +i - +1;
			$('#reinsurance-left-header-'+i).html(new_val);
			$('#reinsurance-left-header-'+i).attr("id","reinsurance-left-header-"+ new_val);
			$('#reinsurance-2-'+i).attr("id","reinsurance-2-"+ new_val);
			$('#reinsurance-3-'+i).attr("id","reinsurance-3-"+ new_val);
			$('#reinsurance-4-'+i).attr("id","reinsurance-4-"+ new_val);
			$('#reinsurance-5-'+i).attr("id","reinsurance-5-"+ new_val);
			$('#reinsurance-6-'+i).attr("id","reinsurance-6-"+ new_val);
			$('#remove-icon-id-'+i).attr("id","remove-icon-id-"+ new_val);
			$('#enter-reinsurance-details-row-'+i).attr("id","enter-reinsurance-details-row-"+ new_val);
		 }
		  $('#'+item_id).parent().parent().parent().remove(); 
		  $('#alert_message').modal('hide'); 
		  
	 }else{
		 $('#'+item_id).parent().parent().parent().remove(); 
		  $('#alert_message').modal('hide'); 
	 }
		

	});
 
 $(document).on('click', '.button-remove-contribution', function () { 

	 var item_id = this.id;
	 $('#alert-meassage-id-contribution').attr("iddata",item_id);
	  $('#alert_message_contribution').modal('show'); 
	  
});

 $(document).on('click', '.button-remove-contribution-modal', function () { 
		// var item_id = this.iddata;
		 var item_id = $("#alert-meassage-id-contribution").attr("iddata");
	
		 var id = item_id.split("-");
		 var id_val = id[4];
		  var table_id = id[5];
		 var rowCount = $('#editable_contributions_track_'+table_id+' tr').length - 1;
		 //alert(rowCount);
		 j = +id_val + +1;
		 for(i=j; i<=rowCount; i++){
			var new_val =  +i - +1;
			$('#contribution'+table_id+'-left-header-'+i).html(new_val);
			$('#contribution'+table_id+'-left-header-'+i).attr("id","contribution"+table_id+"-left-header-"+ new_val);
			$('#contribution'+table_id+'-2-'+i).attr("id","contribution"+table_id+"-2-"+ new_val);
			$('#contribution'+table_id+'-3-'+i).attr("id","contribution"+table_id+"-3-"+ new_val);
			$('#contribution'+table_id+'-4-'+i).attr("id","contribution"+table_id+"-4-"+ new_val);
			
			$('#contribution-remove-icon-id-'+i+'-'+table_id+'').attr("id","contribution-remove-icon-id-"+new_val+"-"+table_id+"");
			$('#contribution-enrollment-row-'+i+'-'+table_id+'').attr("id","contribution-enrollment-row-"+new_val+"-"+table_id+"");
		 }
		 
		  $('#'+item_id).parent().parent().parent().remove(); 
		  $('#alert_message_contribution').modal('hide'); 

		});
 
 //remove button for renewal contribution
 
 $(document).on('click', '.button-remove-contribution-renewal', function () { 
	 var item_id = this.id;
	 $('#alert-meassage-id-contribution-renewal').attr("iddata",item_id);
	  $('#alert_message_contribution_renewal').modal('show'); 
	  
});
 
 
 $(document).on('click', '.button-remove-contribution-renewal-modal', function () { 
		// var item_id = this.iddata;
		 var item_id = $("#alert-meassage-id-contribution-renewal").attr("iddata");
	
		 var id = item_id.split("-");
		 var id_val = id[4];
		  var table_id = id[5];
		 var rowCount = $('#editable_contributions_track_copy_'+table_id+' tr').length - 1;
		 //alert(rowCount);
		 j = +id_val + +1;
		 for(i=j; i<=rowCount; i++){
			var new_val =  +i - +1;
			$('#contributioncopy'+table_id+'-left-header-'+i).html(new_val);
			$('#contributioncopy'+table_id+'-left-header-'+i).attr("id","contributioncopy"+table_id+"-left-header-"+ new_val);
			$('#contributioncopy'+table_id+'-2-'+i).attr("id","contributioncopy"+table_id+"-2-"+ new_val);
			$('#contributioncopy'+table_id+'-3-'+i).attr("id","contributioncopy"+table_id+"-3-"+ new_val);
			$('#contributioncopy'+table_id+'-4-'+i).attr("id","contributioncopy"+table_id+"-4-"+ new_val);
			 
			$('#contributionrenewal-remove-icon-id-'+i+'-'+table_id+'').attr("id","contributionrenewal-remove-icon-id-"+new_val+"-"+table_id+"");
			$('#contribution-renewal-row-'+i+'-'+table_id+'').attr("id","contribution-renewal-row-"+new_val+"-"+table_id+"");
		 }
		 
		  $('#'+item_id).parent().parent().parent().remove(); 
		  $('#alert_message_contribution_renewal').modal('hide'); 

		});
 


							$(".tr-back").mouseover(function(){
   // $(this).css("background-color", "#40a9fc");
	 $(this).find(".td-back").css("background-color", "#ddd");
    });
	$(".tr-back").mouseleave(function(){
    //$(this).css("background-color", "transparent");
	 $(this).find(".td-back").css("background-color", "");
    });
	
	$(".tr-back-firm").mouseover(function(){
    $(this).css("background-color", "#ddd");
	// $(this).find(".td-back").css("background-color", "#40a9fc");
    });
	$(".tr-back-firm").mouseleave(function(){
    $(this).css("background-color", "transparent");
	// $(this).find(".td-back").css("background-color", "");
    });
	
	$(".column-td").hover(function () {
		var id= $(this).attr('id');
		hoverTable(id);
		});
		
		
		 $(document).on('keypress', '.price', function (event) { 
		// $(".price").keypress(function (event) {


             var $this = $(this);
    if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
       ((event.which < 48 || event.which > 57) &&
       (event.which != 0 && event.which != 8))) {
           event.preventDefault();
    }

    var text = $(this).val();
    if ((event.which == 46) && (text.indexOf('.') == -1)) {
        setTimeout(function() {
            if ($this.val().substring($this.val().indexOf('.')).length > 3) {
                $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
            }
        }, 1);
    }

    if ((text.indexOf('.') != -1) &&
        (text.substring(text.indexOf('.')).length > 2) &&
        (event.which != 0 && event.which != 8) &&
        ($(this)[0].selectionStart >= text.length - 2)) {
            event.preventDefault();
    }      

	  
	  
	
        });
			 $(document).on('blur', '.price', function (e) { 
			//alert(e.keyCode);
			//if(!(e.keyCode == 37 || e.keyCode == 39)){
	   var $this = $(this);
      var num = $this.val().replace(/,/g, '');
     comma_val = addCommas(num);
      $this.val(comma_val);
		//	 } 
	  });
	  
						});
						
	function addCommas(nStr) {
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
					function enableFirm(){

			$('#firm_users').removeClass('cursor-nodrop');
			
			$('#anchor-pb-4').removeClass('pointer-disable');
			$('#anchor-pb-4').attr('data-toggle','tab');
			$('#anchor-pb-1').trigger('click');
			/*$("#anchor-pb-4").trigger('click');*/
		}
		
		function enableFirmusers(){

			$('#firm_users').removeClass('cursor-nodrop');
			
			$('#anchor-pb-4').removeClass('pointer-disable');
			$('#anchor-pb-4').attr('data-toggle','tab');
			$('#main-anchor-1').trigger('click');
			$("#anchor-pb-4").trigger('click');
		}
		
				function enableClientusers(){

		$('#client_users').removeClass('cursor-nodrop');
		
		$('#anchor-pb-5').removeClass('pointer-disable');
		$('#anchor-pb-5').attr('data-toggle','tab');
		$('#main-anchor-1').trigger('click');
		$("#anchor-pb-5").trigger('click');
	}

	
	function enableClient(){

		$('#client_users').removeClass('cursor-nodrop');
		
		$('#anchor-pb-5').removeClass('pointer-disable');
		$('#anchor-pb-5').attr('data-toggle','tab');
		$('#anchor-pb-1').trigger('click');
	}
		function openPlanmodal(value){
		$('#plan_label').html('Add '+value+' Plan');
		$('#label_trend').html(value+' Trend');
		
		$('#add_plan').modal('show');
	
	}
						function hoverTable(id){
							$(".column-"+id).mouseover(function(){
							    $(".column-"+id).css("background-color", "#ddd");
								// $(this).find(".td-back").css("background-color", "#40a9fc");
							    });
								$(".column-"+id).mouseleave(function(){
							    $(".column-"+id).css("background-color", "transparent");
								// $(this).find(".td-back").css("background-color", "");
							    });
						}
					
						