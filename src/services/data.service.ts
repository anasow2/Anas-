
import { Injectable, signal } from '@angular/core';
import { Category, Ad } from '../models/data.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly categories = signal<Category[]>([
    { name: 'Guryo', icon: 'home' },
    { name: 'Gaadiid', icon: 'directions_car' },
    { name: 'Elektaroonig', icon: 'laptop_mac' },
    { name: 'Xoolo', icon: 'pets' },
    { name: 'Shaqooyin', icon: 'work' },
  ]);

  readonly ads = signal<Ad[]>([
    {
      id: 1,
      title: 'Guri qurxoon Muqdisho',
      price: 145000,
      location: 'Mogadishu, Banadir',
      imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Toyota Land Cruiser V8',
      price: 38500,
      location: 'Hargeisa, Somaliland',
      imageUrl: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true,
    },
    {
      id: 7,
      title: 'MacBook Pro 14-inch M2',
      price: 1800,
      location: 'Mogadishu, Banadir',
      imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false,
    },
    {
      id: 8,
      title: 'Fadhi Casri ah (Sofa)',
      price: 650,
      location: 'Hargeisa, Somaliland',
      imageUrl: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true,
    },
    {
      id: 9,
      title: 'Hyundai Elantra 2021',
      price: 15500,
      location: 'Mogadishu, Banadir',
      imageUrl: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false,
    }
  ]);
  
  readonly userAds = signal<Ad[]>([
     {
      id: 5,
      title: 'Toyota Camry 2022',
      price: 14500,
      location: 'Mogadishu',
      imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false,
      status: 'Furan'
    },
    {
      id: 6,
      title: 'Guri Casri ah',
      price: 95000,
      location: 'Mogadishu',
      imageUrl: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false,
      status: 'Iibsamay'
    }
  ]);

  constructor() {}

  getAdById(id: number) {
    const allAds = [...this.ads(), ...this.userAds()];
    return allAds.find(ad => ad.id === id);
  }
}