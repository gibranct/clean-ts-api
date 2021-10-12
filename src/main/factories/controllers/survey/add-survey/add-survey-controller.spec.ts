import { badRequest, serverError } from './../../../../../presentation/helpers/http/http-helper'
import { AddSurveyController } from './add-survey-controller'
import { Validation, Controller, HttpRequest, AddSurvey, AddSurveyModel } from './add-survey-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

const makeAddSurvey = (): AddSurvey => {
  class ValidationStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return Promise.resolve()
    }
  }

  return new ValidationStub()
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
})

type SutTypes = {
  sut: Controller
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  test('should call validation with the correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeHttpRequest().body)
  })

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpReponse = await sut.handle(makeHttpRequest())
    expect(httpReponse).toEqual(badRequest(new Error()))
  })

  test('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyStub, 'add')
    await sut.handle(makeHttpRequest())
    expect(addSurveySpy).toHaveBeenCalledWith(makeHttpRequest().body)
  })

  test('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const httpReponse = await sut.handle(makeHttpRequest())
    expect(httpReponse).toEqual(serverError(new Error()))
  })
})
