describe('Line', function(){
    it('should exist', function(){
        expect(perspective.Line).toBeDefined();
    });

    it('should be an \'Entity\'', function(){
        expect(new perspective.Line(0, 0, 0, 1) instanceof perspective.Entity).toBeTruthy();
    });

    describe('constructor', function(){
        it('should throw on missing \'width\' argument', function(){
            function createLineWithoutWidth(){
                new perspective.Line(0,0,0, undefined);
            }

            expect(createLineWithoutWidth).toThrow(Error('missing argument'));
        });

        it('should throw on non-number \'width\' argument', function(){
            function createLineWithNonNumberWidth(){
                new perspective.Line(0,0,0, 'a');
            }

            expect(createLineWithNonNumberWidth).toThrow(Error('no number argument'));
        });

        it('should create \'width\' field', function(){
            var expectedWidth = 5;

            var line = new perspective.Line(0,0,0, expectedWidth);

            expect(line.width).toBe(expectedWidth);
        })
    });

    describe('resizeTo', function(){
        var line;

        beforeEach(function(){
            line = new perspective.Line(0, 0, Math.PI/2, 5);
        });
        it('should throw on missing \'width\' argument', function(){
            function resizeLineWithoutWidth(){
                line.resizeTo(undefined);
            }

            expect(resizeLineWithoutWidth).toThrow(Error('missing argument'));
        });

        it('should throw on non-number \'width\' argument', function(){
            function resizeLineWithNonNumberWidth(){
                line.resizeTo('a');
            }

            expect(resizeLineWithNonNumberWidth).toThrow(Error('no number argument'));
        });

        it('should change \'width\' field', function(){
            var expectedWidth = 10;

            line.resizeTo(expectedWidth);

            expect(line.width).toBe(expectedWidth);
        })
    });

    describe('events', function(){
        var line;

        beforeEach(function(){
            line = new perspective.Line(0,0,0,3);
        });

        describe('resized', function(){
            it('should be emitted on \'resizeTo\'', function(){
                var notified = false;
                line.on('resized', function(){ notified = true; });

                line.resizeTo(12);

                expect(notified).toBeTruthy();
            });

            it('should pass along current width and old width', function(){
                var actualWidth, actualOldWidth;
                line.on('resized', function(width, oldWidth){ actualWidth = width, actualOldWidth = oldWidth; });

                line.resizeTo(12);

                expect(actualWidth).toBe(12);
                expect(actualOldWidth).toBe(3);
            });
        });
    });
});
