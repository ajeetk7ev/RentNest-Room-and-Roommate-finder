export interface User{
    _id:string;
    firstname:string;
    lastname:string;
    email?:string;
    phone?:string;
    image?:string;
}

export interface Listing {
  _id:string
  title: string
  city: string
  address: string
  price: number
  type: string;
  furnished: boolean
  images: string[]
  available?: boolean
  ownerName?: string
  createdAt?: Date
}