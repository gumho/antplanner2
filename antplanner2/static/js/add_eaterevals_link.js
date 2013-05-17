$(document).ready(function() {
    $("tr").each(function() {
        // The 4th child is typically the instructor column
        var element = $("td:eq(4)", this);
        var elementText = element.text();

        // Check to see if it's similar to an instructor's name:
        //     LASTNAME, F.
        //     SMITH, J.
        if (elementText.contains(',') && elementText.contains('.')) {
            var instructorNames = element.html().split('<br>');
            var instructorLinks = [];
            for (i = 0; i < instructorNames.length; i++) {
                var instructorName = instructorNames[i].trim();

                // Ignore STAFF instructors
                if (instructorName == 'STAFF') {
                    instructorLinks.push('STAFF');
                    continue;
                }

                // Build the link to EaterEvals
                var lastName = instructorName.split(',')[0];
                var link = "https://eaterevals.eee.uci.edu/browse/instructor#"+lastName;
                instructorLinks.push('<a class="instructor-link" href="'+link+'" target="_blank">'+instructorName+'</a>');
            }
            element.html(instructorLinks.join('<br />'));
        }
    });

    // Stop propagation from reaching the parent (the click handler for the course row)
    $("a.instructor-link").click(function(e) {
        e.stopPropagation();
    });
});
