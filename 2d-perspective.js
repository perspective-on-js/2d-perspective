;(function(perspective, undefined){
    /* A 2d model to explain perspective */
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

    var Position = perspective.Position = function(x, y){
        throwOnMissingArgument(x);
        throwOnMissingArgument(y);
        throwOnNonNumberArgument(x);
        throwOnNonNumberArgument(y);
        this.x = x;
        this.y = y;
    };
})(window.perspective = window.perspective || {})
