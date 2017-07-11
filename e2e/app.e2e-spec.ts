import { CampusRecruitmentPage } from './app.po';

describe('campus-recruitment App', () => {
  let page: CampusRecruitmentPage;

  beforeEach(() => {
    page = new CampusRecruitmentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
