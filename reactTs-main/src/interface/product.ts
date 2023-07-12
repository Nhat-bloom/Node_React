export interface ICategory {
   _id: number
   name: string
}

export interface IProduct {
   _id: string
   price: number
   name: string
   image: string
   description: string
   categories: ICategory[]
}
export interface IInputProduct {
   name: string
   price: number
   description: string
   image: string
   categories: string[]
}

export interface IDataResponse {
   message: string
   products: {
      docs: IProduct[]
      hasNextPage: boolean
      hasPrevPage: boolean
      page: number
      limit: number
      totalDocs: number
   }
}
