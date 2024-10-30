export interface IUnitCost {
  wood?: number
  food?: number
  gold?: number
  [key: string]: number | undefined
}

export interface IUnit {
  id: number
  name: string
  age: string
  cost?: IUnitCost
  [key: string]: any
}

export type IUnits = IUnit[]
