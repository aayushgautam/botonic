import { testDirectus, testContext } from '../helpers/directus'
import { Text, Image } from '../../../src/cms'

const TEXT_WITHOUT_B_WITHOUT_F = '4873aa47-f797-43c0-afbf-86700f52c9f6'
const TEXT_WITH_2B_WITHOUT_F = 'e808f179-cbae-4d2b-81ea-178018e9801c'
const TEXT_WITHOUT_B_WITH_F_T = '11d4756a-085c-4256-8edb-3e9db2472aeb'
const TEXT_WITHOUT_B_WITH_F_I = '630dbe23-10c6-4fb4-b71c-f4b734c6ac6a'
const TEXT_WITH_B_WITH_F_T_WITH_F_T = 'c9e56d03-9c18-4c97-ac6b-67fb0f38080d'
const TEXT_WITH_CUSTOM_FIELD = 'b52a16f9-1aed-4d71-bfb2-445399bdca2d'
const TEXT_WITH_B_TYPE_TEXT = '3f622db8-6206-4e4d-ac82-6bf508414941'

test('Test: directus text without buttons without followup', async () => {
  const directus = testDirectus()
  const testText = await directus.text(TEXT_WITHOUT_B_WITHOUT_F, testContext())
  expect(testText.buttons).toBeUndefined
  expect(testText.common.name).toEqual('z_TEST_TEXT_WITHOUT_B_WITHOUT_F')
  expect(testText.text).toEqual(
    'directus text without buttons and without followup'
  )
})

test('Test: directus text with buttons (with target payload and text) and without followup', async () => {
  const directus = testDirectus()
  const testText = await directus.text(TEXT_WITH_2B_WITHOUT_F, testContext())
  expect(testText.buttons![0].text).toEqual('buttonText')
  expect(testText.buttons![0].target).toEqual('payloadFromDirectus')
  expect(testText.buttons![1].text).toEqual('buttonText2')
  expect(testText.buttons![1].target).toEqual(
    'text$7b9cb226-a82c-46bc-8f82-e2d233a77de3'
  )
})

test('Test: directus text without buttons with text followup', async () => {
  const directus = testDirectus()
  const testText = await directus.text(TEXT_WITHOUT_B_WITH_F_T, testContext())
  const followup = testText.common.followup as Text
  expect(followup).toBeInstanceOf(Text)
  expect(followup.common.name).toEqual('TEST_FOLLOWUP_TEXT')
  expect(followup.text).toEqual("Hey, I'm a followup!")
})

test('Test: directus text without buttons image followup', async () => {
  const directus = testDirectus()
  const testText = await directus.text(TEXT_WITHOUT_B_WITH_F_I, testContext())
  const followup = testText.common.followup as Image
  expect(followup).toBeInstanceOf(Image)
  expect(followup.common.name).toEqual('TEST_FOLLOWUP_IMAGE')
})

test('Test: directus text with buttons with text followup with text followup', async () => {
  const directus = testDirectus()
  const testText = await directus.text(
    TEXT_WITH_B_WITH_F_T_WITH_F_T,
    testContext()
  )
  expect(testText.buttons).toHaveLength(3)
  const followup1 = testText.common.followup as Text
  expect(followup1).toBeInstanceOf(Text)
  expect(followup1.common.name).toEqual('TEST_BASKETBALL')

  const followup2 = followup1.common.followup as Text
  expect(followup2).toBeInstanceOf(Text)
  expect(followup2.common.name).toEqual('TEST_FOOTBALL')
  expect(followup2.buttons).toHaveLength(1)
})

test('Test: directus text with custom field', async () => {
  const directus = testDirectus()
  const testText = await directus.text(TEXT_WITH_CUSTOM_FIELD, testContext())
  expect(testText.common.customFields!.customfieldtext).toEqual(
    'Hi, this is a custom field text!'
  )
})

test('Test: directus text with button of type text', async () => {
  const directus = testDirectus()
  const testText = await directus.text(TEXT_WITH_B_TYPE_TEXT, testContext())
  expect(testText.buttons![0].text).toEqual('This will be the button text')
  expect(testText.buttons![0].target).toEqual(
    'text$32cb73fa-3ee9-4a56-9fe8-fd2e95b5525a'
  )
})

test('Test: directus text with button of type text without shorText', async () => {
  const directus = testDirectus()
  const testText = await directus.text(TEXT_WITH_B_TYPE_TEXT, testContext())
  expect(testText.buttons![1].text).toEqual('z_TEST_TEXT_WITHOUT_SHORTTEXT')
})
