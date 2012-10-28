module( "Course Time String Parser")

test( "2 Times", function( assert ) {
    var times = CourseTimeStringParser('M &nbsp;  6:30- 8:50p<br>Th &nbsp;  9:00-10:50p')
    assert.equal(times[0].beginHour, 18, 'time 1 begin hour');
    assert.equal(times[0].endHour, 20, 'time 1 end hour');
    assert.equal(times[1].beginHour, 21, 'time 2 begin hour');
    assert.equal(times[1].endHour, 22, 'time 2 end hour');
});

test( "3 Times", function( assert ) {
    var times = CourseTimeStringParser('M &nbsp;  6:30- 8:50p<br>Th &nbsp;  9:00-10:50p<br>Th &nbsp;  9:00-10:50p')
    assert.equal(times[0].beginHour, 18, 'time 1 begin hour');
    assert.equal(times[0].endHour, 20, 'time 1 end hour');
    assert.equal(times[1].beginHour, 21, 'time 2 begin hour');
    assert.equal(times[1].endHour, 22, 'time 2 end hour');
    assert.equal(times[2].beginHour, 21, 'time 2 begin hour');
    assert.equal(times[2].endHour, 22, 'time 2 end hour');
});

module( "Parsed Course Times" )

test( "6:00 - 8:50", function( assert ) {
    var parsed = ParsedCourseTime('"M &nbsp;  6:00-8:50"')
    assert.deepEqual(parsed.days, [MON], 'days');
    assert.equal(parsed.beginHour, 6, 'begin hour');
    assert.equal(parsed.beginMin, 0, 'begin min');
    assert.equal(parsed.endHour, 8, 'end hour');
    assert.equal(parsed.endMin, 50, 'end min');
});

module( "Parsed Course Time Hours" );

test( "6:00 - 8:50", function( assert ) {
    var parsed = ParsedCourseTime('Th  &nbsp;  6:00- 8:50  ')
    assert.equal(parsed.beginHour, 6, 'begin hour');
    assert.equal(parsed.endHour, 8, 'end hour');
});

test( "7:00 - 8:50", function( assert ) {
    var parsed = ParsedCourseTime('Th &nbsp; 7:00- 8:50  ')
    assert.equal(parsed.beginHour, 7, 'begin hour');
    assert.equal(parsed.endHour, 8, 'end hour');
});

test( "8:00 - 11:50", function( assert ) {
    var parsed = ParsedCourseTime('Th &nbsp;8:00- 11:50  ')
    assert.equal(parsed.beginHour, 8, 'begin hour');
    assert.equal(parsed.endHour, 11, 'end hour');
});

test( "8:00 - 1:50p", function( assert ) {
    var parsed = ParsedCourseTime('Th &nbsp;8:00- 1:50p  ')
    assert.equal(parsed.beginHour, 8, 'begin hour');
    assert.equal(parsed.endHour, 13, 'end hour');
});

test( "9:00 - 9:50", function( assert ) {
    var parsed = ParsedCourseTime('Th &nbsp; 9:00- 9:50  ')
    assert.equal(parsed.beginHour, 9, 'begin hour');
    assert.equal(parsed.endHour, 9, 'end hour');
});

test( "9:00 - 12:50p", function( assert ) {
    var parsed = ParsedCourseTime('Th &nbsp; 9:00- 12:50p  ')
    assert.equal(parsed.beginHour, 9, 'begin hour');
    assert.equal(parsed.endHour, 12, 'end hour');
});

test( "10:00 - 12:50p", function( assert ) {
    var parsed = ParsedCourseTime('Th &nbsp; 10:00- 12:50p  ')
    assert.equal(parsed.beginHour, 10, 'begin hour');
    assert.equal(parsed.endHour, 12, 'end hour');
});

test( "11:00 - 12:50p", function( assert ) {
    var parsed = ParsedCourseTime('Th &nbsp; 11:00- 12:50p  ')
    assert.equal(parsed.beginHour, 11, 'begin hour');
    assert.equal(parsed.endHour, 12, 'end hour');
});

test( "12:00 - 12:50p", function( assert ) {
    var parsed = ParsedCourseTime('Tu &nbsp; 12:00-12:50p ')
    assert.equal(parsed.beginHour, 12, 'begin hour');
    assert.equal(parsed.endHour, 12, 'end hour');
});

test( "1:00 - 1:50p", function( assert ) {
    var parsed = ParsedCourseTime('Tu &nbsp; 1:00-1:50p ')
    assert.equal(parsed.beginHour, 13, 'begin hour');
    assert.equal(parsed.endHour, 13, 'end hour');
});

test( "2:00 - 3:20p", function( assert ) {
    var parsed = ParsedCourseTime('TuTh &nbsp;  2:00- 3:20p ')
    assert.equal(parsed.beginHour, 14, 'begin hour');
    assert.equal(parsed.endHour, 15, 'end hour');
});

test( "3:00 - 5:20p", function( assert ) {
    var parsed = ParsedCourseTime('TuTh  &nbsp;  3:00- 5:20p ')
    assert.equal(parsed.beginHour, 15, 'begin hour');
    assert.equal(parsed.endHour, 17, 'end hour');
});

test( "4:00 - 5:20p", function( assert ) {
    var parsed = ParsedCourseTime('MW  &nbsp;  4:00- 5:20p ')
    assert.equal(parsed.beginHour, 16, 'begin hour');
    assert.equal(parsed.endHour, 17, 'end hour');
});

test( "5:00 - 8:20p", function( assert ) {
    var parsed = ParsedCourseTime('MW  &nbsp;  5:00- 8:20p ')
    assert.equal(parsed.beginHour, 17, 'begin hour');
    assert.equal(parsed.endHour, 20, 'end hour');
});

test( "6:00 - 9:20p", function( assert ) {
    var parsed = ParsedCourseTime('MW  &nbsp;  6:00- 9:20p ')
    assert.equal(parsed.beginHour, 18, 'begin hour');
    assert.equal(parsed.endHour, 21, 'end hour');
});

test( "7:00 - 7:50p", function( assert ) {
    var parsed = ParsedCourseTime('MW  &nbsp; 7:00- 7:50p')
    assert.equal(parsed.beginHour, 19, 'begin hour');
    assert.equal(parsed.endHour, 19, 'end hour');
});

test( "8:00 - 9:50p", function( assert ) {
    var parsed = ParsedCourseTime('MWF  &nbsp;  8:00- 9:50p ')
    assert.equal(parsed.beginHour, 20, 'begin hour');
    assert.equal(parsed.endHour, 21, 'end hour');
});

test( "9:00 - 9:50p", function( assert ) {
    var parsed = ParsedCourseTime('MWF &nbsp;   9:00- 9:50p ')
    assert.equal(parsed.beginHour, 21, 'begin hour');
    assert.equal(parsed.endHour, 21, 'end hour');
});

test( "10:00 - 10:50p", function( assert ) {
    var parsed = ParsedCourseTime('MWF &nbsp;  10:00- 10:50p ')
    assert.equal(parsed.beginHour, 22, 'begin hour');
    assert.equal(parsed.endHour, 22, 'end hour');
});