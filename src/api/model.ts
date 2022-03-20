export interface Hotel {
  id: string;
  name: string;
}

export interface Room {
  name: string;
  rates: Rate[];
}

export interface Rate {
  name: string;
  total_price?: number;
  breakdowns?: Breakdown[];
}

export interface Breakdown {
  date: Date;
  price: number;
  allotment: number;
}

export interface HotelFilter {
  code: string;
  from?: Date;
  to?: Date;
}

export interface Traslation {
  hotel: string;
  chenckIn: string;
}
