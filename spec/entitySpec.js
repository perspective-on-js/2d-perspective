describe('Entity', function(){
    it('should exist', function(){
        expect(perspective.Entity).toBeDefined();
    });

    it('should be a \'Position\'', function(){
        expect(new perspective.Entity(0, 0, 0) instanceof perspective.Position).toBeTruthy();
    });

    describe('constructor', function(){
        it('should throw on missing \'orientation\' argument', function(){
            function createEntityWithoutOrientation(){
                new perspective.Entity(0,0, undefined);
            }

            expect(createEntityWithoutOrientation).toThrow(Error('missing argument'));
        });

        it('should throw on non-number \'orientation\' argument', function(){
            function createEntityWithNonNumberOrientation(){
                new perspective.Entity(0,0, 'a');
            }

            expect(createEntityWithNonNumberOrientation).toThrow(Error('no number argument'));
        });

        it('should create an \'orientation\' field', function(){
            var expectedOrientation = Math.PI;

            var entity = new perspective.Entity(0,0,expectedOrientation);

            expect(entity.orientation).toBe(expectedOrientation);
        });
    });

    describe('orientateTo', function(){
        var entity;

        beforeEach(function(){
            entity = new perspective.Entity(0, 0, 0);
        });

        it('should throw on missing \'orientation\' argument', function(){
            function orientEntityWithoutOrientation(){
                entity.orientateTo(undefined);
            }

            expect(orientEntityWithoutOrientation).toThrow(Error('missing argument'));
        });

        it('should throw on non-number \'orientation\' argument', function(){
            function orientEntityWithNonNumberOrientation(){
                entity.orientateTo('a');
            }

            expect(orientEntityWithNonNumberOrientation).toThrow(Error('no number argument'));
        });

        it('should change \'orientation\' field', function(){
            var expectedOrientation = Math.PI;

            entity.orientateTo(expectedOrientation);

            expect(entity.orientation).toBe(expectedOrientation);
        });
    });
});
