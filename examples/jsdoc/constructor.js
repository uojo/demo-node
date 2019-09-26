{
  /**
 * Generic dairy product.
 * @constructor
 */
  function DairyProduct () {}

  /**
 * Check whether the dairy product is solid at room temperature.
 * @abstract
 * @return {boolean}
 */
  DairyProduct.prototype.isSolid = function () {
    throw new Error ('must be implemented by subclass!');
  };

  const obj = new DairyProduct ();
  obj.isSolid ();
}

{
  /** @constructor */
  function OtherThingy () {
    /** @private */
    var foo = 0;

    /** @protected */
    this._bar = 1;

    /** @public */
    this.pez = 2;
  }
}
