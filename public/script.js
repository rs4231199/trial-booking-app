var slots;
function courseNameFunction() {
	const courseName = document.getElementById("course_name").value;
	var trial_date = document.getElementById("trial_date");
	for (var i=1; i<trial_date.options.length; )
        trial_date[i] = null;
	if(courseName == 'select course')
	    return;
	var content = [];
	slots[slots.findIndex(x => x.course_name == courseName)].slots.forEach((element) => {
		var timestamp = element.slot*1;
		if(timestamp - Date.now() < 14400000 || timestamp - Date.now() > 604800000)
			return;
		var date = new Date(timestamp);
	    content.push(date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear());
	});
	content = [...new Set(content)];
	content.forEach((element) => {
		var el = document.createElement("option");
	    el.textContent = element;
	    el.value = element;
	    trial_date.appendChild(el);
	});
}

function trialDateFunction() {
	const courseName = document.getElementById("course_name").value;
	var trialDate = document.getElementById("trial_date").value;
	var trial_time = document.getElementById("trial_time");
	for (var i=1; i<trial_time.options.length; )
        trial_time[i] = null;
	if(trialDate == 'select date')
	    return;
	var content = [];
	slots[slots.findIndex(x => x.course_name == courseName)].slots.forEach((element) => {
		var timestamp = element.slot*1;
		if(timestamp - Date.now() < 14400000 || timestamp - Date.now() > 604800000)
			return;
		var date = new Date(timestamp);
	    var str = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
	    if(str == trialDate)
	    	content.push(date.getHours() + ':' + ("0" + date.getMinutes()).substr(-2) + ':' + ("0" + date.getSeconds()).substr(-2));
	});
	content = [...new Set(content)];
	content.forEach((element) => {
		var el = document.createElement("option");
	    el.textContent = element;
	    el.value = element;
	    trial_time.appendChild(el);
	});
}

window.addEventListener("load", function() {
	axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=bcmM69u_Apg_S6EcPCkm2SiCw0T4SppoiP39526_G1ZaDHOBbQd01ZJ2CEWZumdXfA2QvBLm9xhIsM8kyeuZ2_Mcqh-FDTCom5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC09Nb0QZ6ca_LU0vmo6mSiQ7SyFG3CgdL9-1Vgcha-TAYaAGhh-9xNG-9rMNEZHQRElvdDletx0&lib=MlJcTt87ug5f_XmzO-tnIbN3yFe7Nfhi6')
		.then(function (response) {
			slots = response.data;
			var course_name = document.getElementById("course_name");
			slots.forEach((element) => {
			    var el = document.createElement("option");
			    el.textContent = element.course_name;
			    el.value = element.course_name;
			    course_name.appendChild(el);
			});
		})
		.catch(function (error) {
			console.log(error);
		});

	function sendData() {
		const FD = new FormData( form );
		var data = {};
		FD.forEach(function(value, key){
		    data[key] = value;
		});
		axios.post('/', data)
		.then(function (response) {
			// console.log(response);
			form.reset();
			alert("Trial successfully booked. Check you inbox.")
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	var form = document.getElementById("myForm");
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		sendData();
	});

});
