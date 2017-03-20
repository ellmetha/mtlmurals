import DOMRouter from 'core/DOMRouter';


describe('DOMRouter', () => {
  test('can run a specific action of a specific controller', () => {
    let testController = { init: jest.fn(), };
    let controllers = { test: testController, };
    let router = new DOMRouter(controllers);
    router.execAction('test', 'init');
    expect(testController.init).toHaveBeenCalled();
  });

  test('can trigger the right controller using data attributes on the <body> tag', () => {
    let testController01 = { init: jest.fn(), doSomething: jest.fn(), doSomethingElse: jest.fn(), };
    let testController02 = { init: jest.fn(), doSomethingElseAgain: jest.fn(), };
    let controllers = { test01: testController01, test02: testController02, };
    let router = new DOMRouter(controllers);
    // Set up our document body
    document.body.setAttribute('data-controller', 'test01');
    document.body.setAttribute('data-action', 'doSomething');
    router.init();
    expect(testController01.init).toHaveBeenCalled();
    expect(testController01.doSomething).toHaveBeenCalled();
    expect(testController01.doSomethingElse).not.toHaveBeenCalled();
    expect(testController02.init).not.toHaveBeenCalled();
    expect(testController02.doSomethingElseAgain).not.toHaveBeenCalled();
  });
});
