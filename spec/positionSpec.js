describe('Position', function(){
    it('should exist', function(){
        expect(perspective.Position).toBeDefined();
    });

    describe('constructor', function(){
        it('should throw on missing \'x\' argument', function(){
            function createPositionWithoutX(){
                new perspective.Position(undefined);
            }

            expect(createPositionWithoutX).toThrow(Error('missing argument'));
        });

        it('should throw on missing \'y\' argument', function(){
            function createPositionWithoutY(){
                new perspective.Position(1, undefined);
            }

            expect(createPositionWithoutY).toThrow(Error('missing argument'));
        });

        it('should throw on non-number \'x\' argument', function(){
            function createPositionWithNonNumberX(){
                new perspective.Position('a', 1);
            }

            expect(createPositionWithNonNumberX).toThrow(Error('no number argument'));
        });

        it('should throw on non-number \'y\' argument', function(){
            function createPositionWithNonNumberY(){
                new perspective.Position(1, 'b');
            }

            expect(createPositionWithNonNumberY).toThrow(Error('no number argument'));
        });

        it('should create fields \'x\' and \'y\'', function(){
            var x = 1, y = 2;

            var position = new perspective.Position(x, y);

            expect(position.x).toBe(x);
            expect(position.y).toBe(y);
        });
    });

    describe('placeAt', function(){
        var position;

        beforeEach(function(){
            position = new perspective.Position(0, 0);
        });

        it('should throw on missing \'x\' argument', function(){
            function placeAtWithoutX(){
                position.placeAt(1, undefined);
            }

            expect(placeAtWithoutX).toThrow(Error('missing argument'));
        });

        it('should throw on missing \'y\' argument', function(){
            function placeAtWithoutY(){
                position.placeAt(1, undefined);
            }

            expect(placeAtWithoutY).toThrow(Error('missing argument'));
        });

        it('should throw on non-number \'x\' argument', function(){
            function placeAtWithNonNumberX(){
                position.placeAt('a', 1);
            }

            expect(placeAtWithNonNumberX).toThrow(Error('no number argument'));
        });

        it('should throw on non-number \'y\' argument', function(){
            function placeAtWithNonNumberY(){
                position.placeAt(1, 'b');
            }

            expect(placeAtWithNonNumberY).toThrow(Error('no number argument'));
        });

        it('should change \'x\' and \'y\' fields', function(){
            var x = 2, y = 3;

            position.placeAt(x, y);

            expect(position.x).toBe(x);
            expect(position.y).toBe(y);
        });
    });
});
