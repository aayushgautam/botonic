// TODO: This file contains all the legacy types we had in index.ts. After some refactors, we should be able to get rid of many of them.
import { BotState } from './bot-state'
import { BotonicEvent } from './events'
import { Session } from './session'

export type CaseStatusType =
  | typeof CASE_STATUS.ATTENDING
  | typeof CASE_STATUS.IDLE
  | typeof CASE_STATUS.RESOLVED
  | typeof CASE_STATUS.WAITING

export type CaseResolution =
  | typeof CASE_RESOLUTION.BANNED
  | typeof CASE_RESOLUTION.NOK
  | typeof CASE_RESOLUTION.NOT_SOLVED
  | typeof CASE_RESOLUTION.OK

export const PROVIDER = Object.freeze({
  DEV: 'dev',
  FACEBOOK: 'facebook',
  GENERIC: 'generic',
  INTERCOM: 'intercom',
  SMOOCH: 'smooch',
  TELEGRAM: 'telegram',
  TWITTER: 'twitter',
  WEBCHAT: 'webchat',
  WECHAT: 'wechat',
  WHATSAPP: 'whatsapp',
})

export const INPUT = Object.freeze({
  TEXT: 'text',
  POSTBACK: 'postback',
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
  DOCUMENT: 'document',
  LOCATION: 'location',
  CONTACT: 'contact',
  BUTTON_MESSAGE: 'buttonmessage',
  CAROUSEL: 'carousel',
  CUSTOM: 'custom',
  WEBCHAT_SETTINGS: 'webchatsettings',
  WHATSAPP_TEMPLATE: 'whatsapptemplate',
  RAW: 'raw',
})

export const CASE_STATUS = Object.freeze({
  WAITING: 'status_waiting',
  ATTENDING: 'status_attending',
  IDLE: 'status_idle',
  RESOLVED: 'status_resolved',
})

export const CASE_RESOLUTION = Object.freeze({
  OK: 'result_ok',
  NOK: 'result_nok',
  NOT_SOLVED: 'result_not_solved',
  BANNED: 'result_banned',
})

export interface Locales {
  [id: string]: string | string[] | Locales
}

interface PluginConstructor<T> {
  new (arg: T): Plugin
}

export interface PluginConfig<T> {
  id: string
  options?: T
  resolve: { default: PluginConstructor<T> }
}

export type InputType =
  | typeof INPUT.AUDIO
  | typeof INPUT.BUTTON_MESSAGE
  | typeof INPUT.CAROUSEL
  | typeof INPUT.CONTACT
  | typeof INPUT.CUSTOM
  | typeof INPUT.DOCUMENT
  | typeof INPUT.IMAGE
  | typeof INPUT.LOCATION
  | typeof INPUT.POSTBACK
  | typeof INPUT.TEXT
  | typeof INPUT.VIDEO
  | typeof INPUT.WEBCHAT_SETTINGS
  | typeof INPUT.WHATSAPP_TEMPLATE

export interface IntentResult {
  intent: string
  confidence: number
}

/** Generated by Translation plugins: GoogleTranslation **/
export interface Translations {
  [languageCode: string]: string
}

/** Fields set by NLU plugins: Luis, Dialogflow, ... **/
export interface NluResult {
  // the name of the highest confidence intent
  confidence: number
  intent: string
  intents: IntentResult[]
  language: string
  // entity recognition results in the format provided by the NLU engine
  entities?: any
  translations: Translations
}

export interface Input extends Partial<NluResult> {
  text?: string
  src?: string
  data?: string
  path?: string
  payload?: string
  type: InputType
}

export type ProviderType =
  | typeof PROVIDER.DEV
  | typeof PROVIDER.FACEBOOK
  | typeof PROVIDER.GENERIC
  | typeof PROVIDER.INTERCOM
  | typeof PROVIDER.SMOOCH
  | typeof PROVIDER.TELEGRAM
  | typeof PROVIDER.TWITTER
  | typeof PROVIDER.WEBCHAT
  | typeof PROVIDER.WECHAT
  | typeof PROVIDER.WHATSAPP

// eslint-enable @typescript-eslint/naming-convention

export type InputMatcher = (input: Input) => boolean
export type ParamsMatcher =
  | { [key: string]: string }
  | ((params: { [key: string]: string }) => boolean)
export type SessionMatcher = (session: Session) => boolean
export type RequestMatcher = (request: BotRequest) => boolean
export type StringMatcher = RegExp | string | ((data: string) => boolean)

export type RouteMatcher =
  | InputMatcher
  | ParamsMatcher
  | RequestMatcher
  | SessionMatcher
  | StringMatcher

export interface Route {
  action?: any
  childRoutes?: Route[]
  lastRoutePath?: string
  ignoreRetry?: boolean
  path: RoutePath
  redirect?: string
  retry?: number

  // matchers
  input?: InputMatcher
  intent?: StringMatcher
  params?: ParamsMatcher
  payload?: StringMatcher
  request?: RequestMatcher
  session?: SessionMatcher
  text?: StringMatcher
  data?: StringMatcher
  type?: StringMatcher
}

export type Routes<R = Route> = R[] | ((_: BotRequest) => R[])

export interface BotRequest {
  input: Input
  session: Session
  botState: BotState
  dataProvider?: any // TODO: type as dataProvider
}

/** The response of the bot for the triggered actions, which can be
 * the one matched by the routes, the default action and the retry actions.
 * See Response at @botonic/react's index.d.ts for the React type
 * */
export interface BotResponse extends BotRequest {
  response: any
  messageEvents: Partial<BotonicEvent>[] | null
}

export interface PluginPreRequest extends BotRequest {
  plugins: Plugin[]
}
export interface PluginPostRequest extends BotResponse {
  plugins: Plugin[]
}

export interface Plugin {
  post(request: PluginPostRequest): void
  pre(request: PluginPreRequest): void
}

export interface Params {
  [key: string]: any
}

export const Providers = Object.freeze({
  Messaging: {
    FACEBOOK: 'facebook',
    GENERIC: 'generic',
    IMBEE: 'imbee',
    INTERCOM: 'intercom',
    SMOOCH_WEB: 'smooch_web',
    SMOOCH: 'smooch',
    TELEGRAM: 'telegram',
    TWITTER: 'twitter',
    WEBCHAT: 'webchat',
    WECHAT: 'wechat',
    WHATSAPP: 'whatsapp',
  },
})

export type Nullable<T> = T | null

export type Action = Nullable<() => any>
export type RoutePath = Nullable<string>

export interface ProcessInputResult {
  action: Action
  emptyAction: Action
  fallbackAction: Action
  botState: BotState
  params: Params
}

export type MatchedValue = boolean | RegExpExecArray | null

export type RoutingState = {
  currentRoute: Nullable<Route>
  matchedRoute: Nullable<Route>
  params: Params
  isFlowBroken: boolean
}

export interface RouteParams {
  route: Nullable<Route>
  params: Params
}
export interface PathParams {
  path: RoutePath
  params: Params
}

export type MatchingProp =
  | 'text'
  | 'payload'
  | 'intent'
  | 'type'
  | 'input'
  | 'session'
  | 'request'

export type Matcher = string | RegExp | ((args) => boolean)
