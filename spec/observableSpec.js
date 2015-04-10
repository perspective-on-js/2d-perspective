describe('Observable', function(){
    it('should exist', function(){
        expect(perspective.Observable).toBeDefined();
    });

    describe('workflow', function(){
        var observable;

        beforeEach(function(){
            observable = new perspective.Observable();
        });

        it('should notify observers', function(){
            var notified = false;
            observable.on('test', function(){ notified = true; });

            observable.emit('test');

            expect(notified).toBeTruthy();
        });

        it('should pass arguments when notified', function(){
            var intendedFirst = 1, intendedSecond = 2;
            var first, second;
            observable.on('test', function(f, s){ first = f; second = s; });

            observable.emit('test', intendedFirst, intendedSecond);

            expect(first).toBe(intendedFirst);
            expect(second).toBe(intendedSecond);
        });
    });
});
