SCSS (Sassy CSS) is a powerful CSS preprocessor that extends the functionality of standard CSS. It provides several features that make writing and maintaining CSS more efficient and organized. Here are some common uses of SCSS with examples:

## Variables
SCSS allows you to define variables to store reusable values like colors, font sizes, or spacing. This promotes consistency and makes it easy to update styles across multiple components by modifying a single variable.

```scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$font-stack: 'Helvetica', sans-serif;

body {
  color: $primary-color;
  font-family: $font-stack;
}

a {
  color: $secondary-color;
}
```

## Nesting
SCSS enables you to nest selectors, which mirrors the HTML structure. This feature helps to organize styles more logically and intuitively, making the code simpler to understand and maintain.

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

## Mixins
Mixins are reusable blocks of CSS that can be included in multiple selectors. They are incredibly useful for applying styles that are used frequently, reducing code duplication, and promoting maintainability.

```scss
@mixin button-style {
  background-color: $primary-color;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.button {
  @include button-style;
}

.submit-button {
  @include button-style;
  font-size: 18px;
}
```

## Partials and Imports
SCSS allows you to split your stylesheets into smaller, modular files called partials. These partials can be imported into a main stylesheet, keeping your code organized and maintainable.

```scss
// _variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;

// _base.scss
@import 'variables';

body {
  color: $primary-color;
  font-family: 'Helvetica', sans-serif;
}

// main.scss
@import 'variables';
@import 'base';
```

## Inheritance
SCSS provides the `@extend` directive, which allows you to share a set of CSS properties from one selector to another. This helps to reduce repetitive code and makes your stylesheets more concise.

```scss
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}
```

These are just a few examples of how SCSS can be used to enhance your CSS development workflow. By leveraging features like variables, nesting, mixins, and partials, you can write more maintainable, modular, and scalable CSS code.

Citations:
[1] https://www.kanakinfosystems.com/blog/benefits-of-using-scss-over-css
[2] https://wpwebinfotech.com/blog/css-vs-scss/
[3] https://www.linkedin.com/pulse/boost-your-web-development-efficiency-5-advantages-scss-rahul-bisht
[4] https://www.geeksforgeeks.org/what-is-the-difference-between-scss-and-sass/
[5] https://www.geeksforgeeks.org/what-is-the-difference-between-css-and-scss/
[6] https://www.mugo.ca/Blog/7-benefits-of-using-SASS-over-conventional-CSS
[7] https://sass-lang.com/guide/
[8] https://sass-lang.com/documentation/at-rules/use/