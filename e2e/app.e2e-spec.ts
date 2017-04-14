import { MeiDemoPage } from './app.po';

describe('mei-demo App', () => {
  let page: MeiDemoPage;

  beforeEach(() => {
    page = new MeiDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
