# Antplanner2

by Ryan Hsu

This is a revamp of the original Antplanner. The motivation for the rewrite is mainly to improve Antplanner by improving code quality. There are a few reasons for this:

**Foster code contribution**  
The old code was ~2 years old and resembled spaghetti. People don't want to hack on spaghetti.

**Bugs**  
Because the old code was maintainable, it was harder to fix bugs. It was faster to rewrite the code than patch the bugs. Seriously.

**Excuse to play with new technology**  
Antplanner2 uses shiny new HTML5 APIs and various other technologies.

There are a million other reasons but most importantly, this rewrite should benefit UCI students all around! 

## How to get up and running

These instructions are going to be a bit esoteric for now. Bear with me until things are sorted out.

1. Download and install the Google AppEngine Python SDK
2. Clone this repo (git clone)
3. Load the app into the GoogleAppEngineLauncher and hit 'Run'

## Running the Tests

Believe it or not, AntPlanner has tests. 

Run the Javascript tests by running the application and navigating to:

	http://<your-server>/test

Run the Integration tests with the runtests.py script available in the project root:

	runtests.py SDK_PATH tests

On Mac OS X, the SDK_PATH is /usr/local/google_appengine by default (if you had the symlinks installed). 

## Compatibility

I'm not totally set on this yet. All I know now is that I don't plan on supporting IE7 or older.

Currently, the following features are in use. I'll need to investigate further and create a compatibility matrix later:

- native JSON.stringify()
- HTML5 localStorage
- CSS 3

## Known Issues

- Can't display Sunday and Saturday courses

## TODO

- performance optimization
	- log searches to improve memcache hit ratios
	- defer html processing to client-side
	- hosted js libraries
- descriptive error messages when cant save/load course
- limit # of courses that can be saved
- error handling
- cron for deleting stale schedules
- SEO
- show/hide Sun and Sat
- maximizable panes
- social integration (facebook)



