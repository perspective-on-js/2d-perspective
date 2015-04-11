describe('Eye', function(){
    it('should exist', function(){
        expect(perspective.Eye).toBeDefined();
    });

    it('should be an \'Entity\'', function(){
        expect((new perspective.Eye() instanceof perspective.Entity)).toBeTruthy();
    });
});
