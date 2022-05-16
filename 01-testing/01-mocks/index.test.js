const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

;
(async () => {
  {
    const filePath = './mocks/empty-file-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/header-invalid.csv'
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/greater-then-three-items-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const currentYear = new Date().getFullYear()
    const filePath = './mocks/three-items-valid.csv'
    const expected = [
      {
        "id": 123,
        "name": "Carlos Manu",
        "profession": "Javascript Instructor",
        "birthYear": currentYear - 25
      },
      {
        "id": 321,
        "name": "Reave Ton",
        "profession": "Javascript Specialist",
        "birthYear": currentYear - 80
      },
      {
        "id": 345,
        "name": "Juan Carlos",
        "profession": "PHP Instructor",
        "birthYear": currentYear - 30
      }
    ]
    const result = await File.csvToJson(filePath)
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()