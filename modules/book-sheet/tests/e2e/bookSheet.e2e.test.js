'use strict';

describe('Book Sheet E2E Tests', function () {
  var userCredentials = {
    firstName :'test',
    lastName :'user',
    email:'test@meanjs.com',
    username:'meanjstest',
    password:'P@ssw0rd123'
  };


  describe('Navigating to Book Sheet when signed out', function () {
    it('should redirect to signin page when going to /bookSheet', function () {
      browser.get('http://localhost:3001/bookSheet');
      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/authentication/signin');
    });

    it('should redirect to signin page when going to /bookSheet/create', function () {
      browser.get('http://localhost:3001/bookSheet/create');
      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/authentication/signin');
    });
  });

  describe('bookSheet when signed in', function () {
    it('should signup and signin', function () {
      browser.get('http://localhost:3001/authentication/signup');

      element(by.model('credentials.firstName')).sendKeys(userCredentials.firstName);

      element(by.model('credentials.lastName')).sendKeys(userCredentials.lastName);

      element(by.model('credentials.email')).sendKeys(userCredentials.email);

      element(by.model('credentials.username')).sendKeys(userCredentials.username);

      element(by.model('credentials.password')).sendKeys(userCredentials.password);

      element(by.css('button[type="submit"]')).click();

      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/');
    });

    it('should be able to access /bookSheet', function () {
      browser.get('http://localhost:3001/bookSheet');

      expect(element(by.tagName('h1')).getText()).toBe('BookSheet');
    });


    it('should be able to access /bookSheet/create', function () {
      browser.get('http://localhost:3001/bookSheet/create');

      expect(element(by.tagName('h3')).getText()).toBe('Create new Post');
    });

    it('should be able to see and error when title is blank', function () {
      element(by.model('text')).sendKeys('Hello World');

      element(by.css('button[type="submit"]')).click();

      expect(element(by.css('.error-text')).getText()).toBe('Post title is required.');
    });

    it('should be able to access /bookSheet/create', function () {
      browser.get('http://localhost:3001/bookSheet/create');

      element(by.model('title')).sendKeys('Sample Post');

      element(by.model('text')).sendKeys('Hello World');

      element(by.css('button[type="submit"]')).click();

      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/bookSheet');

      expect(element.all(by.repeater('post in posts')).count()).toBe(1);
    });


    it('should be able delete a post', function () {
      browser.get('http://localhost:3001/bookSheet');

      element(by.css('button.btn-danger')).click();

      expect(element.all(by.repeater('post in posts')).count()).toBe(0);

      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/bookSheet');
    });























  });
});
