import DOMRouter from 'core/DOMRouter';


describe('DOMRouter', () => {
  test('can run a specific action of a specific controller', () => {
    let testController = { init: jest.fn(), };
    let controllers = { test: testController, };
    let router = new DOMRouter(controllers);
    router.execAction('test', 'init');
    expect(testController.init).toHaveBeenCalled();
  });
});
