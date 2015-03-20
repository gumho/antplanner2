# Antplanner2
[![Build Status](https://travis-ci.org/gumho/antplanner2.svg?branch=master)](https://travis-ci.org/gumho/antplanner2)

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

1. Download and install the [Google AppEngine Python SDK](https://cloud.google.com/appengine/downloads)
2. git clone http://github.com/gumho/antplanner2
3. cd antplanner2
4. dev_appserver.py .

## Running the Tests

Believe it or not, AntPlanner has tests (coverage is another story...).

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

(See [Issues page](https://github.com/gumho/antplanner2/issues/) on Github project)


