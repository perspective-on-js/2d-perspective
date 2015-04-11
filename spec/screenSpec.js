describe('Screen', function(){
    it('should exist', function(){
        expect(perspective.Screen).toBeDefined();
    });

    it('should be an \'Entity\'', function(){
        expect(new perspective.Screen(10) instanceof perspective.Entity).toBeTruthy();
    });
});
