export interface DataPoint {
  id: number
  name: string
  tagline: string
  first_brewed: string
  description?: string
  image_url?: string
  abv: number
  ibu: number
  target_fg: number
  target_og: number
  ebc: number
  srm: number
  ph: number
  attenuation_level: number
  food_pairing?: Array<string>
  brewers_tips?: string
}

export type TMetrics =
  | 'abv'
  | 'ibu'
  | 'target_fg'
  | 'target_og'
  | 'ebc'
  | 'srm'
  | 'ph'
  | 'attenuation_level'
