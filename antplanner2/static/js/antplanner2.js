window.APP_YEAR  = 2012;
window.APP_MONTH = 9;
window.APP_DAY   = 1;

window.MON = 1;
window.TUE = 2;
window.WED = 3;
window.THU = 4;
window.FRI = 5;

window.LISTING_CODE_INDEX = 0;
window.LISTING_TYPE_INDEX = 1;
window.LISTING_TIME_INDEX = 5;
window.LISTING_ROOM_INDEX = 6;

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function ParsedCourseTime(timeString) {
	/*
	Used to parse the horribly inconsistent time string formats
	
	Assumptions:
	1. earliest possible course time is 6am
	2. latest possible course time is 9pm
	3. course durations never exceed 5 hours

	Acceptable Inputs:
	valid start hours        6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9
	valid start am hours     6,7,8,9,10,11
	valid start pm hours                   12,1,2,3,4,5,6,7,8,9

	valid end hours            7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10
	valid end am hours         7,8,9,10,11
	valid end pm hours                     12,1,2,3,4,5,6,7,8,9,10
	
	no +12h                                12
	
	Input: "Th &nbsp; 12:30-12:50p "

	*/
	var MAX_DURATION = 5;

	var dashedSplit = timeString.split('-'); // ex. ["Th &nbsp; 12:30", "12:50p "]
	var dayBeginSplit = dashedSplit[0].split('&nbsp;'); // ex. ["Th ", " 12:30"]

	var beginTime = $.trim( dayBeginSplit[dayBeginSplit.length - 1] ); // ex. "6:00"
	var endTime   = $.trim( dashedSplit[1] ); // "6:50p"

	var beginHour = parseInt( beginTime.split(':')[0] );
	var beginMin  = parseInt( beginTime.split(':')[1] );
	
	var endHour = parseInt( endTime.split(':')[0] );
	var endMin = parseInt( endTime.split(':')[1].replace('p', '') );
	var isPm = endTime.indexOf('p') != -1;;

	var days = []
	if(timeString.indexOf('M') != -1) {	days.push(MON); } 
	if(timeString.indexOf('Tu') != -1) { days.push(TUE); } 
	if(timeString.indexOf('W') != -1) {	days.push(WED); }
	if(timeString.indexOf('Th') != -1) { days.push(THU); }
	if(timeString.indexOf('F') != -1) {	days.push(FRI); }

	if(isPm) {
		var military = endHour == 12 ? 12 : endHour + 12

		if(military - beginHour > MAX_DURATION) {
			beginHour += 12;
		} 

		if(endHour != 12) {
			endHour += 12;
		}

	}

	return {
		'beginHour': beginHour,
		'beginMin': beginMin,
		'endHour': endHour,
		'endMin': endMin,
		'days': days
	}
}

function CourseTimeStringParser(courseString) {
	/* 
	Accepts:
	
	"M &nbsp;  6:30- 8:50p<br>Th &nbsp;  9:00-10:50p"
	MW &nbsp;  6:00- 6:20p 
	Th &nbsp; 12:30-12:50p 

	*/
	var courseTimes = []
	var splitTimes = courseString.split('<br>');
	for(var i in splitTimes) {
		courseTimes.push( ParsedCourseTime(splitTimes[i]) )
	}

	return courseTimes;
}

function parseRoomString(roomString) {
    // Accepts an html room string (there may or may not be an a tag for any room)
    // Example: <a href="http://www.classrooms.uci.edu/GAC/HH112.html" target="_blank">HH 112</a><br>HH 112
    roomString = roomString.trim();

    // This will match non-markup text that is followed by the opening of a tag,
    // or with the ending of the string
    var regex = /(\w|\s)+(?=<|$)/g;

    var rooms = [];
    var info = roomString.match(regex);

    return info;
}

function getRandomColorPair() {
		var palette = [
			{color: '#C4A883', borderColor: '#B08B59'},
			{color: '#A7A77D', borderColor: '#898951'},
			{color: '#85AAA5', borderColor: '#5C8D87'},
			{color: '#94A2BE', borderColor: '#5C8D87'},
			{color: '#8997A5', borderColor: '#627487'},
			{color: '#A992A9', borderColor: '#8C6D8C'},
			{color: '#A88383', borderColor: '#A87070'},
			{color: '#E6804D', borderColor: '#DD5511'},
			{color: '#F2A640', borderColor: '#EE8800'},
			{color: '#E0C240', borderColor: '#D6AE00'},
			{color: '#BFBF4D', borderColor: '#AAAA11'},
			{color: '#8CBF40', borderColor: '#66AA00'},
			{color: '#4CB052', borderColor: '#109618'},
			{color: '#65AD89', borderColor: '#329262'},
			{color: '#59BFB3', borderColor: '#22AA99'},
			{color: '#668CD9', borderColor: '#3366CC'},
			{color: '#668CB3', borderColor: '#336699'},
			{color: '#8C66D9', borderColor: '#6633CC'},
			{color: '#B373B3', borderColor: '#994499'},
			{color: '#E67399', borderColor: '#DD4477'},
			{color: '#D96666', borderColor: '#CC3333'}
		];
		
		return palette[Math.floor(Math.random() * palette.length)];

}

function colorEvent(el, colorPair) {
	$(el).css({
		'background-color': colorPair.color,
		'border': '1px solid ' + colorPair.borderColor
	});

	$('.wc-time', el).css({
		'background-color': colorPair.color,
		'border-left': 'none',
		'border-right': 'none',
		'border-top': 'none',
		'border-bottom': '1px solid ' + colorPair.borderColor
	});
}
function groupColorize() {
	var tracking = {};
	$('.wc-cal-event').each(function(index, el) {
	  var c = $(el).data().calEvent;
	  if( !(c.groupId in tracking) ) {
	    tracking[c.groupId] = getRandomColorPair();
	  } 
	  colorEvent(this, tracking[c.groupId])
	});
}

function isCourseAdded(courseCode, callback) {
	var isAdded = false;
	$('.wc-cal-event').each(function(index, el) {
		var c = $(el).data().calEvent;
		if(c.groupId == courseCode) {
			isAdded = true;
			return false; //break out of loop
		}
	});
	return isAdded;
}













