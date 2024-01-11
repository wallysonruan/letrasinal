# LetraSinal Text Editor

## Purpose

LetraSinal ("LetterSign" in Portuguese), it's a plataform to edit text using both Latin and/or SignWriting Sutton writing systems. It's main goal is to allow people to write their texts without having to split the between multiple applications as it's done today.

## Technologies Used

This project uses the following technologies:

- **[npm](https://www.npmjs.com/):** A package manager for the JavaScript programming language. npm is used to manage the project's dependencies.

- **[Vue.js](https://vuejs.org/):** A progressive JavaScript framework for building user interfaces. Vue.js is the core framework used in this project.

  - **TypeScript:** An open-source language which builds on JavaScript by adding static type definitions. TypeScript is used in this project to provide a more robust architecture, making the code more readable and maintainable.

- **[Sutton-SignWriting/core](https://github.com/sutton-signwriting/core):** A core library for SignWriting that provides basic functionality for processing SignWriting scripts. This library is used in this project to process and manipulate Formal SignWriting (FSW) strings.

- **[Sutton-Signwriting/Sgnw-Components](https://github.com/sutton-signwriting/sgnw-components):** A library for SignWriting, the international standard for writing sign languages by hand or with computers. This library is used in this project to handle SignWriting scripts. This library is imported into the project through its official Content Delivery Network (CDN), check `index.html`.

Please note that this is a basic list and the project may use other technologies not mentioned here.

## How to Use

To use LetraSinal Text Editor, follow these steps:

1. **Clone this repository:** Use the following command to clone this repository to your local machine:

```bash
git clone https://github.com/wallysonruan/sw-something.git
```

2. **Install dependencies:** Navigate to the project directory and install the necessary dependencies with:

```bash
cd sw-something
npm install
```

3. **Start the application:** Start the application with the following command:

```bash
npm run serve
```

4. **Navigate to the application:** Open your web browser and navigate to http://localhost:5173 (or the URL provided in your terminal after running the previous command).

5. **Use the application:** You can now use the LetraSinal Text Editor to edit text using both Latin and/or SignWriting Sutton writing systems. Currently, there are two versions. The first one can be accessed as soon as the application is launched, the second one can be accessed at the http://localhost:5173/sw-something/test/. In the second version you can use the arrow keys to navigate in the text, press SPACE to add space between PageItem, and use mouse clicks to move the caret around. You can also change the sheet orientation between Vertical and Horizontal.

Please note that this is a work in progress and some features may not be fully implemented yet. Check the Road Map section for more details.

## Road Map

- [X] Support inputs in Formal SignWriting (FSW) – they should be converted to iconic writing as soon as inputed;
- [X] Support drag-and-drop for both writing systems – they should be moved to their final position;
- [ ] Integrate the application with the SignPuddle database;
  - [X] Allow users to multi-select signs and add them to their texts;
  - [ ] Allow users to choose their kind of filter search;
    - [ ] Starts with;
    - [ ] Anywhere;
    - [ ] Perfect match;
    - [ ] Choose what puddle to get signs from;
      - [ ] Country;
      - [ ] Dictionary, Literature, Encyclopedia.
    - [ ] Choose to see signs written by a specific author.
  - [ ] Use LetraSinal to create signs or texts, and publish them on SignPuddle.
- [X] User can use arrow keys to navigate in the text;
- [X] User can add space between PageItem by pressing SPACE;
- [X] User can move caret around with mouse clicks also;
- [X] User can change sheet orientation (Vertical / Horizontal);
- [ ] User can save their texts, open them later and re-edit as they like;
  - [ ] User can save;
  - [ ] User can retrieve saved page (s);
  - [ ] User can edit pages after retrieving them;
  - [ ] User can save again, overwriting the previous version.
- [ ] User can undo actions (such as delete or insert);
- [ ] User can choose diffente sizes for the page;
  - [ ] predefined sizes for pages (A4, A5, A10)
  - [ ] define their own custom sizes;
- [ ] SignWriting punctuations should be available by default for the user;
  - [ ] They should be able to add the punctuations by pressing the corresponding keyboard key;
  - [ ] They should be able to see them in the screen, and click on them by using tab-order and mouse cursor;
- [ ] User should be able to group signs in a cluster, such as a paragraph;
- [ ] User should be able to apply "title/h1" format on the signs (bigger font size, and bold formats)
