import { TMetrics } from '../types/data'

export const METRICS: { text: string; key: TMetrics; value: TMetrics }[] = [
  { text: 'ABV', key: 'abv', value: 'abv' },
  {
    text: 'Attenuation Level',
    key: 'attenuation_level',
    value: 'attenuation_level',
  },
  { text: 'EBC', key: 'ebc', value: 'ebc' },
  { text: 'IBU', key: 'ibu', value: 'ibu' },
  { text: 'Ph', key: 'ph', value: 'ph' },
  { text: 'SRM', key: 'srm', value: 'srm' },
  { text: 'Target FG', key: 'target_fg', value: 'target_fg' },
  { text: 'Target OG', key: 'target_og', value: 'target_og' },
]

export const METRICS_KEY_TO_TEXT = {
  abv: 'Abv',
  attenuation_level: 'Attenuation Level',
  ebc: 'EBC',
  ibu: 'IBU',
  ph: 'Ph',
  srm: 'SRM',
  target_fg: 'Target FG',
  target_og: 'Target OG',
}
