(function(perspective){
    var canvas = document.getElementById('viewport');

    var options = {
        'eye': {
            'radius': 5
        },
        'screen': {
            'width': Math.max(canvas.width, canvas.height)
        },
        'background': {
            'width': canvas.width,
            'height': canvas.height
        }
    };

    var context = canvas.getContext('2d');
    context.translate(canvas.width/2, canvas.height - 2 * options.eye.radius);
    context.scale(1, -1);

    var scene = new perspective.Scene(50);
    var line = scene.addLine(-100, 300, Math.PI/2, 50);
    new perspective.SceneView(scene, context, options);

    canvas.addEventListener('mousemove', function(event){
        var x = event.pageX - this.offsetLeft - canvas.width/2;
        var y = canvas.height - 2 * options.eye.radius - (event.pageY - this.offsetTop);
        line.placeAt(x, y);
    });
})(perspective);
