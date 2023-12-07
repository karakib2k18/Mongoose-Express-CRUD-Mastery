interface IFullName {
  firstName: string;
  lastName: string;
}

interface IAddress {
  street: string;
  city: string;
  country: string;
}

interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrder[];
}

export { IUser, IFullName, IAddress, IOrder };
