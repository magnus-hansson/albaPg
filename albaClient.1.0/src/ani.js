import {inject} from 'aurelia-framework';
import {CssAnimator} from 'aurelia-animator-css';

// Use this decorator to inject the animator
@inject(CssAnimator)
export class ListExample{

  heading = 'List Example';

  listItems = [
    { listItem: 'pencils', qty: 2 },
    { listItem: 'glue', qty: 1 },
  ];

  // The inject decorator needs an appropriate constructor
  // to inject the animator.
  constructor(animator) {
    this.animator = animator;
  }

  addListItem() {
     this.listItems.unshift({listItem: 'packing tape',  qty: 1 });

     // then removeClass method returns a promise. We can use "then"
     // to chain it to addClass. This allows us to 'toggle' the class on the
     // element - and fire the animation
     this.animator.removeClass(this.elGridCount, 'au-attention')
        .then(this.animator.addClass(this.elGridCount, 'au-attention'));
  }

}