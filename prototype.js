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

    context.beginPath();
    context.arc(eye.x, eye.y, options.eye.radius, 0, 2*Math.PI);
    context.fill();

    var screen = new perspective.Screen(50)

    context.beginPath()
    context.moveTo(screen.x - options.screen.width * Math.sin(screen.orientation), screen.y - options.screen.width * Math.cos(screen.orientation));
    context.lineTo(screen.x + options.screen.width * Math.sin(screen.orientation), screen.y + options.screen.width * Math.cos(screen.orientation));
    context.stroke();

    var line = new perspective.Line(-100, 300, Math.PI/2, 50);

    context.beginPath()
    context.moveTo(line.x - line.width/2 * Math.sin(line.orientation), line.y - line.width/2 * Math.cos(line.orientation));
    context.lineTo(line.x + line.width/2 * Math.sin(line.orientation), line.y + line.width/2 * Math.cos(line.orientation));
    context.stroke();

})(perspective);
