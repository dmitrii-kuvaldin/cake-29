import axios from 'axios'
import IOrdersManager from '../types/ordersManger.types'
import IAllCakes from '../types/allCakes.types'


export const managerServices = {
  async getOrders() {
    const response = await axios.get<IOrdersManager>('/api/users/manager/orders')
    console.log('getOrders', response.data);
    return response.data
  }
}

export const cakes = {
  async getAllCakes() {
    const response = await axios.get<IAllCakes>('/api/cakes?page=1&orderBy=id&desc=false')

    console.log('getAllCakes', response.data);
    return response.data
  }
}


