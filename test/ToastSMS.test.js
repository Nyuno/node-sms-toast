const ToastSMS = require('../lib/ToastSMS');

describe('ToastSMS', () => {
  describe('constructor(options)', () => {
    it('should create an instance of ToastSMS', () => {
      expect(new ToastSMS()).toBeInstanceOf(ToastSMS);
    });
  });
});
