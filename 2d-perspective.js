;(function(perspective, undefined){
    /* A 2d model to explain perspective */
    var Observable = perspective.Observable = function(){
        this.observers = {};
    };
    Observable.prototype.on = function(event, observer){
        (this.observers[event] = this.observers[event] || []).push(observer);
    };
    Observable.prototype.emit = function(event){
        var args = Array.prototype.slice.call(arguments, 1);
        (this.observers[event] || []).forEach(function(observer){
            observer.apply(observer, args);
        });
    };

    function throwOnMissingArgument(argument) {
        if (argument === undefined) {
            throw new Error('missing argument');
        }
    }

    function throwOnNonNumberArgument(argument) {
        if (typeof argument !== 'number') {
            throw new Error('no number argument');
        }
    }

    function throwOnInvalidArguments(x, y) {
        throwOnMissingArgument(x);
        throwOnMissingArgument(y);
        throwOnNonNumberArgument(x);
        throwOnNonNumberArgument(y);
    }

    var Position = perspective.Position = function(x, y) {
        Observable.call(this);
        throwOnInvalidArguments(x, y);
        this.x = x;
        this.y = y;
    };
    Position.prototype = Object.create(Observable.prototype);
    Position.prototype.constructor = Position;
    Position.prototype.placeAt = function(x, y) {
        throwOnInvalidArguments(x, y);
        var oldX = this.x, oldY = this.y;
        this.x = x; this.y = y;
        this.emit('moved', this.x, this.y, oldX, oldY);
    }
})(window.perspective = window.perspective || {})
