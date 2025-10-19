  describe('minChars()', () => {
    it('should enforce minimum length', () => {
      const validator = minChars(5)
      expect(validator('hi')).not.toBe('')
      expect(validator('hello')).toBe('')
    })
  })