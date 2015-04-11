describe('Eye', function(){
    it('should exist', function(){
        expect(perspective.Eye).toBeDefined();
    });

    it('should be an \'Entity\'', function(){
        expect((new perspective.Eye(0,0,0) instanceof perspective.Entity)).toBeTruthy();
    });
});
