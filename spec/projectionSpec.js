describe('projection', function(){
    var eye, screen, line;

    beforeEach(function(){
        eye = new perspective.Eye();
    });

    beforeEach(function(){
        screen = new perspective.Screen(50);
    });

    beforeEach(function(){
        line = new perspective.Line(-50, 100, Math.PI/2, 100);
    });

    it('should exist', function(){
        expect(perspective.Projection).toBeDefined();
    });

    it('should be a \'Line\'', function(){
        expect(new perspective.Projection(eye, screen, line) instanceof perspective.Line).toBeTruthy();
    });

    describe('constructor', function(){
        it('should throw on missing \'eye\' argument', function(){
            function createProjectionWithoutEye(){
                new perspective.Projection(undefined, screen, line);
            };

            expect(createProjectionWithoutEye).toThrow(Error('missing argument'));
        });

        it('should throw on missing \'screen\' argument', function(){
            function createProjectionWithoutScreen(){
                new perspective.Projection(eye, undefined, line);
            };

            expect(createProjectionWithoutScreen).toThrow(Error('missing argument'));
        });

        it('should throw on missing \'line\' argument', function(){
            function createProjectionWithoutLine(){
                new perspective.Projection(eye, line, undefined);
            };

            expect(createProjectionWithoutLine).toThrow(Error('missing argument'));
        });
    });

    describe('update', function(){
        var projection;

        beforeEach(function(){
            projection = new perspective.Projection(eye, screen, line);
        });

        describe('when eye', function(){
            var notified = false;

            function notify(){
                notified = true;
            }

            beforeEach(function(){
                notified = false;
            });

            it('moves', function(){
                projection.on('moved', notify)

                eye.placeAt(0, 25);

                expect(notified).toBeTruthy();
            });
        });

        describe('when screen', function(){
            var notified = false;

            function notify(){
                notified = true;
            }

            beforeEach(function(){
                notified = false;
            });

            it('reorientates', function(){
                projection.on('orientated', notify)

                screen.orientateTo(Math.PI/4);

                expect(notified).toBeTruthy();
            });

            it('moves', function(){
                projection.on('moved', notify)

                screen.placeAt(0, 25);

                expect(notified).toBeTruthy();
            });
        });

        describe('when line', function(){
            var notified = false;

            function notify(){
                notified = true;
            }

            beforeEach(function(){
                notified = false;
            });

            it('reorientates', function(){
                projection.on('orientated', notify)

                line.orientateTo(Math.PI/4);

                expect(notified).toBeTruthy();
            });

            it('moves', function(){
                projection.on('moved', notify)

                line.placeAt(0, 25);

                expect(notified).toBeTruthy();
            });

            it('resizes', function(){
                projection.on('resized', notify)

                line.resizeTo(50);

                expect(notified).toBeTruthy();
            });
        });

    });
});
