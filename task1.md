# Task 1

This is not a proper Test Plan. It is more like my apprach to the problem.
Described below cases in **What should be tested** section are needed to be tested and covered.

### DEVELOPERS

Below tests should be done automatically by writing a code:

- Unit tests
- Component tests
- Integration tests

#### What should be tested?:

- Each function should be tested in unit tests.
- Is data passed between componenents is not changed by the one of the componenets? Maybe some data is dubled or removed between them?<br/>
  Communication (main module -> matcher -> aggregator) - integration tests
- We can check result charOffset on the smaller chunks of text - Unit test/component
- Each component should be tested independently with stubbed data - component tests

### TESTERS

Manual tests main focus will be validation of the returned data from application.
Disclaimer: The scenarios listed in the following document should be tested.

#### What should be tested?:

- lineOffset - if the next word is in the same line or close to previous one by using (crtl + f)
- map size - number of arrays in the map represents finded values
- case sensitivity - if the program finds names which are starting by the small letters and adds them to map
- phrase inside of the word - if it adds the phrases that occurs inside of other word
- passing part of the word with capitall letter will be treated as a matching pattern example: `To mas`, `
- basic boundary conditions - what happened when we pass no data? What is the output then? What happens when we pass two names at once?

Tools for manual tests:

- Saving file as txt -> Visual Studio Code (we have lines with numbers) + finder with case sensitivity switch

Possible automatization optimizations:

- writing a script for finding a charOffset for a word where we can pass array of names. Result would be stored as `{name: [charOffset1, charOffset2]}`
- Simple fuctions for checking all names lineOffset(pass as an `<string>[]`).
- Using grep on file to find all names (it is possible to search multiple patterns)

## Considerations:

- Partialy manual tests can be covered in unit,component, integration section done by Develeopers - it is simple application
- Since It is basic application I don't want to add such tests like performance because it is not likely to be useful in the real world
