
import { Filter } from '../../interface/filter';

export class CreateMototehnikaDto{
  description:string;
  cityId:number;
  typeId:number;
  markaId:number;
  year:number
  price:number
}

export class FilterMototehnikaQuery extends Filter{
  marks:string
  types:string
  yearFrom:number;
  yearTo:number;
  priceFrom:number;
  priceTo:number
  orderByPriceDESC:boolean
  orderByPriceASC:boolean
  orderByLikesDESC:boolean
}