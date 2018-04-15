 
exports.defineAutoTests = function () {
  describe('Whois (window.Whois)', function () {
    it('should exist', function (done) {
      expect(window.Whois).toBeDefined();
      done();
    });
  });

  describe('Success callback', function () {

    it('should take an argument that is an array of results', function (done) {
      var w, success, err;
      w = new window.Whois();
      success = function (r) {
        expect(r).toBeDefined();
        expect(r.length > 0).toBe(true);
        expect(r[0].query).toBe('apache.org@whois.pir.org');
        expect(r[0].status).toBe('success');
        expect(typeof r[0].result).toBe('string');
        done();
      };
      err = function (e) {
        console.log(e);
      };
      w.whois(['apache.org@whois.pir.org'], success, err);
    });
  });
};
