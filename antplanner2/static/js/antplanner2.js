window.APP_YEAR  = 2012
window.APP_MONTH = 9 
window.APP_DAY   = 1

window.MON = 1
window.TUE = 2
window.WED = 3
window.THU = 4
window.FRI = 5

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
	3. course durations never exceed 3 hours

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
		if(beginHour >= 1 && beginHour <= 10) {
			if(endHour >= 2 && endHour <= 10) {
				beginHour += 12;
			}
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

