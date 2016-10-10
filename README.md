![image](https://cloud.githubusercontent.com/assets/1544557/19167633/6cf42cc4-8bc1-11e6-98b9-8645f01bd5ce.png)

# RxJS Examples in Angular 2

This project contains several mini-apps, showcasing RxJS observables and operators and how they can be combined to perform tasks of varying difficulty and awesomeness. Also included are several, more complex "real-world" examples that combine the power of observables with a realtime database from Firebase. Below is a link to a blog post with the AngularConnect talk and slides that facilitated the creation of this project. Oh and there are also some great resources for reactive programming. You're welcome.

[#GoBeastModeOrGoHome](http://onehungrymind.com/realtime-reactive-interfaces-angular-firebase/)

## Prerequisites
* You will need to have NodeJS and NPM installed from [nodejs.org](https://nodejs.org)
* You will need a Google account (generally associated with Gmail)

## Getting the code
Run the following in the terminal or command prompt to download and enter the project:
```bash
git clone https://github.com/onehungrymind/angular2-rxjs-examples.git
cd angular2-rxjs-examples
```
## Setting up a Firebase account
Simply navigate to https://firebase.google.com/ and click the "GET STARTED FOR FREE" button. Once you have signed in via Google, you will have access to your Firebase console.

## Setting up Firebase in the Angular app
From your [Firebase console](https://console.firebase.google.com/), click "CREATE NEW PROJECT". Then fill in the necessary details and go to that project's dashboard. Then click the "Add Firebase To Your Web App" button toward the top-right of the screen.

Open the project in a code editor and copy `src > app > firebase.conf.example.ts` to `src > app > firebase.conf.ts`. Then fill in `firebase.conf.ts` with the information showing in your project's dashboard (note that "storageBucket" is optional and that "messagingSenderId" is not used at all). Last but not least, save the file.

## Running the app
Run the following commands in the project directory to install dependencies and start the app:
```bash
npm i
npm start # or ng serve
```
Then navigate to http://localhost:4200 and the app will be running.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.
