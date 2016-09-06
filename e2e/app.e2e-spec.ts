import { Angular2RxjsExamplesPage } from './app.po';

describe('angular2-rxjs-examples App', function() {
  let page: Angular2RxjsExamplesPage;

  beforeEach(() => {
    page = new Angular2RxjsExamplesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
