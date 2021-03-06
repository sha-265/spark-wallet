import YAML from 'js-yaml'
import qrcode from 'qrcode'
import vagueTime from 'vague-time'
import { div, span, pre, label, small, input, button, a } from '@cycle/dom'
import { isConnError } from '../util'

const isOnion = global.location && /\.onion$/.test(location.hostname)

const yaml = data => pre('.mt-3.text-left.text-muted', typeof data == 'string' ? data : YAML.safeDump(data))

// use server-generated QRs when browsed over .onion
// (the canvas fingerprint protection in Tor Browser breaks client-side generation)
const qruri = process.env.BUILD_TARGET == 'web' && isOnion
  ? data => Promise.resolve(`qr/${ encodeURIComponent(data) }`)
  : data => qrcode.toDataURL(data)

const qrinv = inv => qruri(`lightning:${ inv.bolt11  }`.toUpperCase())

// Avoid displaying our default description (of "⚡")
const showDesc = o => o.description && o.description !== '⚡'

const ago = ts => vagueTime.get({ to: Math.min(ts*1000, Date.now()) })

const formGroup = (labelText, control, help) => div('.form-group', [
  label('.col-form-label.col-form-label-lg', labelText)
, control
, help ? small('.form-text.text-muted', help) : ''
])

const amountField = ({ msatoshi, amount, step, unit }, msatField, required) =>
  div('.input-group', [
    input({ attrs: { type: 'hidden', name: msatField }, props: { value: msatoshi } })
  , input('.form-control.form-control-lg'
    , { attrs: { type: 'number', step, min: step, name: 'amount', required, placeholder: (required?'':'(optional)') }
      , props: { value: amount } })
  , div('.input-group-append.toggle-unit', span('.input-group-text', unit))
  ])

const alertBox = ([ kind, text ], dismissable) =>
  div(`.alert${dismissable?'.alert-dismissable':''}.alert-${kind}`, [
    dismissable ? button('.close', { attrs: { type: 'button' }, dataset: { dismiss: 'alert' } }, '×') : ''

  , text.toString()

  , ' ', process.env.BUILD_TARGET != 'web' && isConnError(text)
    ? a('.alert-link', { attrs: { href: 'settings.html', rel: 'external' } }, 'Try configuring a different server?')
    : ''
  ])


module.exports = { yaml, qruri, qrinv, showDesc, ago, formGroup, amountField, alertBox }
