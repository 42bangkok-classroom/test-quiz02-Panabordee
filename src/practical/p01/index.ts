import axios from "axios";

interface User {
  id: number
  name: string
  phone: string
  address: Address | null
}

interface Geo {
  lat: string
  lng: string
}

interface ApiUser {
  id: number
  name: string
  phone: string
  address?: Address
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}


export async function getPostalAddress(): Promise<User[]> {
  try {
    const { data } = await axios.get<ApiUser[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((u) => ({
      id: u.id,
      name: u.name,
      phone: u.phone,
      address: u.address ?? null,
    }));
  } catch {
    return [];
  }
}
