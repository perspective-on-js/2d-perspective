(function(perspective){
    var canvas = document.getElementById('viewport');

    var options = {
        'eye': {
            'radius': 5
        },
        'screen': {
            'width': Math.max(canvas.width, canvas.height)
        }
    };

    var context = canvas.getContext('2d');
    context.translate(canvas.width/2, canvas.height - 2 * options.eye.radius);
    context.scale(1, -1);

    var eye = new perspective.Eye(0, 0, 0);
    new perspective.EyeView(eye, context, options.eye);

    var screen = new perspective.Screen(50)
    new perspective.ScreenView(screen, context, options.screen);

    var line = new perspective.Line(-100, 300, Math.PI/2, 50);
    new perspective.LineView(line, context, options.line);
})(perspective);
