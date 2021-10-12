import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from './../../presentation/errors'

describe('RequiredField Validation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('firsField', 'fieldToCompare')
    const error = sut.validate({ firsField: 'any_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return a InvalidParamError if validation succeeds', () => {
    const sut = new CompareFieldsValidation('firsField', 'fieldToCompare')
    const error = sut.validate({ firsField: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
