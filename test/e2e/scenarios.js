'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Pulp Web App', function() {

  it('should redirect index.html to index.html#/repos', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/repos');
      });
  });


  describe('Repos list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/repos');
    });


    it('should filter the repos list as a user types into the search box', function() {

      var reposList = element.all(by.repeater('repo in repos'));
      var query = element(by.model('query'));

      var initialCount = reposList.count();

      query.sendKeys('epel');
      expect(reposList.count()).toBeLessThan(initialCount);

      query.clear();
      query.sendKeys('puppet');
      expect(reposList.count()).toBeLessThan(initialCount);
    });

    it('should change the order on request', function() {
      var reposList = element.all(by.repeater('repo in repos')).first().all(by.binding('numpkg'));
      var ordering = element(by.model('orderRepo'));
      var query = element(by.model('query'));

      query.sendKeys('puppet');
      expect(reposList.first().getText()).toContain('131');

      element(by.model('orderRepo')).element(by.css('option[value="numpkg"]')).click();
 
      expect(reposList.first().getText()).toContain('77');

       
    });

   it('should reverse the order when directed', function() {

      var reposList = element.all(by.repeater('repo in repos')).first().all(by.binding('numpkg'));
      var ordering = element(by.model('orderRepo'));
      var query = element(by.model('query'));

      query.sendKeys('puppet');
      element(by.model('orderRepo')).element(by.css('option[value="numpkg"]')).click();
      expect(reposList.first().getText()).toContain('77');
      element(by.model('orderRev')).click();
      expect(reposList.first().getText()).toContain('529');

   });

   it('should not show unpublished repos', function() {
     var reposList = element.all(by.repeater('repo in repos'));
     var initialSize = reposList.count();
     element(by.model('repoEnabled')).click();
     expect(reposList.count()).toBeGreaterThan(initialSize);
     
   }); 

    it('should contain links to the repo', function() {
    var query = element(by.model('query'));

    query.sendKeys('centos-6-server-x86_64-os-stable');
    var repoFirstUrl = element.all(by.repeater('repo in repos')).first().all(by.css('li p a'));

    expect(repoFirstUrl.count()).toBe(1);

    expect(repoFirstUrl.get(0).getAttribute('href')).toEqual('http://ld4repo02.ld4.lmax/pulp/repos/v2/centos/6/server/x86_64/os/stable');


    });


  });
});
