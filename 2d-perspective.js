;(function(perspective, undefined){
    /* A 2d model to explain perspective */
    function extend(){
        var result = {};
        Array.prototype.slice.call(arguments).forEach(function(data){
            for (var key in data) {
                if (result[key] === undefined) {
                    result[key] = data[key];
                }
            }
        });

        return result;
    }

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

    var Scene = perspective.Scene = function(y){
        Observable.call(this);
        this.eye = new Eye(0, 0, 0);
        this.screen = new Screen(y);
        this.lines = [];
    };
    Scene.prototype = Object.create(Observable.prototype);
    Scene.prototype.constructor = Scene;
    Scene.prototype.addLine = function(x, y, orientation, width){
        this.lines.push(new Line(x, y, orientation, width));
    };

    var EyeView = perspective.EyeView = function(model, context, options){
        this.options = extend(options || {}, { radius: 5 });
        this.model = model;
        this.context = context;
        this.model.on('moved', this.update.bind(this));
        this.update();
    };
    EyeView.prototype.update = function(){
        var context = this.context;
        context.beginPath();
        context.arc(this.model.x, this.model.y, this.options.radius, 0, 2*Math.PI);
        context.fill();
    };

    var ScreenView = perspective.ScreenView = function(model, context, options){
        this.options = extend(options || {}, { width: 100 });
        this.model = model;
        this.context = context;
        this.model.on('moved', this.update.bind(this));
        this.update();
    };
    ScreenView.prototype.update = function(){
        var context = this.context;
        context.beginPath()
        context.moveTo(
            this.model.x - this.options.width * Math.sin(this.model.orientation),
            this.model.y - this.options.width * Math.cos(this.model.orientation));
        context.lineTo(
            this.model.x + this.options.width * Math.sin(this.model.orientation),
            this.model.y + this.options.width * Math.cos(this.model.orientation));
        context.stroke();
    };

    var LineView = perspective.LineView = function(model, context, options){
        this.options = extend(options || {});
        this.model = model;
        this.context = context;
        this.model.on('moved', this.update.bind(this));
        this.update();
    };
    LineView.prototype.update = function(){
        var context = this.context;
        var x = this.model.x, y = this.model.y, width = this.model.width, orientation = this.model.orientation;
        context.beginPath();
        context.moveTo(x - width/2 * Math.sin(orientation), y - width/2 * Math.cos(orientation));
        context.lineTo(x + width/2 * Math.sin(orientation), y + width/2 * Math.cos(orientation));
        context.stroke();

    };

    var BackgroundView = function(context, options){
        this.options = extend(options || {}, { width: 640 }, { height: 480 });
        this.context = context;
        this.update();
    };
    BackgroundView.prototype.update = function(){
        this.context.clearRect(
                -this.options.width, -this.options.height,
            2 * this.options.width, 2 * this.options.height);
    };

    var SceneView = perspective.SceneView = function(model, context, options){
        this.options = extend(options || {});
        this.model = model;
        this.context = context;
        this.initialize();
        this.wire();
        this.update();
    };
    SceneView.prototype.initialize = function(){
        this.views = [
            new BackgroundView(this.context, this.options.background),
            new EyeView(this.model.eye, this.context, this.options.eye),
            new ScreenView(this.model.screen, this.context, this.options.screen)
        ];
        this.model.lines.forEach(function(line){
            this.views.push(new LineView(line, this.context, this.options.line));
        }.bind(this));
    };
    SceneView.prototype.wire = function(){
        var update = this.update.bind(this);
        this.model.eye.on('moved', update);
        this.model.screen.on('moved', update);
        this.model.lines.forEach(function(line){
            line.on('moved', update);
        });
    };
    SceneView.prototype.update = function(){
        this.views.forEach(function(view){
            view.update();
        });
    };
})(window.perspective = window.perspective || {})
