'use strict';

System.register(['aurelia-framework', 'aurelia-animator-css'], function (_export, _context) {
  "use strict";

  var inject, CssAnimator, _dec, _class, ListExample;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaAnimatorCss) {
      CssAnimator = _aureliaAnimatorCss.CssAnimator;
    }],
    execute: function () {
      _export('ListExample', ListExample = (_dec = inject(CssAnimator), _dec(_class = function () {
        function ListExample(animator) {
          _classCallCheck(this, ListExample);

          this.heading = 'List Example';
          this.listItems = [{ listItem: 'pencils', qty: 2 }, { listItem: 'glue', qty: 1 }];

          this.animator = animator;
        }

        ListExample.prototype.addListItem = function addListItem() {
          this.listItems.unshift({ listItem: 'packing tape', qty: 1 });

          this.animator.removeClass(this.elGridCount, 'au-attention').then(this.animator.addClass(this.elGridCount, 'au-attention'));
        };

        return ListExample;
      }()) || _class));

      _export('ListExample', ListExample);
    }
  };
});
//# sourceMappingURL=ani.js.map
