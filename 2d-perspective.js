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

    function throwOnInvalidPositionArguments(x, y) {
        throwOnMissingArgument(x);
        throwOnMissingArgument(y);
        throwOnNonNumberArgument(x);
        throwOnNonNumberArgument(y);
    }

    var Position = perspective.Position = function(x, y) {
        Observable.call(this);
        throwOnInvalidPositionArguments(x, y);
        this.x = x;
        this.y = y;
    };
    Position.prototype = Object.create(Observable.prototype);
    Position.prototype.constructor = Position;
    Position.prototype.placeAt = function(x, y) {
        throwOnInvalidPositionArguments(x, y);
        var oldX = this.x, oldY = this.y;
        this.x = x; this.y = y;
        this.emit('moved', this.x, this.y, oldX, oldY);
    };

    function throwOnInvalidOrientateArguments(orientation){
        throwOnMissingArgument(orientation);
        throwOnNonNumberArgument(orientation);
    };

    var Entity = perspective.Entity = function(x, y, orientation){
        Position.call(this, x, y);
        throwOnInvalidOrientateArguments(orientation);
        this.orientation = orientation;
    };
    Entity.prototype = Object.create(Position.prototype);
    Entity.prototype.constructor = Entity;
    Entity.prototype.orientateTo = function(orientation){
        throwOnInvalidOrientateArguments(orientation);
        var oldOrientation = this.orientation;
        this.orientation = orientation;
        this.emit('orientated', this.orientation, oldOrientation);
    };

    var Eye = perspective.Eye = function(){
        Entity.call(this, 0, 0, 0);
    };
    Eye.prototype = Object.create(Entity.prototype);
    Eye.prototype.constructor = Eye;

    var Screen = perspective.Screen = function(y){
        Entity.call(this, 0, y, Math.PI/2);
    };
    Screen.prototype = Object.create(Entity.prototype);
    Screen.prototype.constructor = Screen;

    function throwOnInvalidLineArguments(width){
        throwOnMissingArgument(width);
        throwOnNonNumberArgument(width);
    };

    var Line = perspective.Line = function(x, y, orientation, width){
        Entity.call(this, x, y, orientation);
        throwOnInvalidLineArguments(width);
        this.width = width;
    };
    Line.prototype = Object.create(Entity.prototype);
    Line.prototype.constructor = Line;
    Line.prototype.resizeTo = function(width){
        throwOnInvalidLineArguments(width);
        var oldWidth = this.width;
        this.width = width;
        this.emit('resized', this.width, oldWidth);
    };
})(window.perspective = window.perspective || {})
