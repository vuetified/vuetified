webpackJsonp([22],{

/***/ 581:
/***/ (function(module, exports) {

/**
 * Vuetified helper class. Used to set common properties on all forms.
 */
window.AppForm = function (data) {
  var form = this;

  _.extend(this, data);

  /**
   * Create the form error helper instance.
   */
  this.errors = new AppFormErrors();

  this.busy = false;
  this.successful = false;

  /**
   * Start processing the form.
   */
  this.startProcessing = function () {
    form.errors.forget();
    form.busy = true;
    form.successful = false;
  };

  /**
   * Finish processing the form.
   */
  this.finishProcessing = function () {
    form.busy = false;
    form.successful = true;
  };

  /**
   * Reset the errors and other state for the form.
   */
  this.resetStatus = function () {
    form.errors.forget();
    form.busy = false;
    form.successful = false;
  };

  /**
   * Set the errors on the form.
   */
  this.setErrors = function (errors) {
    form.busy = false;
    form.errors.set(errors);
  };
};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Zvcm1zL2Zvcm1zLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIkFwcEZvcm0iLCJkYXRhIiwiZm9ybSIsIl8iLCJleHRlbmQiLCJlcnJvcnMiLCJBcHBGb3JtRXJyb3JzIiwiYnVzeSIsInN1Y2Nlc3NmdWwiLCJzdGFydFByb2Nlc3NpbmciLCJmb3JnZXQiLCJmaW5pc2hQcm9jZXNzaW5nIiwicmVzZXRTdGF0dXMiLCJzZXRFcnJvcnMiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7OztBQUdBQSxPQUFPQyxPQUFQLEdBQWlCLFVBQVVDLElBQVYsRUFBZ0I7QUFDN0IsTUFBSUMsT0FBTyxJQUFYOztBQUVBQyxJQUFFQyxNQUFGLENBQVMsSUFBVCxFQUFlSCxJQUFmOztBQUVBOzs7QUFHQSxPQUFLSSxNQUFMLEdBQWMsSUFBSUMsYUFBSixFQUFkOztBQUVBLE9BQUtDLElBQUwsR0FBWSxLQUFaO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixLQUFsQjs7QUFFQTs7O0FBR0EsT0FBS0MsZUFBTCxHQUF1QixZQUFZO0FBQy9CUCxTQUFLRyxNQUFMLENBQVlLLE1BQVo7QUFDQVIsU0FBS0ssSUFBTCxHQUFZLElBQVo7QUFDQUwsU0FBS00sVUFBTCxHQUFrQixLQUFsQjtBQUNILEdBSkQ7O0FBTUE7OztBQUdBLE9BQUtHLGdCQUFMLEdBQXdCLFlBQVk7QUFDaENULFNBQUtLLElBQUwsR0FBWSxLQUFaO0FBQ0FMLFNBQUtNLFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxHQUhEOztBQUtBOzs7QUFHQSxPQUFLSSxXQUFMLEdBQW1CLFlBQVk7QUFDM0JWLFNBQUtHLE1BQUwsQ0FBWUssTUFBWjtBQUNBUixTQUFLSyxJQUFMLEdBQVksS0FBWjtBQUNBTCxTQUFLTSxVQUFMLEdBQWtCLEtBQWxCO0FBQ0gsR0FKRDs7QUFNQTs7O0FBR0EsT0FBS0ssU0FBTCxHQUFpQixVQUFVUixNQUFWLEVBQWtCO0FBQy9CSCxTQUFLSyxJQUFMLEdBQVksS0FBWjtBQUNBTCxTQUFLRyxNQUFMLENBQVlTLEdBQVosQ0FBZ0JULE1BQWhCO0FBQ0gsR0FIRDtBQUlILENBOUNELEMiLCJmaWxlIjoiMjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFZ1ZXRpZmllZCBoZWxwZXIgY2xhc3MuIFVzZWQgdG8gc2V0IGNvbW1vbiBwcm9wZXJ0aWVzIG9uIGFsbCBmb3Jtcy5cbiAqL1xud2luZG93LkFwcEZvcm0gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBmb3JtID0gdGhpc1xuXG4gICAgXy5leHRlbmQodGhpcywgZGF0YSlcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgZm9ybSBlcnJvciBoZWxwZXIgaW5zdGFuY2UuXG4gICAgICovXG4gICAgdGhpcy5lcnJvcnMgPSBuZXcgQXBwRm9ybUVycm9ycygpXG5cbiAgICB0aGlzLmJ1c3kgPSBmYWxzZVxuICAgIHRoaXMuc3VjY2Vzc2Z1bCA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBwcm9jZXNzaW5nIHRoZSBmb3JtLlxuICAgICAqL1xuICAgIHRoaXMuc3RhcnRQcm9jZXNzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3JtLmVycm9ycy5mb3JnZXQoKVxuICAgICAgICBmb3JtLmJ1c3kgPSB0cnVlXG4gICAgICAgIGZvcm0uc3VjY2Vzc2Z1bCA9IGZhbHNlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluaXNoIHByb2Nlc3NpbmcgdGhlIGZvcm0uXG4gICAgICovXG4gICAgdGhpcy5maW5pc2hQcm9jZXNzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3JtLmJ1c3kgPSBmYWxzZVxuICAgICAgICBmb3JtLnN1Y2Nlc3NmdWwgPSB0cnVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIGVycm9ycyBhbmQgb3RoZXIgc3RhdGUgZm9yIHRoZSBmb3JtLlxuICAgICAqL1xuICAgIHRoaXMucmVzZXRTdGF0dXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvcm0uZXJyb3JzLmZvcmdldCgpXG4gICAgICAgIGZvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgIGZvcm0uc3VjY2Vzc2Z1bCA9IGZhbHNlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBlcnJvcnMgb24gdGhlIGZvcm0uXG4gICAgICovXG4gICAgdGhpcy5zZXRFcnJvcnMgPSBmdW5jdGlvbiAoZXJyb3JzKSB7XG4gICAgICAgIGZvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgIGZvcm0uZXJyb3JzLnNldChlcnJvcnMpXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9mb3Jtcy9mb3Jtcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=