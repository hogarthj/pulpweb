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

    it('should sort by number of packages request', function() {
      var reposList = element.all(by.repeater('repo in repos')).first().all(by.binding('numpkg'));
      var ordering = element(by.model('orderRepo'));
      var query = element(by.model('query'));

      query.sendKeys('puppet');
      expect(reposList.first().getText()).toContain('131');

      element(by.model('orderRepo')).element(by.css('option[value="numpkg"]')).click();
 
      expect(reposList.first().getText()).toContain('77');

       
    });

      it('should sort by last published', function() {
      var reposList = element.all(by.repeater('repo in repos')).first().all(by.binding('numpkg'));
      var ordering = element(by.model('orderRepo'));
      var query = element(by.model('query'));

      query.sendKeys('puppet');
      expect(reposList.first().getText()).toContain('131');

      element(by.model('orderRepo')).element(by.css('option[value="last_published"]')).click();

      expect(reposList.first().getText()).toContain('503');

       
    });


      it('should sort by last synchronised', function() {
      var reposList = element.all(by.repeater('repo in repos')).first().all(by.binding('numpkg'));
      var ordering = element(by.model('orderRepo'));
      var query = element(by.model('query'));

      query.sendKeys('puppet');
      expect(reposList.first().getText()).toContain('131');

      element(by.model('orderRepo')).element(by.css('option[value="last_sync"]')).click();

      expect(reposList.first().getText()).toContain('503');


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

    it('should show last published date', function() {
      var reposList = element.all(by.repeater('repo in repos')).first().all(by.binding('last_published'));
      expect(reposList.first().getText()).toNotBe('');
  
    });

    it('should show last sync and feed_url for upstream sources', function() {
      var repoList = element.all(by.repeater('repo in repos')).first();
      var query = element(by.model('query'));
      query.sendKeys('-upstream');
      expect(repoList.all(by.binding('last_sync')).first().getText()).toNotBe('');
      expect(repoList.all(by.binding('feed_url')).first().getAttribute('href')).toNotBe('');
    });

    it('should not show last sync or feed_url for non-upstream sources', function() {
      var repoList = element.all(by.repeater('repo in repos')).first();
      var query = element(by.model('query'));
      query.sendKeys('-stable');
      expect(repoList.all(by.binding('last_sync')).count()).toBe(0);
      expect(repoList.all(by.binding('feed_url')).count()).toBe(0);;
    });

    it('should display repo enable state if displaying both enabled and disabled repos', function() {
      var repoList = element.all(by.repeater('repo in repos')).first();
 
      expect(repoList.all(by.binding('enabled')).count()).toBe(0);
      element(by.model('repoEnabled')).click();
      expect(repoList.all(by.binding('enabled')).count()).toBe(1);

    });
  });
});
